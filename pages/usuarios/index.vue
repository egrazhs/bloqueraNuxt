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
			<thead class="font-bold text-sm">
				<tr class="text-left">
					<th class="pl-2">ID</th>
					<th>Nombre de Usuario</th>
					<th>Nombre</th>
					<th>Alias</th>
					<th>Acciones</th>
				</tr>
			</thead>
			<tbody class="border-1 border-black pl-2">
				<tr v-for="usuario in usuarios" :key="usuario.id" :data-key="usuario.id" class="odd:bg-slate-200 even:bg-slate-50 hover:bg-slate-300">
					<td class="pl-2">{{usuario.id}}</td>
					<td>{{usuario.username}}</td>
					<td>{{usuario.nombre_completo}}</td>
					<td>{{usuario.alias}}</td>
					<td class="py-2 pr-2">
						<buttonsSeeMore :route="`./usuarios/read/${usuario.id}`" />
						<ButtonsEdit :route="`./usuarios/edit/${usuario.id}`" />
						<ButtonsDelete :item="usuario" @confirm="confirmarEliminacion" />
					</td>
				</tr>
			</tbody>
		</table>
	</article>

	<ModalsConfirmDelete 
      :show="dialog" 
      :item="usuarioSeleccionado" 
      confirmMessage="¿Estás seguro de que deseas eliminar este usuario?" 
      :deleteFunction="eliminarUsuarioConfirmado" 
      @cancel="cancelarEliminacion" 
      @confirm="eliminarUsuarioConfirmado" 
    />
</template>

<script setup>
	const usuarios = ref([]);
	const loading = ref(true);
	const dialog = ref(false);
	const usuarioSeleccionado = ref(null);
	const usuarioEliminado = ref(false);
	const eliminando = ref(false);
	const error = ref('');


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
