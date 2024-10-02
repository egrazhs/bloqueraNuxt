<template>
  <NuxtLink :to="route" class="p-2 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded-md flex items-center justify-center">
    <v-icon icon="mdi-eye" size="small"></v-icon>
    <span class="ml-1">Ver Más</span>
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
