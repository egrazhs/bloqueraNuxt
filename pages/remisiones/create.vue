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
				<div class="my-4">
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
	import { ref } from 'vue';
	import { useRouter } from 'vue-router';

	const router = useRouter();

	const loading = ref(true);
	const nombre = ref('');
	const cliente = ref('');
	const materiales = ref([{ producto: '', cantidad: 1, precio_unitario: 0 }]);

	let { data: api_clientes } = await useFetch('/api/clientes');
	let { data: api_productos } = await useFetch('/api/productos');

	const nombres_clientes = ref([]); 
	nombres_clientes.value = api_clientes._value.clientes.map(cliente => cliente.nombre);

	const nombres_productos = ref([]); 
	nombres_productos.value = api_productos._value.productos.map(producto => producto.nombre);

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
			const nuevo_id = await getNextId("remisiones");

			// Crear un nuevo objeto con los datos de la remisión
			const nuevoDoc = {
				cliente: parseInt(api_clientes._value.clientes.find((cli) => cli.nombre == cliente.value).id, 10),
				material: materiales.value,
				id: nuevo_id,
				fecha: '2024-07-02T01:32',
				obra: 'Obra de prueba',
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
