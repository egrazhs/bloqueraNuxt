<template>
  <div>
    <h1>Detalles del Usuario</h1>
    <div v-if="usuario">
      <p><strong>Nombre:</strong> {{ usuario.nombre_completo }}</p>
      <p><strong>Username:</strong> {{ usuario.username }}</p>
      <p><strong>Alias:</strong> {{ usuario.alias }}</p>
    </div>
    <div v-else>
      <p>Cargando...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getDoc, doc } from 'firebase/firestore';
import { useRouter } from 'vue-router';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '~/utils/firebaseConfig';

const app = initializeApp(firebaseConfig);
// Obtiene la instancia de Firestore
const db = getFirestore(app);

const router = useRouter();
const usuario = ref(null);

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
</script>
