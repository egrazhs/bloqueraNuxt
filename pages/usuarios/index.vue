<template>
	<DocumentIndexPage
		documentTitle="Usuarios"
	    singularDocumentTitle="Usuario"
	    baseRoute="/usuarios"
	    collectionName="usuarios"
	    :documentFields="documentFields"
	/>
</template>

<script setup>
	const documentFields = ref([
		{ key: 'nombre_completo', label: 'Nombre', show: true },
		{ key: 'username', label: 'Username', show: true },
		{ key: 'alias', label: 'Alias', show: true }
	]);
</script>