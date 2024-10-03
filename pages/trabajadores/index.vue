<template>
	<DocumentIndexPage
		documentTitle="Trabajadores"
	    singularDocumentTitle="Trabajador"
	    baseRoute="/trabajadores"
	    collectionName="trabajadores"
	    :documentFields="documentFields"
	/>
</template>

<script setup>
	const documentFields = ref([
		{ key: 'nombre', label: 'Nombre', show: true },
		{ key: 'codigo', label: 'Código', show: true },
		{ key: 'alias', label: 'Alias', show: true },
		{ key: 'fecha_de_ingreso', label: 'Fecha de ingreso', show: false },
		{ key: 'importe_de_salario', label: 'Importe Salario', show: false },
		{ key: 'periodo_de_pago', label: 'Periodo de Pago', show: false },
	]);
</script>