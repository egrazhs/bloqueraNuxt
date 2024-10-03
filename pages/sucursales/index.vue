<template>
	<DocumentIndexPage
		documentTitle="Sucursales"
	    singularDocumentTitle="Sucursal"
	    baseRoute="/sucursal"
	    collectionName="sucursales"
	    :documentFields="documentFields"
	/>
</template>

<script setup>
	const documentFields = ref([
		{ key: 'nombre', label: 'Nombre', show: true },
		{ key: 'prefijo', label: 'Prefijo', show: true },
		{ key: 'direccion', label: 'Dirección', show: true }
	]);
</script>