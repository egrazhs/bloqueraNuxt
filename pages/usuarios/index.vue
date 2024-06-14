<template>
  <section>
    <h1 class="font-bold text-4xl">Usuarios</h1>

    <div class="mt-4">
      <NuxtLink to="./usuarios/create" class="py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs">Agregar nuevo Usuario</NuxtLink>
    </div>

    <hr class="border-1 border-slate-300 my-4">

    <section>
      <!-- Mensaje de éxito -->
      <div v-if="$route.query.c" class="transition-opacity bg-blue-200 text-blue-800 text-xs p-2 italic my-2">
        *Se ha agregado el usuario de manera exitosa.
      </div>

      <div v-if="$route.query.usuarioActualizado" class="hidden transition-opacity bg-yellow-200 text-yellow-800 text-xs p-2 italic my-2">
        *Se ha actualizado la información del usuario.
      </div>

      <div v-if="usuarioEliminado" class="transition-opacity bg-red-200 text-red-800 text-xs p-2 italic my-2">
        *Se ha borrado el usuario de manera exitosa.
      </div>

      <div v-if="$route.query.passwordActualizado" class="transition-opacity bg-yellow-200 text-yellow-800 text-xs p-2 italic my-2">
        *Se ha actualizado la contraseña del usuario.
      </div>
    </section>
  </section>

  <article v-if="loading" class="flex items-center justify-center h-64">
    <p class="text-xl">Cargando...</p>
  </article>

  <article v-else>
    <table class="w-full text-xs">
      <thead class="font-bold text-sm">
        <td class="pl-2">ID</td>
        <td>Nombre de Usuario</td>
        <td>Nombre</td>
        <td>Alias</td>
        <td>Acciones</td>
      </thead>
      <tbody class="border-1 border-black pl-2">
        <tr v-for="usuario in usuarios" :key="usuario.id" class="odd:bg-slate-200 even:bg-slate-50 hover:bg-slate-300">
          <td class="pl-2">{{usuario.id}}</td>
          <td>{{usuario.username}}</td>
          <td>{{usuario.nombre_completo}}</td>
          <td>{{usuario.alias}}</td>
          <td class="py-2 pr-2">
            <NuxtLink :to="`./usuarios/read/${usuario.id}`" class="p-2 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded-md">Ver Más</NuxtLink>
            <NuxtLink :to="`./usuarios/edit/${usuario.id}`" class="p-2 ml-2 text-xs bg-orange-600 hover:bg-orange-700 text-white rounded-md text-slate-20">Editar</NuxtLink>
            <button @click="confirmarEliminacion(usuario)" class="p-2 ml-2 text-xs bg-red-600 hover:bg-red-700 text-white rounded-md">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </article>

  <!-- Modal de Confirmación -->
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title class="headline">Confirmar Eliminación</v-card-title>
      <v-card-text>¿Estás seguro de que deseas eliminar este usuario?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="cancelarEliminacion">Cancelar</v-btn>
        <v-btn color="green darken-1" text @click="eliminarUsuarioConfirmado">Eliminar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
const usuarios = ref([]);
const loading = ref(true);
const dialog = ref(false);
const usuarioSeleccionado = ref(null);
const usuarioEliminado = ref(false);

const fetchDataFromFirebase = async () => {
  const data = await fetchDataByCollection('usuarios');
  usuarios.value = data;
  loading.value = false;
};

onMounted(fetchDataFromFirebase);

const confirmarEliminacion = (usuario) => {
  usuarioSeleccionado.value = usuario;
  dialog.value = true;
};

const cancelarEliminacion = () => {
  usuarioSeleccionado.value = null;
  dialog.value = false;
};

const eliminarUsuarioConfirmado = async () => {
  if (usuarioSeleccionado.value) {
    await deleteDataByDocId('usuarios', usuarioSeleccionado.value.id);
    usuarios.value = usuarios.value.filter(u => u.id !== usuarioSeleccionado.value.id);
    usuarioSeleccionado.value = null;
    dialog.value = false;
    usuarioEliminado.value = true;
    setTimeout(() => {
      usuarioEliminado.value = false;
    }, 3000); // Ocultar el mensaje de éxito después de 3 segundos
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}
</style>
