import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { db } from '~/utils/firebase';


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
