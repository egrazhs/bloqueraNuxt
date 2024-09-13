<template>
	<v-container>
		<ScreensLoading v-if="loading"></ScreensLoading>
		<v-card v-else class="mx-auto mt-5" max-width="600">
			<v-card-title class="headline d-flex align-center">
				<v-btn icon @click="volver">
					<v-icon size="24">mdi-arrow-left</v-icon>
				</v-btn>
				<span class="ml-4">Editar Forma de Pago</span>
			</v-card-title>

			<v-divider></v-divider>
			
			<v-card-text>
				<v-form ref="form" v-model="valid" lazy-validation>
					<v-text-field
						type="text"
						v-model="documento.descripcion"
						:rules="rules.required"
						label="Nombre"
					></v-text-field>

					<v-text-field
						type="text"
						v-model="documento.codigo"
						:rules="rules.required"
						label="Código"
					></v-text-field>

					<v-select
						v-model="documento.condicion"
						:items="tipos_de_condicion"
						item-title="descripcion"
						item-value="id"
						label="Forma de Pago"
						no-data-text="Forma de pago inexistente"
					></v-select>

					<v-select
						v-model="documento.status"
						:items="tipos_de_status"
						item-title="descripcion"
						item-value="id"
						label="¿Revende?"
					></v-select>
				</v-form>
			</v-card-text>

			<v-divider></v-divider>
			
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="blue darken-1" @click="guardar" :disabled="!valid">Guardar</v-btn>
			</v-card-actions>
		</v-card>

	</v-container>
</template>

<script setup>
	import { db } from '~/utils/firebase';
	import { getDoc, updateDoc, doc, getFirestore } from 'firebase/firestore';

	const route = useRoute();
	const router = useRouter();

	const documento = ref({
		codigo: '',
		descripcion: '',
		condicion: 'PAGO ANTICIPADO',
		status: 'NO PAGADO'
	});

	const tipos_de_status = ["PAGADO", "NO PAGADO"];
	const tipos_de_condicion = ["PAGO ANTICIPADO", "CONTADO", "CREDITO"];

	const loading = ref(true);
	const valid = ref(false);
	const rules = {
		required: [value => !!value || 'Este campo es requerido']
	};

	const volver = () => {
		router.push('/formas_de_pago');
	};

	const fetchDoc = async () => {
		try {
			const { id } = route.params;
			const doc_a_editar = await getDoc(doc(db, 'formas_de_pagos', id));
			if (doc_a_editar.exists()) {
				documento.value = doc_a_editar.data();
			} else {
				console.error('Forma de pago no encontrado');
			}
		} catch (error) {
			console.error('Error al obtener detalles de la forma de Pago:', error.message);
		} 
	};

	const guardar = async () => {
		try {
			const { id } = route.params;

			await updateDoc(doc(db, 'formas_de_pagos', id), documento.value);
			router.push({ path: '/formas_de_pago', query: { documentoActualizado: true } });
		} catch (error) {
			console.error('Error al actualizar la forma de pago:', error.message);
		}
	};

	onMounted(async ()=>{
		fetchDoc();
		loading.value = false;
	});
</script>
