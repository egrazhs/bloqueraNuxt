import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '~/utils/firebase';

// Función para agregar padding a un número
export const padWithZeros = (num, length) => {
    return num.toString().padStart(length, "0");
};

export const getNextId = async (collectionName) => {
    try {
        // Consulta la colección ordenando por ID de manera descendente y limitando a 1 documento
        const q = query(collection(db, collectionName), orderBy('id', 'desc'), limit(1));
        const querySnapshot = await getDocs(q);

        // Obtén el último ID del documento más reciente
        let latestId = '';
        querySnapshot.forEach((doc) => {
            latestId = doc.data().id;
        });

        // Si no se encontró ningún documento, empezar desde 1
        if (!latestId) {
            latestId = '0';
        }

        // Convertir el último ID a número, incrementar y luego agregar padding
        const nextIdNumber = parseInt(latestId, 10) + 1;
        const nextId = padWithZeros(nextIdNumber, 6);

        // Devuelve el siguiente ID autoincrementado con padding
        //console.log("Siguiente ID:", nextId);
        return nextId;
    } catch (error) {
        console.error("Error obteniendo el siguiente ID:", error);
        throw new Error("Error obteniendo el siguiente ID");
    }
};