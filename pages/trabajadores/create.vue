<template>
	<ScreensLoading v-if="loading"></ScreensLoading>
	
	<section v-else>
		<div class="flex align-center">
			<ButtonsReturnArrow class="mr-4" size="x-small" />
			<h1 class="font-bold text-4xl">Agregar Trabajador Nuevo</h1>
		</div>

		<v-divider :thickness="2" class="border-opacity-100 border-slate-400 my-4"></v-divider>

		<form @submit.prevent="handleSubmit">
			<div class="my-4">
				<label for="nombre" class="block font-semibold">Nombre:</label>
				<input v-model="documento.nombre" type="text" id="nombre" class="input-field" required>
			</div>

			<div class="my-4">
				<label for="codigo" class="block font-semibold">Código:</label>
				<input v-model="documento.codigo" type="text" id="descripcion" class="input-field" required>
			</div>

			<div class="my-4">
				<label for="alias" class="block font-semibold">Alias:</label>
				<input v-model="documento.alias" type="text" id="alias" class="input-field" required>
			</div>


			<div class="my-4">
				<label for="sexo" class="block font-semibold">Sexo:</label>
				<v-select
					v-model="documento.sexo"
					:items="sexos"
					item-title="descripcion"
					item-value="id"
					no-data-text="Sexo inexistente"
					required>
				</v-select>
			</div>

			<div class="my-4">
				<label for="puesto" class="block font-semibold">Puesto:</label>
				<input v-model="documento.puesto" type="text" id="puesto" class="input-field" required>
			</div>

			<div class="my-4">
				<label for="lugar" class="block font-semibold">Lugar:</label>
				<input v-model="documento.lugar" type="text" id="lugar" class="input-field" required>
			</div>

			<div class="my-4">
				<label for="tipo_de_salario" class="block font-semibold">Tipo de salario:</label>
				<v-select
					v-model="documento.tipo_de_salario"
					:items="tipos_de_salarios"
					item-title="descripcion"
					item-value="id"
					no-data-text="Tipos de salarios inexistentes"
					required>
				</v-select>
			</div>

			<div v-if="documento.tipo_de_salario == 'FIJO'" class="my-4">
				<label for="importe_de_salario" class="block font-semibold">Importe de salario:</label>
				<input v-model="documento.importe_de_salario" type="number" id="importe_de_salario" class="input-field">
			</div>

			<div class="my-4">
				<label for="periodo_de_pago" class="block font-semibold">Periodo de Pago:</label>
				<v-select
					v-model="documento.periodo_de_pago"
					:items="periodos_de_pagos"
					item-title="descripcion"
					item-value="id"
					no-data-text="Periodos de pago inexistentes"
					required>
				</v-select>
			</div>

			<div class="my-4">
				<label for="forma_de_pago" class="block font-semibold">Forma de Pago:</label>
				<v-select
					v-model="documento.forma_de_pago"
					:items="formas_de_pago"
					item-title="descripcion"
					item-value="id"
					no-data-text="Formas de pago inexistentes"
					required>
				</v-select>
			</div>


			<div class="my-4">
				<label for="banco" class="block font-semibold">Banco:</label>
				<input v-model="documento.banco" type="text" id="banco" class="input-field">
			</div>

			<div class="my-4">
				<label for="cuenta" class="block font-semibold">Cuenta:</label>
				<input v-model="documento.cuenta" type="text" id="cuenta" class="input-field">
			</div>

			<div class="my-4">
				<label for="fecha_de_ingreso" class="block font-semibold">Fecha de ingreso:</label>
				<input v-model="documento.fecha_de_ingreso" type="date" id="fecha_de_ingreso" class="input-field">
			</div>

			<div class="my-4">
				<label for="planta" class="block font-semibold">Planta:</label>
				<v-select
					v-model="documento.planta"
					:items="plantas"
					item-title="descripcion"
					item-value="id"
					no-data-text="Formas de pago inexistentes"
					required>
				</v-select>
			</div>

			<div class="my-4">
				<label for="IMSS" class="block font-semibold">#IMSS:</label>
				<input v-model="documento.imss" type="text" id="IMSS" class="input-field">
			</div>

			<div class="my-4">
				<label for="infonavit" class="block font-semibold">Credito Infonavit:</label>
				<input v-model="documento.infonavit" type="text" id="infonavit" class="input-field">
			</div>

			<div class="my-4">
				<label for="salario_diario_intengrado" class="block font-semibold">Salario Diario Integrado:</label>
				<input v-model="documento.salario_diario_integrado" type="number" id="salario_diario_intengrado" class="input-field">
			</div>

			<div class="my-4">
				<label for="telefono" class="block font-semibold">Telefono:</label>
				<input v-model="documento.telefono" type="text" id="telefono" class="input-field">
			</div>

			<div class="my-4">
				<label for="domicilio" class="block font-semibold">Domicilio:</label>
				<input v-model="documento.domicilio" type="text" id="domicilio" class="input-field">
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

	const handleSubmit = async () => {
		try {
			const nuevo_id = await getNextId("trabajadores", 3);

			//Agregar las propiedades faltantes al documento a agregar
			documento.value.id = nuevo_id;
			documento.value._type = 'trabajadores';

			// Agregar el nuevo usuario a Firestore utilizando el ID personalizado
			await agregarDocumento('trabajadores', documento.value, nuevo_id);

			// Mostrar un mensaje de éxito u otra acción deseada
			await router.push({ path: '/trabajadores/', query: { c: true } });

		} catch (error) {
			console.error('Error al agregar Trabajador:', error.message);
		}
	};


	onMounted(async ()=>{
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