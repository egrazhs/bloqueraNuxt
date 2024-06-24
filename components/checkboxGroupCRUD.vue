<template>
	<section>
		<h4>{{ title }}</h4>
		<div class="flex">
			<v-checkbox v-model="usuario[`can_create_${prefix}`]" label="Crear Nuevo" :disabled="isDisabled"></v-checkbox>
			<v-checkbox v-model="usuario[`can_read_${prefix}`]" label="Ver detalles" :disabled="isDisabled"></v-checkbox>
			<v-checkbox v-model="usuario[`can_update_${prefix}`]" label="Modificar" :disabled="isDisabled"></v-checkbox>
			<v-checkbox v-model="usuario[`can_delete_${prefix}`]" label="Eliminar" :disabled="isDisabled"></v-checkbox>
		</div>
	</section>
</template>

<script setup>
	import { defineProps } from 'vue';

	const props = defineProps({
		title: String,
		prefix: String,
		usuario: Object,
		isDisabled: {
			type: Boolean,
			default: false  // Valor por defecto
		}
	});
</script>

