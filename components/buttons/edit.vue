<template>
	<NuxtLink :to="route" class="p-2 text-xs bg-orange-600 hover:bg-orange-700 text-white rounded-md flex items-center justify-center pointer">
		<v-icon icon="mdi-pencil" size="small"></v-icon>
		<span class="ml-1">Editar</span>
	</NuxtLink>
</template>

<script setup>
	const props = defineProps({
		route: {
			type: String,
			required: true
		}
	});
</script>