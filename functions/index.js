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


exports.actualizarStock = functions.firestore.document('movimientos/{movimientoId}').onCreate(async (snap, context) => {
    // Obtener los datos del movimiento recién creado
    const movimiento = snap.data();
    const productoId = movimiento.productoId;
    const cantidad = movimiento.cantidad;
    const tipo = movimiento.tipo;

    // Referencia al producto en la colección "productos"
    const productoRef = admin.firestore().collection('productos').doc(productoId);

    // Obtener el stock actual del producto
    const productoSnap = await productoRef.get();
    const stockActual = productoSnap.data().stock;

    // Calcular el nuevo stock basado en el tipo de movimiento
    let nuevoStock = stockActual;
    if (tipo === 'agregar') {
        nuevoStock += cantidad;
    } else if (tipo === 'quitar' || tipo === 'remision') {
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

    // Obtener todos los productos
    snapshot.forEach(async (doc) => {
        const producto = doc.data();
        const productoId = doc.id;
        const stockActual = producto.stock;
        const fechaActual = new Date().toISOString().split('T')[0]; // yyyy-mm-dd

        // Crear un nuevo balance diario
        await admin.firestore().collection('balances_diarios').add({
            productoId: productoId,
            fecha: fechaActual,
            stock: stockActual
        });
    });

    return null;
}); 