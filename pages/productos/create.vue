<template>
	<section>
		<div class="flex align-center">
			<ButtonsReturnArrow class="mr-4" size="x-small" />
			<h1 class="font-bold text-4xl">Agregar Producto Nuevo</h1>
		</div>

		<v-divider :thickness="2" class="border-opacity-100 border-slate-400 my-4"></v-divider>

		<form @submit.prevent="handleSubmit">
			<div class="my-4">
				<label for="nombre" class="block font-semibold">Nombre:</label>
				<input v-model="nombre" type="text" id="nombre" class="input-field" required>
			</div>

			<div class="my-4">
				<label for="matricula" class="block font-semibold">Descripción:</label>
				<input v-model="descripcion" type="text" id="descripcion" class="input-field" required>
			</div>

			<div class="my-4">
				<label for="modelo" class="block font-semibold">Código:</label>
				<input v-model="codigo" type="text" id="codigo" class="input-field" required>
			</div>

			<div class="my-4">
				<label for="year" class="block font-semibold">Peso (Kg):</label>
				<input v-model="peso" type="number" id="peso" class="input-field" required>
			</div>

			<h4>Precios</h4>

			<div class="my-4">
				<label for="piso" class="block font-semibold">Piso:</label>
				<input v-model="piso" type="number" id="piso" class="input-field" required>
			</div>

			<div class="my-4">
				<label for="obra" class="block font-semibold">Obra:</label>
				<input v-model="obra" type="number" id="obra" class="input-field" required>
			</div>

			<h4>Cantidades: </h4>

			<div class="my-4">
				<label for="rabon" class="block font-semibold">Rabón:</label>
				<input v-model="rabon" type="number" id="rabon" class="input-field" required>
			</div>

			<div class="my-4">
				<label for="tarima" class="block font-semibold">Tarima:</label>
				<input v-model="tarima" type="number" id="tarima" class="input-field" required>
			</div>

			<div class="my-4">
				<label for="torton" class="block font-semibold">Tortón:</label>
				<input v-model="torton" type="number" id="torton" class="input-field" required>
			</div>
			
			<button type="submit" class="btn-primary">Guardar</button>
		</form>
	</section>
</template>

<script setup>

const router = useRouter();

const nombre = ref('');
const descripcion = ref('');
const codigo = ref('');
const peso = ref(0);
const piso = ref(0);
const obra = ref(0);
const rabon = ref(0);
const tarima = ref(0);
const torton =ref(0);


const handleSubmit = async () => {
	try {
		const nuevo_id = await getNextId("productos");

		// Crear un nuevo objeto con los datos del usuario
		const nuevoDoc = {
	  		nombre: nombre.value,
	  		descripcion: descripcion.value,
	  		codigo: codigo.value,
	  		peso: peso.value,
	  		piso: piso.value,
	  		obra: obra.value,
	  		rabon: rabon.value,
	  		tarima: tarima.value,
	  		torton: torton.value,
	  		id: nuevo_id,
	  		_type: 'productos'
		};

		// Agregar el nuevo usuario a Firestore utilizando el ID personalizado
		await agregarDocumento('productos', nuevoDoc, nuevo_id);

		// Limpiar los campos del formulario después de agregar el usuario
		nombre.value = '';
		descripcion.value = '';
		codigo.value = '';
		peso.value = 0;
		piso.value = 0;
		obra.value = 0;
		rabon.value = 0;
		tarima.value = 0;
		torton.value = 0;

		// Mostrar un mensaje de éxito u otra acción deseada
		await router.push({ path: '/productos', query: { c: true } });

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