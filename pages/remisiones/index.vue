<template>
	<DocumentIndexPage
		documentTitle="Remisiones"
	    singularDocumentTitle="Remisión"
	    baseRoute="/remisiones"
	    collectionName="remisiones"
	    :documentFields="documentFields"
	/>
</template>

<script setup>
	const documentFields = ref([
		{ key: 'fecha', label: 'Fecha', show: true },
		{ key: 'cliente', label: 'Cliente', show: true },
		{ key: 'material', label: 'Material', show: true }
	]);

	function calcular_importe_remision(remision){
		let total = 0;

		if(remision.hasOwnProperty('material')){
			remision.material.forEach((material) => {
				total += (material.precio_unitario * material.cantidad);
			});
		}

		return total;
	}
</script>