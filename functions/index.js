/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.updateStockField = functions.https.onRequest(async (req, res) => {
  const productsRef = admin.firestore().collection('productos');
  const snapshot = await productsRef.get();

  const batch = admin.firestore().batch();

  snapshot.forEach((doc) => {
    if (!doc.data().stock) {
      batch.update(doc.ref, { stock: 0 });
    }
  });

  await batch.commit();
  res.send('Actualización completa');
});


exports.actualizarStock = functions.firestore.document('movimientos_inventario/{movimientoId}').onCreate(async (snap, context) => {
    // Obtener los datos del movimiento recién creado
    const movimiento = snap.data();
    const productoId = movimiento.id_producto;
    const cantidad = movimiento.cantidad;
    const tipo = movimiento.tipo;

    // Referencia al producto en la colección "productos"
    const productoRef = admin.firestore().collection('productos').doc(productoId);

    // Obtener el stock actual del producto
    const productoSnap = await productoRef.get();
    const stockActual = productoSnap.data().stock;

    // Calcular el nuevo stock basado en el tipo de movimiento
    let nuevoStock = stockActual;
    if (tipo === 'add') {
        nuevoStock += cantidad;
    } else if (tipo === 'substract' || tipo === 'remision') {
        nuevoStock -= cantidad;
    }

    // Asegurarse de que el stock no sea negativo
    if (nuevoStock < 0) {
        throw new functions.https.HttpsError('failed-precondition', 'El stock no puede ser negativo');
    }

    // Actualizar el stock en la colección "productos"
    return productoRef.update({
        stock: nuevoStock
    });
});


exports.generarBalanceDiario = functions.pubsub.schedule('0 0 * * *').timeZone('America/Mexico_City').onRun(async (context) => {
    const productosRef = admin.firestore().collection('productos');
    const snapshot = await productosRef.get();

    // Obtener todos los productos y su stock
    const productos = snapshot.docs.map(doc => ({
        productoId: doc.id,
        stock: doc.data().stock
    }));

    // Obtener la fecha actual en formato yyyy-mm-dd para usarla como ID del documento
    const fechaActual = new Date().toISOString().split('T')[0];

    // Crear el documento de balance diario
    const nuevoBalanceDiario = {
        fecha: fechaActual,
        productos: productos
    };

    // Guardar el balance diario en Firestore con la fecha como ID
    await admin.firestore().collection('balances_diarios').doc(fechaActual).set(nuevoBalanceDiario);

    return null;
});
 