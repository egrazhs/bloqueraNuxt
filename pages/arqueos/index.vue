<template>
	<section>
		<h1 class="font-bold text-4xl">Arqueos</h1>
	
		<div class="mt-4">
			<ButtonsAddNew route="./arqueos/create" text="Arqueo" />
		</div>

		<hr class="border-1 border-slate-300 my-4">

		<section>
			<!-- Mensaje de éxito -->
			<div v-if="$route.query.c" class="transition-opacity bg-blue-200 text-blue-800 text-xs p-2 italic my-2">
				*Se ha agregado el arqueo de manera exitosa.
			</div>

			<div v-if="$route.query.documentoActualizado" class="transition-opacity bg-yellow-200 text-yellow-800 text-xs p-2 italic my-2">
				*Se ha actualizado la información del arqueo.
			</div>

			<div v-if="documento_eliminado" class="transition-opacity bg-red-200 text-red-800 text-xs p-2 italic my-2">
				*Se ha borrado el usuario de manera exitosa.
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
				<td>Fecha</td>
				<td>Hora</td>
				<td>Total (MXN)</td>
				<td>Acciones</td>
			</thead>
			<tbody class="border-1 border-black pl-2">
				<tr v-for="arqueo in arqueos" :key="arqueo.id" :data-key="arqueo.id" class="odd:bg-slate-200 even:bg-slate-50 hover:bg-slate-300">
					<td class="pl-2">{{ parseInt(arqueo.id, 10) }}</td>
					<td>{{arqueo.fecha.split('T')[0]}}</td>
					<td>{{arqueo.fecha.split('T')[1]}}</td>
					<td>{{calcular_total_arqueo(arqueo)}}</td>
					<td class="py-2 pr-2">
						<buttonsSeeMore :route="`./arqueos/read/${arqueo.id}`" />
						<ButtonsEdit :route="`./arqueos/edit/${arqueo.id}`" />
						<ButtonsDelete :item="arqueo" @confirm="confirmar_eliminacion" />
					</td>
				</tr>
			</tbody>
		</table>
	</article>

	<ModalsConfirmDelete 
      :show="dialog" 
      :item="documento_seleccionado" 
      confirmMessage="¿Estás seguro de que deseas eliminar este Arqueo?" 
      :deleteFunction="eliminar_documento_confirmado" 
      @cancel="cancelar_eliminacion" 
      @confirm="eliminar_documento_confirmado"
      data_name="" 
      :data_value="data_value"
    />
</template>

<script setup>
	const arqueos = ref([]);
	const loading = ref(true);
	const dialog = ref(false);
	const documento_seleccionado = ref(null);
	const documento_eliminado = ref(false);
	const eliminando = ref(false);
	const error = ref('');
	let data_value = ref('');

	const fetchDataFromFirebase = async () => {
		const data = await fetchDataByCollection("arqueos");
		arqueos.value = data;
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
					await deleteDataByDocId('arqueos', documento_seleccionado.value.id);
					arqueos.value = arqueos.value.filter(u => u.id !== documento_seleccionado.value.id);
					documento_seleccionado.value = null;
					dialog.value = false;
					documento_eliminado.value = true;
				} catch (err) {
					error.value = 'Error eliminando el usuario. Por favor, intenta de nuevo.';
				} finally {
				eliminando.value = false; // Termina la eliminación
			}
			setTimeout(() => {
				documento_eliminado.value = false;
			  }, 3000); // Ocultar el mensaje de éxito después de 3 segundos
			}, 500); // Duración de la animación
		}
	};

	function calcular_total_arqueo(arqueo){
		let cantidad_total = 0;

   		cantidad_total += arqueo.billetes_1000 * 1000;
    	cantidad_total += arqueo.billetes_500 * 500;
    	cantidad_total += arqueo.billetes_200 * 200;
    	cantidad_total += arqueo.billetes_100 * 100;
    	cantidad_total += arqueo.billetes_50 * 50;
    	cantidad_total += arqueo.billetes_20 * 20;

    	cantidad_total += arqueo.monedas_20 * 20;
    	cantidad_total += arqueo.monedas_10 * 10;
    	cantidad_total += arqueo.monedas_5 * 5;
    	cantidad_total += arqueo.monedas_2 * 2;
    	cantidad_total += arqueo.monedas_1 * 1;
    	return cantidad_total;
	}
</script>


<style scoped>
	@keyframes fadeOut {
		from { opacity: 1; }
		to { opacity: 0; }
	}

	.fading-out {
		animation: fadeOut 0.5s forwards;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	th, td {
		border: 1px solid #ddd;
		padding: 8px;
	}

	th {
		background-color: #f2f2f2;
	}
</style>