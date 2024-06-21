// utils/getNextId.js
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import firebaseConfig from '../firebaseConfig';

// Inicializa la aplicación Firebase
const app = initializeApp(firebaseConfig);

// Obtiene la instancia de Firestore
const db = getFirestore(app);

// Función para agregar padding a un número
const padWithZeros = (num, length) => {
	return num.toString().padStart(length, '0');
}

export const getNextId = async (collectionName) => {
	try {
    	// Consulta la colección ordenando por ID de manera descendente y limitando a 1 documento
		const q = query(collection(db, collectionName), orderBy('id', 'desc'), limit(1));
		const querySnapshot = await getDocs(q);

    	// Obtén el ID del documento más reciente
		let latestId = '0000';
		querySnapshot.forEach((doc) => {
			latestId = doc.data().id;
		});

    	// Convertir el último ID a número, incrementar y luego agregar padding
		const nextIdNumber = parseInt(latestId, 10) + 1;
		const nextId = padWithZeros(nextIdNumber, 6);

    	// Devuelve el siguiente ID autoincrementado con padding
    	console.log("nextId: "+ nextId);
		return nextId;
	} catch (error) {
		console.error("Error obteniendo el siguiente ID:", error);
		throw new Error("Error obteniendo el siguiente ID");
	}
};
