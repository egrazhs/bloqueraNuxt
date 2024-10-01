<template>
	<ScreensLoading v-if="loading"></ScreensLoading>
	<section v-else>
		<div class="flex align-center">
			<ButtonsReturnArrow class="mr-4" size="x-small" />
			<h1 class="font-bold text-4xl">Agregar Producto Nuevo</h1>
		</div>

		<v-divider :thickness="2" class="border-opacity-100 border-slate-400 my-4"></v-divider>

		<form @submit.prevent="handleSubmit">
			<div class="my-4">
				<label for="matricula" class="block font-semibold">Descripción:</label>
				<input v-model="descripcion" type="text" id="descripcion" class="input-field" required>
			</div>

			<div class="my-4">
				<label for="modelo" class="block font-semibold">Código:</label>
				<input v-model="codigo" type="text" id="codigo" class="input-field" required>
			</div>

			<div class="my-4">
				<label for="year" class="block font-semibold">Familia de producto:</label>
				<v-select
					v-model="familia_de_producto"
					:items="familias_de_productos"
					item-title="descripcion"
					item-value="id"
					label="Familia de producto"
					no-data-text="Familia inexistente"
					required>
				</v-select>
			</div>

			<div class="my-4">
				<label for="precio_recogido_en_planta" class="block font-semibold">Precio (Recogido en planta):</label>
				<input v-model="precio_recogido_en_planta" type="number" id="precio_recogido_en_planta" class="input-field" required>
			</div>

			<div class="my-4">
				<label for="tarimas_por_flete_local_rabon" class="block font-semibold">Tarimas por flete local (Rabón):</label>
				<input v-model="tarimas_por_flete_local_rabon" type="number" id="tarimas_por_flete_local_rabon" class="input-field" required>
			</div>

			<div class="my-4">
				<label for="tarimas_por_flete_local_torton" class="block font-semibold">Tarimas por flete local Torton:</label>
				<input v-model="tarimas_por_flete_local_torton" type="number" id="tarimas_por_flete_local_torton" class="input-field" required>
			</div>


			<div class="my-4">
				<label for="precio_puesto_en_obra_rabon" class="block font-semibold">Precio puesto en obra (Rabón):</label>
				<input v-model="precio_puesto_en_obra_rabon" type="number" id="precio_puesto_en_obra_rabon" class="input-field" required>
			</div>
			<div class="my-4">
				<label for="precio_puesto_en_obra_torton" class="block font-semibold">Precio puesto en obra (Torton):</label>
				<input v-model="precio_puesto_en_obra_torton" type="number" id="precio_puesto_en_obra_torton" class="input-field" required>
			</div>


			<div class="my-4">
				<label for="peso" class="block font-semibold">Peso (Kg):</label>
				<input v-model="peso" type="number" id="peso" class="input-field" required>
			</div>

			<div class="my-4">
				<label for="piezas_por_tarima" class="block font-semibold">Piezas por Tarima:</label>
				<input v-model="piezas_por_tarima" type="number" id="piezas_por_tarima" class="input-field" required>
			</div>

			<div class="my-4">
				<label for="year" class="block font-semibold">Porcentaje de comisión a vendedores:</label>
				<input v-model="porcentaje_comision" type="number" id="porcentaje_comision" class="input-field" required>
			</div>
			
			<div class="my-4">
				<label for="year" class="block font-semibold">Unidad de medida:</label>
				<v-select
					v-model="unidad_medida"
					:items="unidades_de_medida"
					item-title="nombre"
					item-value="id"
					label="Unidad de medida"
					no-data-text="Unidad inexistente"
					required>
				</v-select>
			</div>

			<button type="submit" class="btn-primary">Guardar</button>
		</form>
	</section>
</template>

<script setup>
	import { db } from '~/utils/firebase';
	import { getDoc, getDocs, updateDoc, doc, getFirestore } from 'firebase/firestore';

	const router = useRouter();

	const loading = ref(true);
	
	const descripcion = ref('');
	const codigo = ref('');
	const peso = ref(0);
	const piezas_por_tarima = ref(0);
	const porcentaje_comision = ref(4);
	const unidad_medida = ref('PIEZA');
	const familia_de_producto = ref('');
	
	const precio_recogido_en_planta = ref(0);
	const tarimas_por_flete_local_rabon = ref(7);
	const tarimas_por_flete_local_torton = ref(10);
	const precio_puesto_en_obra_rabon = ref(0);
	const precio_puesto_en_obra_torton = ref(0);

	const unidades_de_medida = ref(["PIEZA", "METRO LINEAL", "METRO CUADRADO", "KG", "METRO CUBICO"]);
	const familias_de_productos = ref([]);

	const handleSubmit = async () => {
		try {
			const nuevo_id = await getNextId("productos", 3);

			// Crear un nuevo objeto con los datos del usuario
			const nuevoDoc = {
		  		descripcion: descripcion.value,
		  		codigo: codigo.value,
		  		peso: peso.value,
		  		piezas_por_tarima: piezas_por_tarima.value,
		  		porcentaje_comision_vendedores: porcentaje_comision.value,
		  		ruta: "/images/productos/"+codigo.value,
		  		familia: familia_de_producto.value,
		  		unidad_medida: unidad_medida.value,
		  		precio_recogido_en_planta: precio_recogido_en_planta.value,
		  		tarimas_por_flete_local_rabon: tarimas_por_flete_local_rabon.value,
		  		tarimas_por_flete_local_torton: tarimas_por_flete_local_torton.value,
		  		precio_puesto_en_obra_rabon: precio_puesto_en_obra_rabon.value,
		  		precio_puesto_en_obra_torton: precio_puesto_en_obra_torton.value,
		  		id: nuevo_id,
		  		_type: 'productos'
			};

			// Agregar el nuevo usuario a Firestore utilizando el ID personalizado
			await agregarDocumento('productos', nuevoDoc, nuevo_id);

			// Limpiar los campos del formulario después de agregar el usuario

			// Mostrar un mensaje de éxito u otra acción deseada
			await router.push({ path: '/productos/', query: { c: true } });

		} catch (error) {
			console.error('Error al agregar Producto:', error.message);
		}
	};


	onMounted(async ()=>{
		familias_de_productos.value = await createSelectOfDocuments("familias_productos", "descripcion");
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