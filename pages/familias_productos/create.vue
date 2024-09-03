<template>
	<section>
		<div class="flex align-center">
			<ButtonsReturnArrow class="mr-4" size="x-small" />
			<h1 class="font-bold text-4xl">Agregar Familia de Producto Nuevo</h1>
		</div>

		<v-divider :thickness="2" class="border-opacity-100 border-slate-400 my-4"></v-divider>

		<form @submit.prevent="handleSubmit">
			<div class="my-4">
				<label for="nombre" class="block font-semibold">Código:</label>
				<input v-model="codigo" type="text" id="nombre" class="input-field" required>
			</div>

			<div class="my-4">
				<label for="matricula" class="block font-semibold">Descripción:</label>
				<input v-model="descripcion" type="text" id="descripcion" class="input-field" required>
			</div>
			
			<button type="submit" class="btn-primary">Guardar</button>
		</form>
	</section>
</template>

<script setup>

const router = useRouter();

const descripcion = ref('');
const codigo = ref('');


const handleSubmit = async () => {
	try {
		const nuevo_id = await getNextId("familias_productos", 3);

		// Crear un nuevo objeto con los datos del usuario
		const nuevoDoc = {
	  		descripcion: descripcion.value,
	  		codigo: codigo.value,
	  		id: nuevo_id,
	  		_type: 'familias_productos'
		};

		// Agregar el nuevo usuario a Firestore utilizando el ID personalizado
		await agregarDocumento('familias_productos', nuevoDoc, nuevo_id);

		// Limpiar los campos del formulario después de agregar el usuario
		descripcion.value = '';
		codigo.value = '';

		// Mostrar un mensaje de éxito u otra acción deseada
		await router.push({ path: '/familias_productos', query: { c: true } });

	} catch (error) {
		console.error('Error al agregar Producto:', error.message);
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