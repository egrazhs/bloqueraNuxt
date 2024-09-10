<template>
	<v-container>
		<ScreensLoading v-if="loading"></ScreensLoading>

		<v-card v-else class="mx-auto mt-5" max-width="600">
			<v-card-title class="headline d-flex align-center">
				<v-btn icon @click="volver">
					<v-icon size="24">mdi-arrow-left</v-icon>
				</v-btn>
				<span class="ml-4">Editar Trabajador</span>
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
						v-model="documento.codigo"
						:rules="rules.required"
						label="Código"
					></v-text-field>

					<v-text-field
						type="text"
						v-model="documento.alias"
						label="Alias"
					></v-text-field>

					<v-select
						v-model="documento.sexo"
						:items="sexos"
						item-title="descripcion"
						item-value="id"
						label="Sexo"
						no-data-text="Sexo inexistente"
						required>
					</v-select>

					<v-text-field
						type="text"
						v-model="documento.puesto"
						label="Puesto"
					></v-text-field>

					<v-text-field
						type="text"
						v-model="documento.lugar"
						label="Lugar"
					></v-text-field>

					<v-select
						v-model="documento.tipo_de_salario"
						:items="tipos_de_salarios"
						item-title="descripcion"
						item-value="id"
						label="Tipo de Salario"
						no-data-text="Tipo de Salario inexistente"
					></v-select>

					<v-text-field
						type="number"
						v-model="documento.importe_de_salario"
						label="Importe de Salario"
					></v-text-field>

					<v-select
						v-model="documento.periodo_de_pago"
						:items="periodos_de_pagos"
						item-title="descripcion"
						item-value="id"
						label="Periodo de Pago"
						no-data-text="Periodo de pago inexistente"
					></v-select>

					<v-select
						v-model="documento.forma_de_pago"
						:items="formas_de_pago"
						item-title="descripcion"
						item-value="id"
						label="Forma de Pago"
						no-data-text="Forma de pago inexistente"
					></v-select>

					<v-text-field
						type="text"
						v-model="documento.banco"
						label="Banco"
					></v-text-field>

					<v-text-field
						type="text"
						v-model="documento.cuenta"
						label="Cuenta"
					></v-text-field>

					<v-text-field
						type="date"
						v-model="documento.fecha_de_ingreso"
						label="Fecha de Ingreso"
					></v-text-field>

					<v-text-field
						type="text"
						v-model="documento.planta"
						label="Planta"
					></v-text-field>

					<v-text-field
						type="text"
						v-model="documento.imss"
						label="#IMSS"
					></v-text-field>

					<v-text-field
						type="text"
						v-model="documento.credito_infonavit"
						label="Credito Infonavit"
					></v-text-field>

					<v-text-field
						type="number"
						v-model="documento.salario_diario_integrado"
						label="Salario Diario Integrado"
					></v-text-field>

					<v-text-field
						type="text"
						v-model="documento.telefono"
						label="Telefono"
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

	const documento = ref({
		codigo: '',
		nombre: '',
		alias: '',
		sexo: 'M',
		puesto: '',
		lugar: '',
		tipo_de_salario: 'FIJO',
		importe_de_salario: 0,
		periodo_de_pago: 'SEMANAL',
		forma_de_pago: 'EFECTIVO',
		banco: '',
		cuenta: '',
		fecha_de_ingreso: new Date('2000-01-01').toISOString().split('T')[0],
		planta: 'SL',
		imss: '',
		credito_infonavit: '',
		salario_diario_integrado: 0,
		telefono: '',
		domicilio: ''
	});

	const sexos = [{id:"M", descripcion: "MASCULINO"}, { id: "F", descripcion: "FEMENINO"}];
	const tipos_de_salarios = ["FIJO", "DESTAJO"];
	const periodos_de_pagos = ["SEMANAL", "QUINCENAL"];
	const formas_de_pago = ["DEPOSITO", "EFECTIVO"];
	const plantas = [{id:"SL", descripcion: "SL - SANTA LUCIA"}, {id:"SS", descripcion: "SS - SAN SEBASTIAN EL GRANDE"}];

	const loading = ref(true);
	const valid = ref(false);
	const rules = {
		required: [value => !!value || 'Este campo es requerido']
	};

	const volver = () => {
		router.push('/trabajadores');
	};

	const fetchDoc = async () => {
		try {
			const { id } = route.params;
			const doc_a_editar = await getDoc(doc(db, 'trabajadores', id));
			if (doc_a_editar.exists()) {
				documento.value = doc_a_editar.data();
			} else {
				console.error('Trabajador no encontrado');
			}
		} catch (error) {
			console.error('Error al obtener detalles del Trabajador:', error.message);
		}
	};

	const guardar = async () => {
		try {
			const { id } = route.params;

			//Parsear a int piezas por tarima
			documento.value.importe_de_salario = parseInt(documento.value.importe_de_salario, 10);
			documento.value.salario_diario_integrado = parseInt(documento.value.salario_diario_integrado, 10);
			
			await updateDoc(doc(db, 'trabajadores', id), documento.value);
			router.push({ path: '/trabajadores', query: { documentoActualizado: true } });
		} catch (error) {
			console.error('Error al actualizar el trabajador:', error.message);
		}
	};

	onMounted(async ()=>{
		fetchDoc();
		loading.value = false;
	});
</script>
