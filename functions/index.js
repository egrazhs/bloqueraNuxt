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

    // Obtener las familias de productos
    const familiasRef = admin.firestore().collection('familias_productos');
    const snapshotFamilias = await familiasRef.get();

    // Crear un mapa para buscar los nombres de las familias por ID
    const mapaFamilias = {};
    snapshotFamilias.forEach(doc => {
        mapaFamilias[doc.id] = doc.data().nombre; // Mapa de {id_familia: nombre}
    });

    // Obtener todos los productos y su stock
    const productos = snapshot.docs.map(doc => ({
        productoId: doc.id,
        stock: doc.data().stock,
        nombre_producto: doc.data().descripcion,
        id_familia: doc.data().id_familia,
        nombre_familia: mapaFamilias[doc.data().id_familia] || 'Sin familia'
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


exports.generarBalanceDiarioManual = functions.https.onRequest(async (req, res) => {
    try {
        await generarBalanceDiario();
        res.status(200).send('Balance diario generado manualmente.');
    } catch (error) {
        console.error('Error al generar el balance diario:', error);
        res.status(500).send('Error al generar el balance diario.');
    }
});

async function generarBalanceDiario() {
    try {
        console.log('Iniciando generación del balance diario...');

        const productosRef = admin.firestore().collection('productos');
        const snapshot = await productosRef.get();

        // Verificar si hay productos en la colección
        if (snapshot.empty) {
            console.error('No se encontraron productos en la colección.');
            throw new Error('No se encontraron productos en la colección.');
        }
        console.log(`Número de productos encontrados: ${snapshot.size}`);

        // Obtener las familias de productos
        const familiasRef = admin.firestore().collection('familias_productos');
        const snapshotFamilias = await familiasRef.get();

        // Verificar si hay familias en la colección
        if (snapshotFamilias.empty) {
            console.warn('No se encontraron familias de productos en la colección. Continuando sin familias.');
        } else {
            console.log(`Número de familias de productos encontradas: ${snapshotFamilias.size}`);
        }

        // Crear un mapa para buscar los nombres de las familias por ID
        const mapaFamilias = {};
        snapshotFamilias.forEach(doc => {
            mapaFamilias[doc.id] = doc.data().nombre || 'Nombre no especificado';
        });
        console.log('Mapa de familias creado:', mapaFamilias);

        // Obtener todos los productos y su stock
        const productos = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                productoId: doc.id,
                stock: data.stock || 0, // Valor por defecto si no existe
                nombre_producto: data.descripcion || 'Sin descripción', // Valor por defecto si no existe
                id_familia: data.familia || 'Sin familia', // Valor por defecto si no existe
                nombre_familia: mapaFamilias[data.id_familia] || 'Sin familia' // Buscar en el mapa de familias
            };
        });

        // Verificar si el array de productos está vacío
        if (productos.length === 0) {
            console.error('El array de productos está vacío.');
            throw new Error('El array de productos está vacío.');
        }
        console.log('Productos procesados:', productos);

        // Obtener la fecha actual en formato yyyy-mm-dd para usarla como ID del documento
        const fechaActual = new Date().toISOString().split('T')[0];
        console.log('Fecha actual para el balance diario:', fechaActual);

        // Crear el documento de balance diario
        const nuevoBalanceDiario = {
            fecha: fechaActual,
            productos: productos
        };
        console.log('Documento de balance diario a guardar:', nuevoBalanceDiario);

        // Guardar el balance diario en Firestore con la fecha como ID
        await admin.firestore().collection('balances_diarios').doc(fechaActual).set(nuevoBalanceDiario);

        console.log('Balance diario guardado correctamente para la fecha:', fechaActual);
    } catch (error) {
        console.error('Error en la función generarBalanceDiario:', error);
        throw error; // Relanzar el error para que la función principal lo capture
    }
}


