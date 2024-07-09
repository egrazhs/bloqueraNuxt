<template>
	<v-container>
		<v-card class="mx-auto mt-5" max-width="600">
			<v-card-title class="headline d-flex align-center">
				<v-btn icon @click="volver">
					<v-icon size="24">mdi-arrow-left</v-icon>
				</v-btn>
				<span class="ml-4">Editar Proveedor</span>
			</v-card-title>
			<v-divider></v-divider>
			<v-card-text>
				<v-form ref="form" v-model="valid" lazy-validation>
					<v-text-field
					type="text"
					v-model="documento.nombre"
					:rules="rules.required"
					label="Nombre"
					required
					></v-text-field>

					<v-text-field
					type="text"
					v-model="documento.alias"
					:rules="rules.required"
					label="Alias"
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

		<ScreensLoading v-if="loading">	
		</ScreensLoading>
	</v-container>
</template>

<script setup>
	import { getDoc, updateDoc, doc, getFirestore } from 'firebase/firestore';
	import firebaseConfig from '~/utils/firebaseConfig';
	import { initializeApp } from 'firebase/app';

	const app = initializeApp(firebaseConfig);
	// Obtiene la instancia de Firestore
	const db = getFirestore(app);

	const route = useRoute();
	const router = useRouter();

	const documento = ref({
		nombre: '',
		prefijo: '',
		direccion: ''
	});
	const loading = ref(true);
	const valid = ref(false);
	const rules = {
		required: [value => !!value || 'Este campo es requerido']
	};

	const volver = () => {
		router.push('/sucursales');
	};

	const fetchDoc = async () => {
		try {
			const { id } = route.params;
			const doc_a_editar = await getDoc(doc(db, 'proveedores', id));
			if (doc_a_editar.exists()) {
				documento.value = doc_a_editar.data();
			} else {
				console.error('Proveedor no encontrada');
			}
		} catch (error) {
			console.error('Error al obtener detalles del proveedor:', error.message);
		} finally {
			loading.value = false;
		}
	};

	const guardar = async () => {
		try {
			const { id } = route.params;
			await updateDoc(doc(db, 'proveedores', id), documento.value);
			router.push({ path: '/proveedores', query: { documentoActualizado: true } });
		} catch (error) {
			console.error('Error al actualizar el proveedor:', error.message);
		}
	};

	onMounted(fetchDoc);
</script>
