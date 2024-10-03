<template>
	<DocumentIndexPage
		documentTitle="Clientes"
	    singularDocumentTitle="Cliente"
	    baseRoute="/clientes"
	    collectionName="clientes"
	    :documentFields="documentFields"
	/>
</template>

<script setup>
	const documentFields = ref([
		{ key: 'codigo', label: 'Código', show: true },
		{ key: 'nombre', label: 'Nombre', show: true },
		{ key: 'alias', label: 'Alias', show: true },
		{ key: 'tipo_de_persona', label: 'Tipo de Persona', show: false },
		{ key: 'revende', label: 'Revende', show: false }
	]);
</script>