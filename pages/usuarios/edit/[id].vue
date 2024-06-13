<template>
  <div>
    <h1>Editar Usuario</h1>
    <form @submit.prevent="handleSubmit">
      <div class="my-4">
        <label for="nombre" class="block font-semibold">Nombre:</label>
        <input v-model="usuario.nombre_completo" type="text" id="nombre" class="input-field" required>
      </div>
      <div class="my-4">
        <label for="username" class="block font-semibold">Username:</label>
        <input v-model="usuario.username" type="text" id="username" class="input-field" required>
      </div>
      <div class="my-4">
        <label for="alias" class="block font-semibold">Alias:</label>
        <input v-model="usuario.alias" type="text" id="alias" class="input-field" required>
      </div>
      <button type="submit" class="btn-primary">Guardar Cambios</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'vue-router';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '~/utils/firebaseConfig';

const app = initializeApp(firebaseConfig);
// Obtiene la instancia de Firestore
const db = getFirestore(app);

const router = useRouter();
const usuario = ref(null);

// Obtener los detalles del usuario al cargar la página
onMounted(async () => {
  try {
    const { id } = router.currentRoute.value.params;
    const usuarioDoc = await getDoc(doc(db, 'usuarios', id));
    if (usuarioDoc.exists()) {
      usuario.value = usuarioDoc.data();
    } else {
      console.error('Usuario no encontrado');
    }
  } catch (error) {
    console.error('Error al obtener detalles del usuario:', error.message);
  }
});

// Manejar la actualización del usuario
const handleSubmit = async () => {
  try {
    const { id } = router.currentRoute.value.params;
    await updateDoc(doc(db, 'usuarios', id), usuario.value);
    console.log('Usuario actualizado correctamente');
    // Redirigir al usuario a la página de detalles del usuario después de guardar los cambios
    await router.push({ path: `/usuarios/read/${id}` });
  } catch (error) {
    console.error('Error al actualizar usuario:', error.message);
  }
};
</script>

<style scoped>
.input-field {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.btn-primary {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}
</style>
