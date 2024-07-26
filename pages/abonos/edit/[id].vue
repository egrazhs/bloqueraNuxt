<template>
	<v-container>
		<v-card class="mx-auto mt-5" max-width="600">
			<v-card-title class="headline d-flex align-center">
				<v-btn icon @click="volver">
					<v-icon size="24">mdi-arrow-left</v-icon>
				</v-btn>
				<span class="ml-4">Editar Abono</span>
			</v-card-title>
			<v-divider></v-divider>
			<v-card-text>
				<v-form ref="form" v-model="valid" lazy-validation>
					<v-text-field
					type="text"
					v-model="documento.cliente"
					:rules="rules.required"
					label="Cliente"
					required
					></v-text-field>

					<v-text-field
					type="datetime-local"
					v-model="documento.fecha"
					:rules="rules.required"
					label="Fecha"
					required
					></v-text-field>

					<v-text-field
					type="number"
					v-model="documento.cantidad"
					:rules="rules.required"
					label="Cantidad"
					required
					></v-text-field>

					<v-text-field 
					type="text"
					v-model="documento.info_adicional"
					label="Información Adicional"
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

		<ScreensLoading v-if="loading">	
		</ScreensLoading>
	</v-container>
</template>

<script setup>
	import { db } from '~/utils/firebase';
	import { getDoc, updateDoc, doc, getFirestore } from 'firebase/firestore';

	const route = useRoute();
	const router = useRouter();

	const documento = ref({
		cliente: '',
		fecha: '',
		cantidad: 0,
		info_adicional: ''
	});
	const loading = ref(true);
	const valid = ref(false);
	const rules = {
		required: [value => !!value || 'Este campo es requerido']
	};

	const volver = () => {
		router.push('/abonos');
	};

	const fetchDoc = async () => {
		try {
			const { id } = route.params;
			const doc_a_editar = await getDoc(doc(db, 'abonos', id));
			if (doc_a_editar.exists()) {
				documento.value = doc_a_editar.data();
			} else {
				console.error('Abono no encontrado');
			}
		} catch (error) {
			console.error('Error al obtener detalles del abono:', error.message);
		} finally {
			loading.value = false;
		}
	};

	const guardar = async () => {
		try {
			const { id } = route.params;
			await updateDoc(doc(db, 'abonos', id), documento.value);
			router.push({ path: '/abonos', query: { documentoActualizado: true } });
		} catch (error) {
			console.error('Error al actualizar el proveedor:', error.message);
		}
	};

	onMounted(fetchDoc);
</script>
