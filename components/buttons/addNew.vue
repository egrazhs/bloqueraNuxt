<template>
	<NuxtLink :to="route" class="py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs">
		Agregar Nuevo {{ text }}
	</NuxtLink>
</template>

<script setup>
	const props = defineProps({
		route: {
			type: String,
			required: true
		},
		text: {
			type: String,
			required: true,
			default: ""
		}
	});
</script>