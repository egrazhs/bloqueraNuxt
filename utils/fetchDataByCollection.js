import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { db } from '~/utils/firebase';

export const fetchDataByCollection = async (collectionName) => {
	try {
		const collectionRef = collection(db, collectionName);
		const querySnapshot = await getDocs(collectionRef);
		const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
		return data;
	} catch (error) {
		console.error("Error fetching data: ", error);
		throw error;
	}
};
