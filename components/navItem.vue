<template>
	<NuxtLink :to="to">
		<div class="py-2 px-2 md:px-8 hover:bg-blue-600 cursor-pointer flex items-center">
  			<img :src="`/_nuxt/assets/images/heroicons/${imgSource}`" class="w-5 h-5" draggable="false" />
  			<span class="text-xs md:text-sm ml-1">{{ text }}</span>
		</div>
	</NuxtLink>
</template>

<script setup>
	defineProps({
		to: String,
		imgSource: String,
		text: String
	});
</script>