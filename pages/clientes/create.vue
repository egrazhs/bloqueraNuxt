<template>
	<section>
		<div class="flex align-center">
			<ButtonsReturnArrow class="mr-4" size="x-small" />
			<h1 class="font-bold text-4xl">Crear Cliente</h1>
		</div>

		<v-divider :thickness="2" class="border-opacity-100 border-slate-400 my-4"></v-divider>

		<form @submit.prevent="handleSubmit">
			<div class="my-4">
				<label for="nombre" class="block font-semibold">Nombre:</label>
				<input v-model="nombre" type="text" id="nombre" class="input-field" required>
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

const nombre = ref('');
const alias = ref('');

const handleSubmit = async () => {
	try {
		const nuevo_id = await getNextId("clientes");

		// Crear un nuevo objeto con los datos del usuario
		const nuevoDoc = {
			nombre: nombre.value,
	  		alias: alias.value,
	  		id: nuevo_id,
	  		_type: 'clientes'
		};

		

		// Agregar el nuevo usuario a Firestore utilizando el ID personalizado
		await agregarDocumento('clientes', nuevoDoc, nuevo_id);

		// Limpiar los campos del formulario después de agregar el usuario
		nombre.value = '';
		alias.value = '';

		// Mostrar un mensaje de éxito u otra acción deseada
		await router.push({ path: '/clientes', query: { c: true } });

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