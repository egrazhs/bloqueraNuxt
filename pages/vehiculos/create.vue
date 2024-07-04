<template>
	<section>
		<div class="flex align-center">
			<ButtonsReturnArrow class="mr-4" size="x-small" />
			<h1 class="font-bold text-4xl">Agregar Vehículo Nuevo</h1>
		</div>

		<v-divider :thickness="2" class="border-opacity-100 border-slate-400 my-4"></v-divider>

		<form @submit.prevent="handleSubmit">
			<div class="my-4">
				<label for="alias" class="block font-semibold">Alias:</label>
				<input v-model="alias" type="text" id="alias" class="input-field" required>
			</div>

			<div class="my-4">
				<label for="matricula" class="block font-semibold">Alias:</label>
				<input v-model="matricula" type="text" id="matricula" class="input-field" required>
			</div>

			<div class="my-4">
				<label for="modelo" class="block font-semibold">Alias:</label>
				<input v-model="modelo" type="text" id="modelo" class="input-field" required>
			</div>

			<div class="my-4">
				<label for="year" class="block font-semibold">Año:</label>
				<input v-model="year" type="number" id="year" class="input-field" required>
			</div>
			
			<button type="submit" class="btn-primary">Guardar</button>
		</form>
	</section>
</template>

<script setup>

const router = useRouter();

const alias = ref('');
const matricula = ref('');
const modelo = ref('');
const year = ref(0);


const handleSubmit = async () => {
	try {
		const nuevo_id = await getNextId("vehiculos");

		// Crear un nuevo objeto con los datos del usuario
		const nuevoDoc = {
	  		alias: alias.value,
	  		matricula: matricula.value,
	  		modelo: modelo.value,
	  		year: year.value,
	  		id: nuevo_id,
	  		_type: 'vehiculos'
		};

		

		// Agregar el nuevo usuario a Firestore utilizando el ID personalizado
		await agregarDocumento('vehiculos', nuevoDoc, nuevo_id);

		// Limpiar los campos del formulario después de agregar el usuario
		alias.value = '';
		matricula.value = '';
		modelo.value = '';
		year.value = 0;

		// Mostrar un mensaje de éxito u otra acción deseada
		await router.push({ path: '/vehiculos', query: { c: true } });

	} catch (error) {
		console.error('Error al agregar vehiculo:', error.message);
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