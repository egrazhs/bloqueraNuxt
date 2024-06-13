import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import firebaseConfig from '~/utils/firebaseConfig';

const app = initializeApp(firebaseConfig);
// Obtiene la instancia de Firestore
const db = getFirestore(app);


export async function agregarDocumento(tipoDocumento, documento, id) {
  try {
    // Crea una referencia al documento con el ID personalizado dentro del tipo de documento especificado
    const docRef = doc(db, tipoDocumento, id);

    // Agrega el documento a Firestore utilizando el ID personalizado
    await setDoc(docRef, documento);

    // Retorna el ID del documento recién creado
    return docRef.id;
  } catch (error) {
    console.error('Error al agregar documento:', error.message);
    throw error;
  }
}
