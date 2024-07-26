<template>
	<v-container>
		<ScreensLoading v-if="loading"></ScreensLoading>
		<section v-else>
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
						:label="id_remision.toString()"
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
						<div>
							<label for="obra" class="block font-semibold">Obra (Opcional):</label>
							<input v-model="obra" type="text" id="obra" class="input-field">
						</div>
					</v-col>

					<v-col cols="6">
						<div>
							<label for="datetime" class="block font-semibold">Fecha:</label>
							<input v-model="fecha" type="datetime-local" id="datetime" class="input-field" required>
						</div>

						<div class="my-4">
							<input v-model="usarHoraActual" type="checkbox" id="usarHoraActual" @change="actualizarFecha">
							<label for="usarHoraActual" class="font-semibold italic">: *Usar hora actual</label>
						</div>
					</v-col>
				</v-row>

				<v-divider :thickness="2" class="border-opacity-100 border-slate-400 my-6"></v-divider>

				<div class="flex justify-between">
					<h4 class="font-bold text-2xl">Materiales:</h4>
					<v-btn @click="addMaterial" color="primary">+ Agregar Material</v-btn>
				</div>

				<v-divider :thickness="1" class="border-opacity-100 border-slate-400 my-6"></v-divider>

				<div v-for="(material, index) in materiales" :key="index" class="my-4">	
					<v-card class="pa-4 mb-4">
						<div class="flex justify-between mb-4">
							<h6 class="font-bold">{{index+1}})</h6>
							<v-btn @click="removeMaterial(index)" class="mt-2" color="red">Quitar</v-btn>
						</div>
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
					</v-card>
				</div>


				<div>
					<h6 class="font-bold text-4xl my-4">Total: $<span>{{ formattedTotalRemision }}</span></h6>
				</div>

				<!-- Sección para el abono -->
				<div class="my-4">
					<input v-model="hacerAbono" type="checkbox" id="hacerAbono" />
					<label for="hacerAbono" class="font-semibold">Hacer Abono</label>

					<div v-if="hacerAbono" class="mt-2">
						<input v-model="pagarEnSuTotalidad" type="checkbox" id="pagarEnSuTotalidad" @change="actualizarCantidadAbono" />
						<label for="pagarEnSuTotalidad" class="font-semibold">Pagar en su totalidad</label>

						<div class="mt-2">
							<label for="cantidadAbono" class="block font-semibold">Cantidad a Abonar:</label>
							<v-text-field
							v-model="cantidadAbono"
							type="number"
							id="cantidadAbono"
							placeholder="Ingrese la cantidad a abonar"
							required
							></v-text-field>
						</div>
					</div>
				</div>

				<button type="submit" class="btn-primary" @click="handleSubmit">Guardar</button>
			</form>
		</section>
	</v-container>
</template>

