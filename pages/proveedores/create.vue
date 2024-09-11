<template>
	<ScreensLoading v-if="loading"></ScreensLoading>
	<section v-else>
		<div class="flex align-center">
			<ButtonsReturnArrow class="mr-4" size="x-small" />
			<h1 class="font-bold text-4xl">Crear Proveedor</h1>
		</div>

		<v-divider :thickness="2" class="border-opacity-100 border-slate-400 my-4"></v-divider>

		<form @submit.prevent="handleSubmit">
			<div class="my-4">
				<label for="nombre" class="block font-semibold">Nombre:</label>
				<input v-model="nombre" type="text" id="nombre" class="input-field" required>
			</div>

			<div class="my-4">
				<label for="codigo" class="block font-semibold">Código:</label>
				<input v-model="codigo" type="text" id="codigo" class="input-field">
			</div>

			<div class="my-4">
				<label for="alias" class="block font-semibold">Alias:</label>
				<input v-model="alias" type="text" id="alias" class="input-field">
			</div>

			<div class="my-4">
				<label for="tipo_de_persona" class="block font-semibold">Tipo de Persona:</label>
				<v-select
					v-model="tipo_de_persona"
					:items="tipos_de_personas"
					item-text="nombre"
					item-value="id"
					label="Tipo de Persona"
					no-data-text="Tipo de persona inexistente"
					required>
				</v-select>
			</div>

			<div class="my-4">
				<label for="que_vende" class="block font-semibold">Vende:</label>
				<input v-model="que_vende" type="text" id="que_vende" class="input-field">
			</div>

			<div class="my-4">
				<label for="hace_factura" class="block font-semibold">Hace Factura:</label>
				<v-select
					v-model="hace_factura"
					:items="opciones_booleanas"
					item-title="descripcion"
					item-value="descripcion"
					label="Hace factura?"
					no-data-text=""
					required>
				</v-select>
			</div>
			
			<div class="my-4">
				<label for="forma_de_pago" class="block font-semibold">Forma de Pago:</label>
				<v-select
					v-model="forma_de_pago"
					:items="formas_de_pagos"
					item-text="nombre"
					item-value="id"
					label="Forma de Pago"
					no-data-text=""
					required>
				</v-select>
			</div>

			<div class="my-4">
				<label for="tiene_credito" class="block font-semibold">Tiene Crédito:</label>
				<v-select
					v-model="tiene_credito"
					:items="opciones_booleanas"
					item-title="descripcion"
					item-value="descripcion"
					label="Tiene Crédito?"
					no-data-text=""
					required>
				</v-select>
			</div>

			<div v-if="tiene_credito == 'SI'" class="my-4">
				<label for="monto_credito" class="block font-semibold">Monto de Crédito:</label>
				<input v-model="monto_credito" type="number" id="monto_credito" class="input-field">
			</div>

			<div class="my-4">
				<label for="contacto" class="block font-semibold">Contacto:</label>
				<input v-model="contacto" type="text" id="contacto" class="input-field">
			</div>

			<div class="my-4">
				<label for="telefono" class="block font-semibold">Teléfono:</label>
				<input v-model="telefono" type="text" id="telefono" class="input-field">
			</div>

			<div class="my-4">
				<label for="banco" class="block font-semibold">Banco:</label>
				<input v-model="banco" type="text" id="banco" class="input-field">
			</div>

			<div class="my-4">
				<label for="cuenta" class="block font-semibold">Cuenta:</label>
				<input v-model="cuenta" type="text" id="cuenta" class="input-field">
			</div>

			<div class="my-4">
				<label for="alerta" class="block font-semibold">Alerta:</label>
				<input v-model="alerta" type="text" id="alerta" class="input-field">
			</div>

			<div class="my-4">
				<label for="alerta" class="block font-semibold">Correo:</label>
				<input v-model="correo" type="text" id="correo" class="input-field">
			</div>
			
			<div class="my-4">
				<label for="domicilio" class="block font-semibold">Domicilio:</label>
				<input v-model="domicilio" type="text" id="domicilio" class="input-field">
			</div>
			
			
			
			<button type="submit" class="btn-primary">Guardar</button>
		</form>
	</section>
</template>

<script setup>

const router = useRouter();
const loading = ref(true);

const codigo = ref('');
const nombre = ref('');
const alias = ref('');
const tipo_de_persona = ref('FISICA');
const que_vende = ref('');
const hace_factura = ref('SI');
const forma_de_pago = ref('EFECTIVO');
const tiene_credito = ref('SI');
const monto_credito = ref(0);
const contacto = ref('');
const telefono = ref('');
const banco = ref('');
const cuenta = ref('');
const alerta = ref('');
const correo = ref('');
const domicilio = ref('');


const tipos_de_personas = ["FISICA", "MORAL"];
const opciones_booleanas = ["SI", "NO"];
const formas_de_pagos = ["EFECTIVO", "FISCAL", "TRANSFER NO FISCAL"];

const handleSubmit = async () => {
	try {
		const nuevo_id = await getNextId("proveedores", 3);

		// Crear un nuevo objeto con los datos del usuario
		const nuevoDoc = {
			codigo: codigo.value,
			nombre: nombre.value,
	  		alias: alias.value,
	  		tipo_de_persona: tipo_de_persona.value,
	  		que_vende: que_vende.value,
	  		hace_factura: hace_factura.value,
	  		forma_de_pago: forma_de_pago.value,
	  		tiene_credito: tiene_credito.value,
	  		monto_credito: monto_credito.value,
	  		contacto: contacto.value,
	  		telefono: telefono.value,
	  		banco: banco.value,
	  		cuenta: cuenta.value,
	  		alerta: alerta.value,
	  		correo: correo.value,
	  		domicilio: domicilio.value,
	  		id: nuevo_id,
	  		_type: 'proveedores'
		};

		

		// Agregar el nuevo usuario a Firestore utilizando el ID personalizado
		await agregarDocumento('proveedores', nuevoDoc, nuevo_id);

		// Mostrar un mensaje de éxito u otra acción deseada
		await router.push({ path: '/proveedores', query: { c: true } });

	} catch (error) {
		console.error('Error al agregar proveedor:', error.message);
	}
};


onMounted(()=>{
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