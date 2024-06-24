<template>
	<section>
		<h1 class="font-bold text-4xl">Usuarios</h1>

		<div class="mt-4">
<<<<<<< HEAD
			<NuxtLink to="./usuarios/create" class="py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs">Agregar nuevo Usuario</NuxtLink>
=======
			<ButtonsAddNew route="./usuarios/create" text="Usuario" />
>>>>>>> b55e77ec30160e40abe477eb34f78045f3d3e9f3
		</div>

		<hr class="border-1 border-slate-300 my-4">

		<section>
			<!-- Mensaje de éxito -->
			<div v-if="$route.query.c" class="transition-opacity bg-blue-200 text-blue-800 text-xs p-2 italic my-2">
				*Se ha agregado el usuario de manera exitosa.
			</div>

<<<<<<< HEAD
			<div v-if="$route.query.usuarioActualizado" class="hidden transition-opacity bg-yellow-200 text-yellow-800 text-xs p-2 italic my-2">
=======
			<div v-if="$route.query.usuarioActualizado" class="transition-opacity bg-yellow-200 text-yellow-800 text-xs p-2 italic my-2">
>>>>>>> b55e77ec30160e40abe477eb34f78045f3d3e9f3
				*Se ha actualizado la información del usuario.
			</div>

			<div v-if="usuarioEliminado" class="transition-opacity bg-red-200 text-red-800 text-xs p-2 italic my-2">
				*Se ha borrado el usuario de manera exitosa.
			</div>

			<div v-if="$route.query.passwordActualizado" class="transition-opacity bg-yellow-200 text-yellow-800 text-xs p-2 italic my-2">
				*Se ha actualizado la contraseña del usuario.
			</div>

			<!-- Mensaje de error -->
			<div v-if="error" class="transition-opacity bg-red-200 text-red-800 text-xs p-2 italic my-2">
				{{ error }}
			</div>
		</section>
	</section>

	<article v-if="loading" class="flex items-center justify-center h-64">
		<p class="text-xl">Cargando...</p>
	</article>

	<article v-else>
		<table class="w-full text-xs">
<<<<<<< HEAD
			<thead class="font-bold text-sm text-left">
				<tr>
=======
			<thead class="font-bold text-sm">
				<tr class="text-left">
>>>>>>> b55e77ec30160e40abe477eb34f78045f3d3e9f3
					<th class="pl-2">ID</th>
					<th>Nombre de Usuario</th>
					<th>Nombre</th>
					<th>Alias</th>
					<th>Acciones</th>
				</tr>
			</thead>
			<tbody class="border-1 border-black pl-2">
				<tr v-for="usuario in usuarios" :key="usuario.id" :data-key="usuario.id" class="odd:bg-slate-200 even:bg-slate-50 hover:bg-slate-300">
<<<<<<< HEAD
					<td class="pl-2">{{usuario.id}}</td>
=======
					<td class="pl-2">{{ parseInt(usuario.id, 10)}}</td>
>>>>>>> b55e77ec30160e40abe477eb34f78045f3d3e9f3
					<td>{{usuario.username}}</td>
					<td>{{usuario.nombre_completo}}</td>
					<td>{{usuario.alias}}</td>
					<td class="py-2 pr-2">
<<<<<<< HEAD
						<NuxtLink :to="`./usuarios/read/${usuario.id}`" class="p-2 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded-md">Ver Más</NuxtLink>
						<NuxtLink :to="`./usuarios/edit/${usuario.id}`" class="p-2 ml-2 text-xs bg-orange-600 hover:bg-orange-700 text-white rounded-md">Editar</NuxtLink>
						<button @click="confirmarEliminacion(usuario)" class="p-2 ml-2 text-xs bg-red-600 hover:bg-red-700 text-white rounded-md">Eliminar</button>
=======
						<buttonsSeeMore :route="`./usuarios/read/${usuario.id}`" />
						<ButtonsEdit :route="`./usuarios/edit/${usuario.id}`" />
						<ButtonsDelete :item="usuario" @confirm="confirmarEliminacion" />
>>>>>>> b55e77ec30160e40abe477eb34f78045f3d3e9f3
					</td>
				</tr>
			</tbody>
		</table>
	</article>

