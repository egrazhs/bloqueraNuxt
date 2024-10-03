<template>
	<DocumentIndexPage
		documentTitle="Proveedores"
	    singularDocumentTitle="Proveedor"
	    baseRoute="/proveedores"
	    collectionName="proveedores"
	    :documentFields="documentFields"
	/>
</template>

<script setup>
	const documentFields = ref([
		{ key: 'codigo', label: 'Código', show: true },
		{ key: 'nombre', label: 'Nombre', show: true },
		{ key: 'alias', label: 'Alias', show: true },
		{ key: 'tipo_de_persona', label: 'Tipo de Persona', show: false },
		{ key: 'forma_de_pago', label: 'Forma de pago', show: false },
		{ key: 'hace_factura', label: 'Hace Factura', show: false }
	]);
</script>