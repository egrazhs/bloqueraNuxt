<template>
	<v-container>
		<ScreensLoading v-if="loading"></ScreensLoading>

		<v-card v-else class="mx-auto mt-5" max-width="600">
			<v-card-title class="headline d-flex align-center">
				<v-btn icon @click="volver">
					<v-icon size="24">mdi-arrow-left</v-icon>
				</v-btn>
				<span class="ml-4">Editar Producto</span>
			</v-card-title>
			<v-divider></v-divider>
			<v-card-text>
				<v-form ref="form" v-model="valid" lazy-validation>
					<v-text-field
						type="text"
						v-model="documento.descripcion"
						:rules="rules.required"
						label="Descripción"
						required
					></v-text-field>

					<v-text-field
						type="text"
						v-model="documento.codigo"
						:rules="rules.required"
						label="Código"
						required
					></v-text-field>

					<v-select
						v-model="documento.familia"
						:items="familias_de_productos"
						item-title="descripcion"
						item-value="id"
						label="Familia de producto"
						no-data-text="Familia inexistente"
						required>
					</v-select>

					<v-text-field
						type="number"
						v-model="documento.precio_recogido_en_planta"
						label="Precio recogido en planta"
					></v-text-field>

					<v-text-field
						type="number"
						v-model="documento.tarimas_por_flete_local_rabon"
						label="Tarimas por flete local Rabon"
					></v-text-field>

					<v-text-field
						type="number"
						v-model="documento.tarimas_por_flete_local_torton"
						label="Tarimas por flete local Torton"
					></v-text-field>

					<v-text-field
						type="number"
						v-model="documento.precio_puesto_en_obra_rabon"
						label="Precio puesto en obra Rabon"
					></v-text-field>

					<v-text-field
						type="number"
						v-model="documento.precio_puesto_en_obra_torton"
						label="Precio puesto en obra torton"
					></v-text-field>

					<v-text-field
						type="number"
						v-model="documento.peso"
						label="Peso (Kg)"
						required
					></v-text-field>

					<v-text-field
						type="number"
						v-model="documento.piezas_por_tarima"
						label="Piezas por tarima"
						required
					></v-text-field>

					<v-select
						v-model="documento.unidad_medida"
						:items="unidades_de_medida"
						item-text="nombre"
						item-value="id"
						label="Unidad de medida"
						no-data-text="Unidad inexistente"
						required>
					</v-select>

					<v-text-field
						type="number"
						v-model="documento.porcentaje_comision_vendedores"
						:rules="rules.required"
						label="Porcentaje de Comision por vendedores (%)"
						required
					></v-text-field>
				</v-form>
			</v-card-text>
			<v-divider></v-divider>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="blue darken-1" @click="guardar" :disabled="!valid">
					Guardar
				</v-btn>
			</v-card-actions>
		</v-card>

		
	</v-container>
</template>

<script setup>
	import { db } from '~/utils/firebase';
	import { getDoc, updateDoc, doc, getFirestore } from 'firebase/firestore';
	
	const route = useRoute();
	const router = useRouter();

	const unidades_de_medida = ref(["PIEZA", "METRO LINEAL", "METRO CUADRADO", "KG", "METRO CUBICO"]);
	const familias_de_productos = ref([]);

	const documento = ref({
		descripcion: '',
		codigo: '',
		peso: 0,
		familia: '',
		precio_recogido_en_planta: 0,
		tarimas_por_flete_local_rabon: 7,
		tarimas_por_flete_local_torton: 10,
		precio_puesto_en_obra_rabon: 0,
		precio_puesto_en_obra_torton: 0
	});

	const loading = ref(true);
	const valid = ref(false);
	const rules = {
		required: [value => !!value || 'Este campo es requerido']
	};

	const volver = () => {
		router.push('/productos');
	};

	const fetchDoc = async () => {
		try {
			const { id } = route.params;
			const doc_a_editar = await getDoc(doc(db, 'productos', id));
			if (doc_a_editar.exists()) {
				documento.value = doc_a_editar.data();
			} else {
				console.error('Producto no encontrado');
			}
		} catch (error) {
			console.error('Error al obtener detalles del producto:', error.message);
		}
	};

	const guardar = async () => {
		try {
			const { id } = route.params;
			//Parsear a int piezas por tarima
			documento.value.piezas_por_tarima = parseInt(documento.value.piezas_por_tarima, 10);

			documento.value.precio_recogido_en_planta = parseFloat(documento.value.precio_recogido_en_planta);
			documento.value.tarimas_por_flete_local_rabon = parseInt(documento.value.tarimas_por_flete_local_rabon, 10);
			documento.value.tarimas_por_flete_local_torton = parseInt(documento.value.tarimas_por_flete_local_torton, 10);
			documento.value.precio_puesto_en_obra_rabon = parseFloat(documento.value.precio_puesto_en_obra_rabon);
			documento.value.precio_puesto_en_obra_torton = parseFloat(documento.value.precio_puesto_en_obra_torton);
			
			await updateDoc(doc(db, 'productos', id), documento.value);
			router.push({ path: '/productos', query: { documentoActualizado: true } });
		} catch (error) {
			console.error('Error al actualizar el producto:', error.message);
		}
	};

	onMounted(async ()=>{
		familias_de_productos.value = await createSelectOfDocuments("familias_productos", "descripcion");
		fetchDoc();
		loading.value = false;
	});
</script>
