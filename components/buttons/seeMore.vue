<template>
  <NuxtLink :to="route" class="p-2 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded-md">
    Ver Más
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
