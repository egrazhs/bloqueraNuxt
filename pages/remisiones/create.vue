<template>
	<ScreensLoading v-if="loading"></ScreensLoading>
	<section v-else>
		<div class="flex align-center">
			<ButtonsReturnArrow class="mr-4" size="x-small" />
			<h1 class="font-bold text-4xl">Crear Remisión</h1>
		</div>

		<v-divider :thickness="2" class="border-opacity-100 border-slate-400 my-4"></v-divider>

		<form @submit.prevent="handleSubmit">
			<!--Numero de Remisión-->
			<div class="my-2">
				<label for="id_remision" class="block font-semibold">Número de remisión:</label>
				<v-text-field
					v-model="id_remision"
					:label="id_remision_sugerido.toString()"
					type="number"
					placeholder="el numero será el indicado arriba si no se especifica uno.">
				</v-text-field>
			</div>

			<!--Elegir Cliente -->
			<div class="my-2">
				<label for="cliente" class="block font-semibold">Cliente:</label>
				<v-autocomplete
					v-model="cliente"
					:items="clientes"
					item-title="nombre"
					item-value="id"
					label="Cliente"
					no-data-text="Cliente inexistente"
					required
				></v-autocomplete>
			</div>

			<!--Obra y fecha y Hora-->
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

			<!--Listado de Materiales de la remisión-->
			<div v-for="(material, index) in materiales" :key="index" class="my-2">	
				<v-card class="pa-2 mb-2">
					<div class="flex justify-between mb-4">
						<h6 class="font-bold">{{index+1}})</h6>
						<v-btn @click="removeMaterial(index)" class="mt-2" color="red">Quitar</v-btn>
					</div>
					<v-row>
						<v-col cols="4">
							<v-autocomplete
								v-model="material.producto"
								:items="productos"
								item-title="nombre"
								item-value="id"
								label="Producto"
								no-data-text="Producto inexistente"
								required
								@update:model-value="actualizarPrecioUnitario(index)">
							</v-autocomplete>
						</v-col>
						<v-col cols="4">
							<v-text-field
								v-model="material.cantidad"
								type="number"
								label="Cantidad"
								required>
							</v-text-field>

							<v-text class="text-caption">
								Stock actual: {{ obtenerStock(material.producto) }}
							</v-text>
						</v-col>
						<v-col cols="4">
							<v-text-field
								v-model="material.precio_unitario"
								type="number"
								label="Precio Unitario"
								required
								@blur="material.precio_unitario = parseFloat(material.precio_unitario || 0).toFixed(2)">
							</v-text-field>
						</v-col>
					</v-row>

					<v-row>
						<v-col cols="12">
							<v-text class="font-weight-bold">
								Subtotal: {{ (material.precio_unitario * material.cantidad || 0).toFixed(2) }}
							</v-text>
						</v-col>
					</v-row>
				</v-card>
			</div>

			<!--Mostrar el total de la remisión-->
			<div>
				<h6 class="font-bold text-4xl my-4">Total: $<span>{{ formattedTotalRemision }}</span></h6>
			</div>


			<!-- Sección para el abono -->
			<div class="my-4">
				<input v-model="hacerAbono" type="checkbox" id="hacerAbono" />
				<label for="hacerAbono" class="font-semibold">Hacer Abono al momento de la remision.</label>

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
</template>

