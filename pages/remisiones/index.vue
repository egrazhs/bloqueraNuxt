<template>
	<section>
		<h1 class="font-bold text-4xl">Remisiones</h1>
	
		<div class="mt-4">
			<ButtonsAddNew route="./remisiones/create" text="Remision" />
		</div>

		<hr class="border-1 border-slate-300 my-4">
		<section>
			<!-- Mensaje de éxito -->
			<div v-if="$route.query.c" class="transition-opacity bg-blue-200 text-blue-800 text-xs p-2 italic my-2">
				*Se ha agregadola remisión de manera exitosa.
			</div>

			<div v-if="$route.query.documentoActualizado" class="transition-opacity bg-yellow-200 text-yellow-800 text-xs p-2 italic my-2">
				*Se ha actualizado la información de la Remisión.
			</div>

			<div v-if="documento_eliminado" class="transition-opacity bg-red-200 text-red-800 text-xs p-2 italic my-2">
				*Se ha borrado la remisión de manera exitosa.
			</div>

			<!-- Mensaje de error -->
			<div v-if="error" class="transition-opacity bg-red-200 text-red-800 text-xs p-2 italic my-2">
				{{ error }}
			</div>
		</section>
	</section>

	<ScreensLoading v-if="loading"></ScreensLoading>

	<article v-else>
		<table class="w-full text-xs">
			<thead class="font-bold text-sm">
				<td class="pl-2">ID</td>
				<td>Cliente</td>
				<td>Fecha</td>
				<td>Obra</td>
				<td>Importe</td>
				<td>Acciones</td>
			</thead>
			<tbody class="border-1 border-black pl-2">
				<tr v-for="remision in remisiones" :key="remision.id" :data-key="remision.id" class="odd:bg-slate-200 even:bg-slate-50 hover:bg-slate-300">
					<td class="pl-2">{{  parseInt(remision.id, 10) }}</td>
					<td>{{ clientes.clientes.find(cliente => parseInt(cliente.id) == remision.cliente).nombre }}</td>
					<td>{{dar_formato_a_fecha(remision.fecha)}}</td>
					<td>{{remision.obra}}</td>
					<td class="text-right pr-2">{{ formatCurrency(calcular_importe_remision(remision)) }}</td>
					<td class="py-2 pr-2">
						<buttonsSeeMore :route="`./remisiones/read/${remision.id}`" />
						<ButtonsEdit :route="`./remisiones/edit/${remision.id}`" />
						<ButtonsDelete :item="remision" @confirm="confirmar_eliminacion" />
					</td>
				</tr>
			</tbody>
		</table>
	</article>

	<ModalsConfirmDelete 
      :show="dialog" 
      :item="documento_seleccionado" 
      confirmMessage="¿Estás seguro de que deseas eliminar esta Remisión?" 
      :deleteFunction="eliminar_documento_confirmado" 
      @cancel="cancelar_eliminacion" 
      @confirm="eliminar_documento_confirmado"
      data_name="" 
      :data_value="data_value"
    />	
</template>

<script setup>
	let { data: clientes} = await useFetch('/api/clientes');

	const remisiones = ref([]);
	const loading = ref(true);
	const dialog = ref(false);
	const documento_seleccionado = ref(null);
	const documento_eliminado = ref(false);
	const eliminando = ref(false);
	const error = ref('');
	let data_value = ref('');

	const fetchDataFromFirebase = async () => {
		const data = await fetchDataByCollection("remisiones");
		remisiones.value = data;
		loading.value = false;
	};

	onMounted(fetchDataFromFirebase);

	const confirmar_eliminacion = (doc) => {
		documento_seleccionado.value = doc;
		dialog.value = true;
	};

	const cancelar_eliminacion = () => {
		documento_seleccionado.value = null;
		dialog.value = false;
	};

	const eliminar_documento_confirmado = async () => {
		if (documento_seleccionado.value) {
			eliminando.value = true; // Comienza la eliminación
			error.value = ''; // Resetea el mensaje de error

			const doc_row = document.querySelector(`tr[data-key="${documento_seleccionado.value.id}"]`);
			doc_row.classList.add('fading-out');

			setTimeout(async () => {
				try {
					await deleteDataByDocId('remisiones', documento_seleccionado.value.id);
					remisiones.value = remisiones.value.filter(u => u.id !== documento_seleccionado.value.id);
					documento_seleccionado.value = null;
					dialog.value = false;
					documento_eliminado.value = true;
				} catch (err) {
					error.value = 'Error eliminando la remisión. Por favor, intenta de nuevo.';
				} finally {
				eliminando.value = false; // Termina la eliminación
			}
			setTimeout(() => {
				documento_eliminado.value = false;
			  }, 3000); // Ocultar el mensaje de éxito después de 3 segundos
			}, 500); // Duración de la animación
		}
	};

	function calcular_importe_remision(remision){
		let total = 0;

		if(remision.hasOwnProperty('material')){
			remision.material.forEach((material) => {
				total += (material.precio_unitario * material.cantidad);
			});
		}

		return total;
	}
</script>