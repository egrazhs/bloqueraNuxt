<template>
	<section>
		<div class="flex align-center">
			<ButtonsReturnArrow class="mr-4" size="x-small" />
			<h1 class="font-bold text-4xl">Crear Abono</h1>
		</div>

		<v-divider :thickness="2" class="border-opacity-100 border-slate-400 my-4"></v-divider>

		<form @submit.prevent="handleSubmit">
			<div class="my-2">
				<label for="cliente" class="block font-semibold">Cliente:</label>
				<v-autocomplete
					v-model="cliente"
					:items="nombres_clientes"
					item-text="nombre"
					item-value="id"
					label="Cliente"
					no-data-text="Cliente inexistente"
					required>
				</v-autocomplete>
			</div>

			<div class="my-4">
				<label for="cantidad" class="block font-semibold">Cantidad:</label>
				<input v-model="cantidad" type="number" min="0" id="cantidad" class="input-field" required>
			</div>

			<div class="my-4">
				<label for="fecha" class="block font-semibold">Fecha:</label>
				<input v-model="fecha" type="datetime-local" id="fecha" class="input-field" required>
			</div>

			<div class="my-4">
				<input v-model="usarHoraActual" type="checkbox" id="usarHoraActual" @change="actualizarFecha">
				<label for="usarHoraActual" class="font-semibold italic">: *Usar hora actual</label>
			</div>
			
			<button type="submit" class="btn-primary" @click="handleSubmit">Guardar</button>
		</form>
	</section>
</template>

<script setup>
	const router = useRouter();

	const { data: api_clientes } = await useFetch('/api/clientes');

	const nombres_clientes = ref([]); 
	nombres_clientes.value = api_clientes._value.clientes.map(cliente => cliente.nombre);

	const cantidad = ref(0);
	const fecha = ref('');
	const usarHoraActual = ref(false);
	const cliente = ref('');

	const handleSubmit = async () => {
		try {
			const nuevo_id = await getNextId("abonos");

			// Crear un nuevo objeto con los datos del usuario
			const nuevoDoc = {
				cliente: cliente.value,
		  		fecha: fecha.value,
		  		cantidad: cantidad.value,
		  		id: nuevo_id,
		  		_type: 'abonos'
			};

			

			// Agregar el nuevo usuario a Firestore utilizando el ID personalizado
			await agregarDocumento('abonos', nuevoDoc, nuevo_id);

			// Limpiar los campos del formulario después de agregar el usuario
			cliente.value = '';
			fecha.value = '';
			cantidad.value = 0;

			// Mostrar un mensaje de éxito u otra acción deseada
			await router.push({ path: '/abonos', query: { c: true } });

		} catch (error) {
			console.error('Error al agregar Abono:', error.message);
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