<script setup>
	const router = useRouter();
	const loading = ref(true);

	//Props para crear la remisión
	const id_remision_sugerido = ref();
	const id_remision = ref('');
	
	const cliente = ref('');
	
	const obra = ref('');
	const fecha = ref('');
	const usarHoraActual = ref(false);

	const materiales = ref([{ producto: '', cantidad: 1, precio_unitario: 0 }]);

	const total_remision = computed(() => {
		return materiales.value.reduce((total, material) => {
			const precioUnitario = parseFloat(material.precio_unitario) || 0;
			const cantidad = parseFloat(material.cantidad) || 0;
			return total + (precioUnitario * cantidad);
		}, 0);
	});

	const formattedTotalRemision = computed(() => {
		return total_remision.value.toFixed(2);
	});

	const hacerAbono = ref(false);
	const pagarEnSuTotalidad = ref(false);
	const cantidadAbono = ref(0);


	//Data para los autocomplete y selects
	const clientes = ref([]);
	const productos = ref([]);


	//Funciones Extras
	function actualizarFecha() {
		if (usarHoraActual.value) {
			fecha.value = obtenerFechaHoraActual();
		}
	}

	function obtenerFechaHoraActual() {
		const now = new Date();
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, '0');
		const day = String(now.getDate()).padStart(2, '0');
		const hours = String(now.getHours()).padStart(2, '0');
		const minutes = String(now.getMinutes()).padStart(2, '0');
		return `${year}-${month}-${day}T${hours}:${minutes}`;
	}

	const addMaterial = () => {
		materiales.value.push({});
	};

	const removeMaterial = (index) => {
		if (materiales.value.length > 1) {
			materiales.value.splice(index, 1);
		}
	};

	const actualizarPrecioUnitario = (index) => {
		// Verificar si la función se está ejecutando
		console.log("Función actualizarPrecioUnitario llamada para el índice:", index);

		const productoId = materiales.value[index].producto;
		// Comprobar el valor de productoId
		console.log("ID del producto seleccionado:", productoId);

		const productoSeleccionado = productos.value.find(p => p.id === productoId);
		// Verificar si se encontró el producto seleccionado
		console.log("Producto seleccionado:", productoSeleccionado);
		console.log("El nuevo precio deberia ser:", productoSeleccionado.precio_unitario);

		// Si se encuentra el producto, actualizar el precio unitario
		if (productoSeleccionado) {
			materiales.value[index].precio_unitario = parseFloat(productoSeleccionado.precio_unitario || 0).toFixed(2);
			// Verificar la actualización del precio unitario
			console.log("Precio unitario actualizado a:", materiales.value[index].precio_unitario);
		} else {
			// Si el producto no se encuentra, asignar un valor predeterminado
			materiales.value[index].precio_unitario = 0;
			console.log("Producto no encontrado, precio unitario asignado a 0");
		}
	};

	const actualizarCantidadAbono = () => {
		if (pagarEnSuTotalidad.value) {
			cantidadAbono.value = total_remision.value; // Asigna el total de la remisión
		} else {
			cantidadAbono.value = 0; // Resetea la cantidad si no se paga en su totalidad
		}
	};

	// Obtener el stock del producto seleccionado
	function obtenerStock(productoId) {
		const producto = productos.value.find(prod => prod.id === productoId);
		return producto ? producto.stock : 'Sin stock';
	}

	// Verificar si la cantidad solicitada es menor o igual al stock disponible
	function verificarCantidad(material) {
		const producto = productos.value.find(prod => prod.id === material.producto);
		if (producto && material.cantidad > producto.stock) {
			alert('La cantidad excede el stock disponible');
			material.cantidad = producto.stock;
		}
	}


	//Crear nueva remisión
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
		 			id: id_abono,
		 			id_cliente: clientes.value.find((cli) => cli.id == cliente.value).id,
		 			nombre_cliente: clientes.value.find((cli) => cli.id == cliente.value).nombre,
		 		};

		 		await agregarDocumento('abonos', nuevoAbono, id_abono);
		 	}



		 	//Agregar remisión
    		
    		//Sacar el nuevo id
			let nuevo_id = '';
			if (id_remision.value) {
				nuevo_id = padWithZeros(id_remision.value, 6);
			} else {
      			nuevo_id = await getNextId("remisiones");
			}

			// Convertir los nombres de productos a IDs
			const materialesConIds = materiales.value.map(material => {
  				const producto = productos.value.find(prod => prod.id === material.producto);
	  			if (!producto) {
	  				throw new Error(`Producto no encontrado: ${material.producto}`);
	  			}
				return {
					id_producto: producto.id,
					nombre_producto: producto.nombre,
					cantidad: material.cantidad,
					precio_unitario: material.precio_unitario
				};
			});


			// Crear un nuevo objeto con los datos de la remisión
			const nuevoDoc = {
				id_cliente: clientes.value.find((cli) => cli.id == cliente.value).id,
				nombre_cliente: clientes.value.find((cli) => cli.id == cliente.value).nombre,
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

	onMounted(async () => {
		//Logica para la info a mostrar en la pagina antes de mostrar
		id_remision_sugerido.value = parseInt(await getNextId('remisiones'), 10);

		// Obtener y procesar los nombres de los clientes
		const db_clientes = await fetchDataByCollection('clientes');
		clientes.value = db_clientes.map(cliente => ({
			id: cliente.id,       // Asegúrate de que `id` sea un String o Number
			nombre: cliente.nombre // El nombre que se mostrará en el autocomplete
		}));

		//Obtener y procesar los nombres de los productos
		const db_productos = await fetchDataByCollection('productos');
		productos.value = db_productos.map(producto => ({
			id: producto.id,
			nombre: producto.descripcion,
			precio_unitario: producto.precio_recogido_en_planta,
			stock: producto.stock
		}));

		//Listo para mostrar la pagina
		loading.value = false;
	});
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