<template>
	<DocumentIndexPage
		documentTitle="Formas de Pago"
	    singularDocumentTitle="Forma de Pago"
	    baseRoute="/formas_de_pago"
	    collectionName="formas_de_pagos"
	    :documentFields="documentFields"
	/>
</template>

<script setup>
	const documentFields = ref([
		{ key: 'codigo', label: 'Código', show: true },
		{ key: 'descripcion', label: 'Descripción', show: true },
		{ key: 'condicion', label: 'Condición', show: true },
		{ key: 'status', label: 'Status', show: true }
	]);
</script>