<template>
	<section>
		<div class="flex align-center">
			<ButtonsReturnArrow class="mr-4" size="x-small" />
			<h1 class="font-bold text-4xl">Crear Arqueo</h1>
		</div>

		<v-divider :thickness="2" class="border-opacity-100 border-slate-400 my-4"></v-divider>

		<form @submit.prevent="handleSubmit">
			<div class="my-4">
				<label for="datetime" class="block font-semibold">Fecha:</label>
				<input v-model="fecha" type="datetime-local" id="datetime" class="input-field" required>
			</div>

			<div class="my-4">
				<input v-model="usarHoraActual" type="checkbox" id="usarHoraActual" @change="actualizarFecha">
      			<label for="usarHoraActual" class="font-semibold italic">: *Usar hora actual</label>
    		</div>

			<h4 class="py-2 font-bold">Billetes</h4>
			<div class="my-4">
				<label for="billetes_1000" class="block font-semibold">$1000:</label>
				<input v-model="billetes_1000" type="number" class="input-field" required>
			</div>
			<div class="my-4">
				<label for="billetes_500" class="block font-semibold">$500:</label>
				<input v-model="billetes_500" type="number" class="input-field" required>
			</div>
			<div class="my-4">
				<label for="billetes_200" class="block font-semibold">$200:</label>
				<input v-model="billetes_200" type="number" class="input-field" required>
			</div>
			<div class="my-4">
				<label for="billetes_100" class="block font-semibold">$100:</label>
				<input v-model="billetes_100" type="number" class="input-field" required>
			</div>
			<div class="my-4">
				<label for="billetes_50" class="block font-semibold">$50:</label>
				<input v-model="billetes_50" type="number" class="input-field" required>
			</div>
			<div class="my-4">
				<label for="billetes_20" class="block font-semibold">$20:</label>
				<input v-model="billetes_20" type="number" class="input-field" required>
			</div>

			<h4 class="py-2 font-bold">Monedas</h4>
			<div class="my-4">
				<label for="monedas_20" class="block font-semibold">$20:</label>
				<input v-model="monedas_20" type="number" class="input-field" required>
			</div>
			<div class="my-4">
				<label for="monedas_10" class="block font-semibold">$10:</label>
				<input v-model="monedas_10" type="number" class="input-field" required>
			</div>
			<div class="my-4">
				<label for="monedas_5" class="block font-semibold">$5:</label>
				<input v-model="monedas_5" type="number" class="input-field" required>
			</div>
			<div class="my-4">
				<label for="monedas_2" class="block font-semibold">$2:</label>
				<input v-model="monedas_2" type="number" class="input-field" required>
			</div>
			<div class="my-4">
				<label for="monedas_1" class="block font-semibold">$1:</label>
				<input v-model="monedas_1" type="number" class="input-field" required>
			</div>

			<button type="submit" class="btn-primary">Guardar</button>
		</form>
	</section>
</template>

<script setup>
const router = useRouter();

let fecha = ref('');
const usarHoraActual = ref(false);
const billetes_1000 = ref(0);
const billetes_500 = ref(0);
const billetes_200 = ref(0);
const billetes_100 = ref(0);
const billetes_50 = ref(0);
const billetes_20 = ref(0);
const monedas_20 = ref(0);
const monedas_10 = ref(0);
const monedas_5 = ref(0);
const monedas_2 = ref(0);
const monedas_1 = ref(0);

const handleSubmit = async () => {
	try {
		const nuevo_id = await getNextId("arqueos");

		// Crear un nuevo objeto con los datos del usuario
		const nuevoDoc = {
	  		id: nuevo_id,
	  		_type: 'arqueos',
	  		fecha: fecha.value,
	  		billetes_1000: billetes_1000.value,
	  		billetes_500: billetes_500.value,
	  		billetes_200: billetes_200.value,
	  		billetes_100: billetes_100.value,
	  		billetes_50: billetes_50.value,
	  		billetes_20: billetes_20.value,
	  		monedas_20: monedas_20.value,
	  		monedas_10: monedas_10.value,
	  		monedas_5: monedas_5.value,
	  		monedas_2: monedas_2.value,
	  		monedas_1: monedas_1.value
		};

		// Agregar el nuevo usuario a Firestore utilizando el ID personalizado
		await agregarDocumento('arqueos', nuevoDoc, nuevo_id);

		// Limpiar los campos del formulario después de agregar el usuario
		fecha.value = '';
		billetes_1000.value = 0;
		billetes_500.value = 0;
		billetes_200.value = 0;
		billetes_100.value = 0;
		billetes_50.value = 0;
		billetes_20.value = 0;
		monedas_20.value = 0;
		monedas_10.value = 0;
		monedas_5.value = 0;
		monedas_2.value = 0;
		monedas_1.value = 0;

		// Mostrar un mensaje de éxito u otra acción deseada
		await router.push({ path: '/arqueos', query: { c: true } });

	} catch (error) {
		console.error('Error al agregar arqueo:', error.message);
	}
};

function obtenerFechaHoraActual() {
	const now = new Date();
	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, '0');
	const day = String(now.getDate()).padStart(2, '0');
	const hours = String(now.getHours()).padStart(2, '0');
	const minutes = String(now.getMinutes()).padStart(2, '0');
	return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function actualizarFecha() {
	if (usarHoraActual.value) {
		fecha.value = obtenerFechaHoraActual();
	}
}
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
