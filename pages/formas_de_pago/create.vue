<template>
	<ScreensLoading v-if="loading"></ScreensLoading>
	<section v-else>
		<div class="flex align-center">
			<ButtonsReturnArrow class="mr-4" size="x-small" />
			<h1 class="font-bold text-4xl">Crear Forma de pago</h1>
		</div>

		<v-divider :thickness="2" class="border-opacity-100 border-slate-400 my-4"></v-divider>

		<form @submit.prevent="handleSubmit">
			<div class="my-4">
				<label for="nombre" class="block font-semibold">Descripción:</label>
				<input v-model="descripcion" type="text" id="descripcion" class="input-field" required>
			</div>

			<div class="my-4">
				<label for="codigo" class="block font-semibold">Código:</label>
				<input v-model="codigo" type="text" id="codigo" class="input-field">
			</div>

			<div class="my-4">
				<label for="tipo_de_persona" class="block font-semibold">Condición:</label>
				<v-select
					v-model="condicion"
					:items="tipos_de_condicion"
					item-text="nombre"
					item-value="id"
					label="Condición">
				</v-select>
			</div>

			<div class="my-4">
				<label for="revende" class="block font-semibold">Status:</label>
				<v-select
					v-model="status"
					:items="tipos_de_status"
					item-title="descripcion"
					item-value="descripcion"
					label="Status"
					>
				</v-select>
			</div>

			<button type="submit" class="btn-primary">Guardar</button>
		</form>
	</section>
</template>

<script setup>
	const router = useRouter();
	const loading = ref(true);

	const codigo = ref('');
	const descripcion = ref('');
	const condicion = ref('PAGO ANTICIPADO');
	const status = ref('NO PAGADO');

	const tipos_de_status = ["PAGADO", "NO PAGADO"];
	const tipos_de_condicion = ["PAGO ANTICIPADO", "CONTADO", "CREDITO"];

	const handleSubmit = async () => {
		try {
			const nuevo_id = await getNextId("formas_de_pagos", 3);

			// Crear un nuevo objeto con los datos del usuario
			const nuevoDoc = {
				codigo: codigo.value,
				descripcion: descripcion.value,
				condicion: condicion.value,
				status: status.value,
		  		id: nuevo_id,
		  		_type: 'formas_de_pagos'
			};

			// Agregar el nuevo usuario a Firestore utilizando el ID personalizado
			await agregarDocumento('formas_de_pagos', nuevoDoc, nuevo_id);

			// Mostrar un mensaje de éxito u otra acción deseada
			await router.push({ path: '/formas_de_pago', query: { c: true } });

		} catch (error) {
			console.error('Error al agregar la forma de pago:', error.message);
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