import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';
import firebaseConfig from './firebaseConfig';

// Inicializa la aplicación Firebase
const app = initializeApp(firebaseConfig);

// Obtiene la instancia de Firestore
const db = getFirestore(app);

// Función para obtener los datos de un documento específico en Firestore por su ID
const fetchDataById = async (tipo_documento, id) => {
  try {
    const docRef = doc(db, tipo_documento, id);
    const docSnapshot = await getDoc(docRef);
    
    if (docSnapshot.exists()) {
      return {
        id: docSnapshot.id,
        ...docSnapshot.data()
      };
    } else {
      console.error('No existe el documento con el ID proporcionado:', id);
      return null;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export default fetchDataById;