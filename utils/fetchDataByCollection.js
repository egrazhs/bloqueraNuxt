// fetchData.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import firebaseConfig from './firebaseConfig';

// Inicializa la aplicación Firebase
const app = initializeApp(firebaseConfig);

// Obtiene la instancia de Firestore
const db = getFirestore(app);

// Función para obtener los datos de la base de datos Firestore
const fetchDataByCollection = async (tipo_documento) => {
  try {
    const querySnapshot = await getDocs(collection(db, tipo_documento));
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};


export default fetchDataByCollection;