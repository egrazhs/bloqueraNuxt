import { db } from '~/utils/firebase';
import { getFirestore, collection, doc, deleteDoc } from 'firebase/firestore';

// Función para eliminar un documento por ID
export const deleteDataByDocId = async (collectionName, docId) => {
  try {
    await deleteDoc(doc(db, collectionName, docId));
    console.log(`Documento con ID ${docId} eliminado de la colección ${collectionName}`);
  } catch (error) {
    console.error("Error eliminando el documento: ", error);
    throw error;
  }
};


export default deleteDataByDocId;