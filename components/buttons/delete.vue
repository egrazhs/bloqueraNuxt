<template>
	<NuxtLink @click="handleClick" class="p-2 text-xs bg-red-600 hover:bg-red-700 text-white rounded-md flex items-center justify-center cursor-pointer">
		<v-icon icon="mdi-delete" size="small"></v-icon>
		<span class="ml-1">Eliminar</span>
	</NuxtLink>
</template>

<script setup>
	const props = defineProps({
		item: {
			type: Object,
			required: true
		}
	});

	const emit = defineEmits(['confirm']);

	const handleClick = () => {
		emit('confirm', props.item);
	};
</script>