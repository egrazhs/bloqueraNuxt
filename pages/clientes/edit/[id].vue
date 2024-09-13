	<template>
		<v-container>
			<ScreensLoading v-if="loading"></ScreensLoading>
			<v-card v-else class="mx-auto mt-5" max-width="600">
				<v-card-title class="headline d-flex align-center">
					<v-btn icon @click="volver">
						<v-icon size="24">mdi-arrow-left</v-icon>
					</v-btn>
					<span class="ml-4">Editar Cliente</span>
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
						></v-text-field>

						<v-text-field
							type="text"
							v-model="documento.codigo"
							:rules="rules.required"
							label="Código"
						></v-text-field>

						<v-select
							v-model="documento.tipo_de_persona"
							:items="tipos_de_personas"
							item-title="descripcion"
							item-value="id"
							label="Forma de Pago"
							no-data-text="Forma de pago inexistente"
						></v-select>

						<v-select
							v-model="documento.revende"
							:items="opciones_booleanas"
							item-title="descripcion"
							item-value="id"
							label="¿Revende?"
						></v-select>

						<v-select
							v-model="documento.tiene_credito"
							:items="opciones_booleanas"
							item-title="descripcion"
							item-value="id"
							label="Tiene crédito?"
						></v-select>

						<v-text-field v-if="documento.tiene_credito == 'SI'"
							type="number"
							v-model="documento.monto_credito"
							label="Monto Credito:"
						></v-text-field>

						<v-text-field
							type="text"
							v-model="documento.contacto"
							label="Contacto"
						></v-text-field>

						<v-text-field
							type="text"
							v-model="documento.telefono"
							label="Teléfono"
						></v-text-field>

						<v-text-field
							type="text"
							v-model="documento.alerta"
							label="Alerta"
						></v-text-field>

						<v-text-field
							type="text"
							v-model="documento.correo"
							label="Correo"
						></v-text-field>

						<v-text-field
							type="text"
							v-model="documento.domicilio"
							label="Domicilio"
						></v-text-field>
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
			nombre: '',
			alias: '',
			tipo_de_persona: 'FISICA',
			revende: '',
			tiene_credito: 'SI',
			monto_credito: 0,
			contacto: '',
			telefono: '',
			alerta: '',
			correo: '',
			domicilio: ''
		});

		const tipos_de_personas = ["FISICA", "MORAL"];
		const opciones_booleanas = ["SI", "NO"];
		const formas_de_pagos = ["EFECTIVO", "FISCAL", "TRANSFER NO FISCAL"];

		const loading = ref(true);
		const valid = ref(false);
		const rules = {
			required: [value => !!value || 'Este campo es requerido']
		};

		const volver = () => {
			router.push('/clientes');
		};

		const fetchDoc = async () => {
			try {
				const { id } = route.params;
				const doc_a_editar = await getDoc(doc(db, 'clientes', id));
				if (doc_a_editar.exists()) {
					documento.value = doc_a_editar.data();
				} else {
					console.error('Cliente no encontrado');
				}
			} catch (error) {
				console.error('Error al obtener detalles del cliente:', error.message);
			} 
		};

		const guardar = async () => {
			try {
				const { id } = route.params;

				//Parsear a int piezas por tarima
				documento.value.monto_credito = parseInt(documento.value.monto_credito, 10);

				await updateDoc(doc(db, 'clientes', id), documento.value);
				router.push({ path: '/clientes', query: { documentoActualizado: true } });
			} catch (error) {
				console.error('Error al actualizar el Cliente:', error.message);
			}
		};

		onMounted(async ()=>{
			fetchDoc();
			loading.value = false;
		});
	</script>