<<<<<<< HEAD
	<!-- Modal de Confirmación -->
	<v-dialog v-model="dialog" max-width="500">
		<v-card>
			<v-card-title class="headline">Confirmar Eliminación</v-card-title>
			<v-card-text>¿Estás seguro de que deseas eliminar este usuario?</v-card-text>
			<div v-if="usuarioSeleccionado" class="mt-4">
				<v-row class="text-xs italic">
					<v-col cols="1"></v-col>
					<v-col cols="5" md="5">
						<strong>ID:</strong> {{ usuarioSeleccionado.id }}
					</v-col>
					<v-col cols="5" md="5">
						<strong>Nombre de Usuario:</strong> {{ usuarioSeleccionado.username }}
					</v-col>
				</v-row>
			</div>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="red darken-1" text @click="cancelarEliminacion">Cancelar</v-btn>
				<v-btn :disabled="eliminando" color="green darken-1" text @click="eliminarUsuarioConfirmado">
					<template v-if="eliminando">
						<v-progress-circular indeterminate size="20"></v-progress-circular>
					</template>
					<template v-else>
						Eliminar
					</template>
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
=======
	<ModalsConfirmDelete 
      :show="dialog" 
      :item="usuarioSeleccionado" 
      confirmMessage="¿Estás seguro de que deseas eliminar este usuario?" 
      :deleteFunction="eliminarUsuarioConfirmado" 
      @cancel="cancelarEliminacion" 
      @confirm="eliminarUsuarioConfirmado" 
    />
>>>>>>> b55e77ec30160e40abe477eb34f78045f3d3e9f3
</template>

<script setup>
	const usuarios = ref([]);
	const loading = ref(true);
	const dialog = ref(false);
	const usuarioSeleccionado = ref(null);
	const usuarioEliminado = ref(false);
	const eliminando = ref(false);
	const error = ref('');

<<<<<<< HEAD
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
    eliminando.value = true; // Comienza la eliminación
    error.value = ''; // Resetea el mensaje de error
=======

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
>>>>>>> b55e77ec30160e40abe477eb34f78045f3d3e9f3

	const eliminarUsuarioConfirmado = async () => {
		if (usuarioSeleccionado.value) {
			eliminando.value = true; // Comienza la eliminación
			error.value = ''; // Resetea el mensaje de error

<<<<<<< HEAD
    setTimeout(async () => {
    	try {
    		await deleteDataByDocId('usuarios', usuarioSeleccionado.value.id);
    		usuarios.value = usuarios.value.filter(u => u.id !== usuarioSeleccionado.value.id);
    		usuarioSeleccionado.value = null;
    		dialog.value = false;
    		usuarioEliminado.value = true;
    	} catch (err) {
    		error.value = 'Error eliminando el usuario. Por favor, intenta de nuevo.';
    	} finally {
        	eliminando.value = false; // Termina la eliminación
        }
        setTimeout(() => {
        	usuarioEliminado.value = false;
      }, 3000); // Ocultar el mensaje de éxito después de 3 segundos
    }, 500); // Duración de la animación
}
};
=======
			const usuarioRow = document.querySelector(`tr[data-key="${usuarioSeleccionado.value.id}"]`);
			usuarioRow.classList.add('fading-out');

			setTimeout(async () => {
				try {
					await deleteDataByDocId('usuarios', usuarioSeleccionado.value.id);
					usuarios.value = usuarios.value.filter(u => u.id !== usuarioSeleccionado.value.id);
					usuarioSeleccionado.value = null;
					dialog.value = false;
					usuarioEliminado.value = true;
				} catch (err) {
					error.value = 'Error eliminando el usuario. Por favor, intenta de nuevo.';
				} finally {
				eliminando.value = false; // Termina la eliminación
			}
			setTimeout(() => {
				usuarioEliminado.value = false;
			  }, 3000); // Ocultar el mensaje de éxito después de 3 segundos
			}, 500); // Duración de la animación
		}
	};
>>>>>>> b55e77ec30160e40abe477eb34f78045f3d3e9f3
</script>

<style scoped>
	@keyframes fadeOut {
		from { opacity: 1; }
		to { opacity: 0; }
	}

	.fading-out {
		animation: fadeOut 0.5s forwards;
	}

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
