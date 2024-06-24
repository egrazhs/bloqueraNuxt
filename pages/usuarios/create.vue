<template>
	<section>
		<div class="flex align-center">
			<ButtonsReturnArrow class="mr-4" size="x-small" />
			<h1 class="font-bold text-4xl">Crear Usuario</h1>
		</div>

		<v-divider :thickness="2" class="border-opacity-100 border-slate-400 my-4"></v-divider>

		<form @submit.prevent="handleSubmit">
			<div class="my-4">
				<label for="nombre" class="block font-semibold">Nombre:</label>
				<input v-model="nombre_completo" type="text" id="nombre" class="input-field" required>
			</div>
			<div class="my-4">
				<label for="username" class="block font-semibold">Username:</label>
				<input v-model="username" type="text" id="username" class="input-field" required>
			</div>
			<div class="my-4">
				<label for="alias" class="block font-semibold">Alias:</label>
				<input v-model="alias" type="text" id="alias" class="input-field" required>
			</div>
			
			<button type="submit" class="btn-primary">Guardar</button>
		</form>
	</section>
</template>

<script setup>

const router = useRouter();

const nombre_completo = ref('');
const username = ref('');
const alias = ref('');

const handleSubmit = async () => {
	try {
		const nuevo_id = await getNextId("usuarios");

		// Crear un nuevo objeto con los datos del usuario
		const nuevoUsuario = {
<<<<<<< HEAD
			nombre_completo: nombre_completo.value,
=======
			nombre_completo: nombre.value,
>>>>>>> b55e77ec30160e40abe477eb34f78045f3d3e9f3
	  		username: username.value,
	  		alias: alias.value,
	  		id: nuevo_id,
	  		can_create_usuarios: true,
	  		can_read_usuarios: true,
	  		can_update_usuarios: true,
	  		can_delete_usuarios: true,
	  		can_create_clientes: true,
	  		can_read_clientes: true,
	  		can_update_clientes: true,
	  		can_delete_clientes: true,
	  		can_create_proveedores: true,
	  		can_read_proveedores: true,
	  		can_update_proveedores: true,
	  		can_delete_proveedores: true,
	  		can_create_vehiculos: true,
	  		can_read_vehiculos: true,
	  		can_update_vehiculos: true,
	  		can_delete_vehiculos: true,
	  		can_create_productos: true,
	  		can_read_productos: true,
	  		can_update_productos: true,
	  		can_delete_productos: true,
	  		can_create_sucursales: true,
	  		can_read_sucursales: true,
	  		can_update_sucursales: true,
	  		can_delete_sucursales: true,
	  		can_create_arqueos: true,
	  		can_read_arqueos: true,
	  		can_update_arqueos: true,
	  		can_delete_arqueos: true,
	  		can_create_remisiones: true,
	  		can_read_remisiones: true,
	  		can_update_remisiones: true,
	  		can_delete_remisiones: true,
		};

		

		// Agregar el nuevo usuario a Firestore utilizando el ID personalizado
		await agregarDocumento('usuarios', nuevoUsuario, nuevo_id);

		// Limpiar los campos del formulario después de agregar el usuario
		nombre_completo.value = '';
		username.value = '';
		alias.value = '';

		// Mostrar un mensaje de éxito u otra acción deseada
		await router.push({ path: '/usuarios', query: { c: true } });

	} catch (error) {
		console.error('Error al agregar usuario:', error.message);
	}
};
</script>

<style>
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
