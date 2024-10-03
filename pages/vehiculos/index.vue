<template>
	<DocumentIndexPage
		documentTitle="Vehiculos"
	    singularDocumentTitle="Vehículo"
	    baseRoute="/vehiculos"
	    collectionName="vehiculos"
	    :documentFields="documentFields"
	/>
</template>

<script setup>
	const documentFields = ref([
		{ key: 'alias', label: 'Alias', show: true },
		{ key: 'matricula', label: 'Matricula', show: true },
		{ key: 'modelo', label: 'Modelo', show: true },
		{ key: 'year', label: 'Año', show: true },
	]);
</script>