<template>
	<DocumentIndexPage
		documentTitle="Productos"
	    singularDocumentTitle="Producto"
	    baseRoute="/productos"
	    collectionName="productos"
	    :documentFields="documentFields"
	/>
</template>

<script setup>
	const documentFields = ref([
		{ key: 'codigo', label: 'Código', show: true },
		{ key: 'descripcion', label: 'Descripción', show: true },
		{ key: 'familia', label: 'Familia', show: true },
		{ key: 'piezas_por_tarima', label: 'Piezas p/ Tarima', show: false },
		{ key: 'tarimas_por_flete_local_rabon', label: 'Tarimas/Rabon', show: false },
		{ key: 'tarimas_por_flete_local_torton', label: 'Tarimas/Torton', show: false },
	]);
</script>