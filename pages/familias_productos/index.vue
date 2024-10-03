<template>
	<DocumentIndexPage
		documentTitle="Familias de Productos"
	    singularDocumentTitle="Familia de Producto"
	    baseRoute="/familias_productos"
	    collectionName="familias_productos"
	    :documentFields="documentFields"
	/>
</template>

<script setup>
	const documentFields = ref([
		{ key: 'codigo', label: 'Código', show: true },
		{ key: 'descripcion', label: 'Descripción', show: true }
	]);
</script>