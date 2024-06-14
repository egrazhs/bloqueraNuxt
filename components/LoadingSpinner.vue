<template>
	<v-container class="d-flex justify-center align-center" style="height: 100vh;">
		<div class="text-center">
			<v-progress-circular indeterminate size="64"></v-progress-circular>
			<p>{{ mensaje }}</p>
		</div>
	</v-container>
</template>

<script setup>
	import { defineProps } from 'vue';

	const props = defineProps({
		mensaje: {
			type: String,
		default: 'Cargando...'
		}
	});
</script>

<style scoped>
/* Estilos específicos según tus preferencias */
</style>
