<template>
	<v-btn icon @click="volver">
		<v-icon>mdi-arrow-left</v-icon>
	</v-btn>
</template>

<script setup>
	const router = useRouter();

	const volver = () => {
		router.go(-1);
	};
</script>
