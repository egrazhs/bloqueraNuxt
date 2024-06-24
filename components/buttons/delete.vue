<template>
	<button @click="handleClick" class="p-2 ml-2 text-xs bg-red-600 hover:bg-red-700 text-white rounded-md">
		Eliminar
	</button>
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