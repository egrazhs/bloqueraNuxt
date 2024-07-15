<template>
	<NuxtLink :to="route" class="p-2 ml-2 text-xs bg-green-600 hover:bg-green-700 text-white rounded-md">
		Ver Estado de Cuenta
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