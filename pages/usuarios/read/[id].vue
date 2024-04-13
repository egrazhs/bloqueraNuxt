<template>
  <div>
    <div class="user-info">
      <h1>{{ user.nombre }}</h1>
      <p>Email: {{ user.username }}</p>
      <!-- Agrega más campos según la estructura de tu documento de usuario -->
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ params }) {
    // Obtener el ID del usuario de los parámetros de la ruta
    const userId = params.id;

    // Llamar a la función fetchDataById para obtener la información del usuario por su ID
    const user = await fetchDataById('usuarios', userId);

    return { user };
  },
  data() {
    return {
      user: {}
    };
  }
}
</script>

<style scoped>
.user-info {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
