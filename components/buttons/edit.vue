<template>
	<NuxtLink :to="route" class="p-2 ml-2 text-xs bg-orange-600 hover:bg-orange-700 text-white rounded-md">
		Editar
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