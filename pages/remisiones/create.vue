<template>
	<v-container>
		<ScreensLoading v-if="loading"></ScreensLoading>
		<section>
			<div class="flex align-center">
				<ButtonsReturnArrow class="mr-4" size="x-small" />
				<h1 class="font-bold text-4xl">Crear Remisión</h1>
			</div>

			<v-divider :thickness="2" class="border-opacity-100 border-slate-400 my-4"></v-divider>

			<form @submit.prevent="handleSubmit">
				<div class="my-2">
					<label for="id_remision" class="block font-semibold">Número de remisión:</label>
					<v-text-field
						v-model="id_remision_personalizada"
						:label="id_remision"
						type="number"
						placeholder="el numero será el indicado arriba si no se especifica uno.">
					</v-text-field>
				</div>

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

				<v-row>
					<v-col cols="6">
						<div class="my-2">
							<label for="obra" class="block font-semibold">Obra:</label>
							<input v-model="obra" type="text" id="obra" class="input-field">
						</div>
					</v-col>

					<v-col cols="6">
						<div class="my-4">
							<label for="datetime" class="block font-semibold">Fecha:</label>
							<input v-model="fecha" type="datetime-local" id="datetime" class="input-field" required>
						</div>

						<div class="my-4">
							<input v-model="usarHoraActual" type="checkbox" id="usarHoraActual" @change="actualizarFecha">
			      			<label for="usarHoraActual" class="font-semibold italic">: *Usar hora actual</label>
			    		</div>
					</v-col>
				</v-row>
				
				<v-divider :thickness="2" class="border-opacity-100 border-slate-400 my-4"></v-divider>

				<h4 class="font-bold">Materiales:</h4>

				<v-btn @click="addMaterial" class="mb-4 bg-green-600">Agregar Material</v-btn>

				<div v-for="(material, index) in materiales" :key="index" class="my-4">
					<v-card class="pa-4 mb-4">
						<h6>{{index+1}})</h6>
						<v-row>
							<v-col cols="4">
								<v-autocomplete
									v-model="material.producto"
									:items="nombres_productos"
									item-text="nombre"
									item-value="id"
									label="Producto"
									no-data-text="Producto inexistente"
									required>
								</v-autocomplete>
							</v-col>
							<v-col cols="4">
								<v-text-field
									v-model="material.cantidad"
									type="number"
									label="Cantidad"
									required>
								</v-text-field>
							</v-col>
							<v-col cols="4">
								<v-text-field
									v-model="material.precio_unitario"
									type="number"
									label="Precio Unitario"
									required>
								</v-text-field>
							</v-col>
						</v-row>
						
						<v-btn @click="removeMaterial(index)" class="mt-2" color="red">Quitar</v-btn>
					</v-card>
				</div>

				<button type="submit" class="btn-primary" @click="handleSubmit">Guardar</button>
			</form>
		</section>
	</v-container>
</template>

<script setup>
	import { ref, onMounted } from 'vue';
	import { useRouter } from 'vue-router';

	const router = useRouter();

	const loading = ref(true);

	const id_remision = ref(0);
	const id_remision_personalizada = ref(''); // Nuevo campo para el ID especificado por el usuario
	const usarHoraActual = ref(false);
	const cliente = ref('');
	const obra = ref('');
	const fecha = ref('');
	const materiales = ref([{ producto: '', cantidad: 1, precio_unitario: 0 }]);

	let { data: api_clientes } = await useFetch('/api/clientes');
	let { data: api_productos } = await useFetch('/api/productos');

	const nombres_clientes = ref([]); 
	nombres_clientes.value = api_clientes._value.clientes.map(cliente => cliente.nombre);

	const nombres_productos = ref([]); 
	nombres_productos.value = api_productos._value.productos.map(producto => producto.nombre);

	id_remision.value = await getNextId('remisiones');
	id_remision.value = parseInt(id_remision.value, 10);

	const addMaterial = () => {
		materiales.value.push({ producto: '', cantidad: 1, precioUnitario: 0 });
	};

	const removeMaterial = (index) => {
		if (materiales.value.length > 1) {
			materiales.value.splice(index, 1);
		}
	};

	const handleSubmit = async () => {
		try {
			const nuevo_id = id_remision_personalizada.value || await getNextId("remisiones"); // Usar el ID del usuario si está disponible

			// Crear un nuevo objeto con los datos de la remisión
			const nuevoDoc = {
				cliente: parseInt(api_clientes._value.clientes.find((cli) => cli.nombre == cliente.value).id, 10),
				material: materiales.value,
				id: nuevo_id,
				fecha: fecha.value,
				obra: obra.value,
				_type: 'remisiones'
			};

			// Agregar el nuevo usuario a Firestore utilizando el ID personalizado
			await agregarDocumento('remisiones', nuevoDoc, nuevo_id);

			// Limpiar los campos del formulario después de agregar el usuario
			cliente.value = '';
			materiales.value = [{ producto: '', cantidad: 1, precioUnitario: 0 }];

			// Mostrar un mensaje de éxito u otra acción deseada
			await router.push({ path: '/remisiones', query: { c: true } });

		} catch (error) {
			console.error('Error al agregar remisión:', error.message);
		}
	};

	onMounted( () => {
		loading.value =  false;
	});

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
