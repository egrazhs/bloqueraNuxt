<template>
  <div>
    <!-- Resto del contenido -->

    <LoadingSpinner v-if="loading" mensaje="Cargando detalles del usuario..."></LoadingSpinner>
  </div>
</template>

<script setup>
  import LoadingSpinner from '~/components/LoadingSpinner.vue';
  import { ref, onMounted } from 'vue';

  const loading = ref(true);

  onMounted(() => {
    // Lógica para cargar datos
    loading.value = false;
  });
</script>
