//Función para generar un select de un tipo de documento en especifico.
//Argmentos: Coleccion para extraer documentos y la propiedad que se va a mostrar en el select junto al ID

export const createSelectOfDocuments = async (coleccion, propiedad_mostrar) => {
	try {
		const querySnapshot = await fetchDataByCollection(coleccion);
		const documentos = [];
		
		querySnapshot.forEach((doc) => {
			documentos.push({
				id: doc.id,
				descripcion: doc.id + " - " + doc[propiedad_mostrar]
			});
		});

		return documentos;
	} catch (error) {
		console.error(`Error al cargar documentos de la colección ${coleccion}:`, error.message);
		return [];
	}
};