<script setup>
	import { ref, onMounted, computed } from 'vue';
	import { useRouter } from 'vue-router';

	const router = useRouter();

	const loading = ref(true);

	const id_remision = ref(0);
	const id_remision_personalizada = ref('');
	const usarHoraActual = ref(false);
	const cliente = ref('');
	const obra = ref('');
	const fecha = ref('');
	const materiales = ref([{ producto: '', cantidad: 1, precio_unitario: 0 }]);

	const hacerAbono = ref(false);
	const pagarEnSuTotalidad = ref(false);
	const cantidadAbono = ref(0);

	let { data: api_clientes } = await useFetch('/api/clientes');
	let { data: api_productos } = await useFetch('/api/productos');

	const nombres_clientes = ref([]);
	nombres_clientes.value = api_clientes._value.clientes.map(cliente => cliente.nombre);

	const nombres_productos = ref([]);
	nombres_productos.value = api_productos._value.productos.map(producto => producto.nombre);

	id_remision.value = await getNextId('remisiones');
	id_remision.value = parseInt(id_remision.value, 10);

	const total_remision = computed(() => {
		return materiales.value.reduce((total, material) => {
			return total + (material.precio_unitario * material.cantidad);
		}, 0);
	});

	const formattedTotalRemision = computed(() => {
		return total_remision.value.toFixed(2);
	});

	const addMaterial = () => {
		materiales.value.push({ producto: '', cantidad: 1, precio_unitario: 0 });
	};

	const removeMaterial = (index) => {
		if (materiales.value.length > 1) {
			materiales.value.splice(index, 1);
		}
	};

	const actualizarCantidadAbono = () => {
		if (pagarEnSuTotalidad.value) {
			cantidadAbono.value = total_remision.value;
		} else {
			cantidadAbono.value = 0;
		}
	};

	function restar10Segundos(datetimeStr) {
		// Crear un objeto Date a partir de la cadena de fecha y hora
		const datetime = new Date(datetimeStr);

		// Restar 10 segundos (10,000 milisegundos)
		datetime.setSeconds(datetime.getSeconds() - 10);

		// Formatear la fecha y hora de vuelta a una cadena en el formato 'YYYY-MM-DDTHH:MM:SS'
		const year = datetime.getFullYear();
		const month = String(datetime.getMonth() + 1).padStart(2, '0');
		const day = String(datetime.getDate()).padStart(2, '0');
		const hours = String(datetime.getHours()).padStart(2, '0');
		const minutes = String(datetime.getMinutes()).padStart(2, '0');
		const seconds = String(datetime.getSeconds()).padStart(2, '0');

		return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
	}

	const handleSubmit = async () => {
		try {
    		// Validaciones
			if (!cliente.value) {
				alert('El campo cliente es obligatorio');
				return;
			}

			for (const material of materiales.value) {
				if (!material.producto) {
					alert('Todos los productos deben estar especificados');
					return;
				}
				if (material.cantidad <= 0) {
					alert('La cantidad debe ser mayor que 0');
					return;
				}
				if (material.precio_unitario <= 0) {
					alert('El precio unitario debe ser mayor que 0');
					return;
				}
			}

			//Checar si se va a agregar un abono
		 	if(hacerAbono.value){
		 		const id_abono = await getNextId("abonos");

		 		const nuevoAbono = {
		 			_type: 'abonos',
		 			cantidad: cantidadAbono.value,
		 			cliente: api_clientes._value.clientes.find((cli) => cli.nombre == cliente.value).id,
		 			fecha: restar10Segundos(fecha.value),
		 			id: id_abono
		 		};

		 		await agregarDocumento('abonos', nuevoAbono, id_abono);
		 	}

		 	


		 	//Agregar remisión
    		//Sacar el nuevo id
			let nuevo_id = '';
			if (id_remision_personalizada.value) {
				nuevo_id = padWithZeros(id_remision_personalizada.value, 6);
			} else {
      			nuevo_id = await getNextId("remisiones"); // Usar el ID del usuario si está disponible
			}

    		// Convertir los nombres de productos a IDs
			const materialesConIds = materiales.value.map(material => {
  				const producto = api_productos._value.productos.find(prod => prod.nombre === material.producto);
	  			if (!producto) {
	  				throw new Error(`Producto no encontrado: ${material.producto}`);
	  			}
				return {
					producto: producto.id,
					cantidad: material.cantidad,
					precio_unitario: material.precio_unitario
				};
			});

		    // Crear un nuevo objeto con los datos de la remisión
			const nuevoDoc = {
				cliente: api_clientes._value.clientes.find((cli) => cli.nombre == cliente.value).id,
				material: materialesConIds,
				id: nuevo_id,
				fecha: fecha.value,
				obra: obra.value,
				_type: 'remisiones',
				hacerAbono: hacerAbono.value,
				pagarEnSuTotalidad: pagarEnSuTotalidad.value,
				cantidadAbono: cantidadAbono.value
			};

		    // Agregar la nueva remision
		 	await agregarDocumento('remisiones', nuevoDoc, nuevo_id);


		    // Mostrar un mensaje de éxito u otra acción deseada
			await router.push({ path: '/remisiones', query: { c: true } });

		} catch (error) {
			console.error('Error al agregar remisión:', error.message);
			alert(`Error al agregar remisión: ${error.message}`);
		}
	};

	onMounted(() => {
		loading.value = false;
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