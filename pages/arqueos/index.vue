<template>
	<section>
		<h1 class="font-bold text-4xl">Arqueos</h1>
	
		<div class="mt-4">
			<NuxtLink to="./arqueos/create" class="py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs">Agregar nuevo Usuario</NuxtLink>
		</div>

		<hr class="border-1 border-slate-300 my-4">

		<section>
			<div class="hidden transition-opacity bg-blue-200 text-blue-800 text-xs p-2 italic my-2">*Se ha agregado el usuario de manera exitosa.</div>
			<div class="hidden transition-opacity bg-yellow-200 text-yellow-800 text-xs p-2 italic my-2">*Se ha actualizado la información del usuario.</div>
			<div class="hidden transition-opacity bg-red-200 text-red-800 text-xs p-2 italic my-2">*Se ha borrado el usuario de manera exitosa.</div>
			<div class="hidden transition-opacity bg-yellow-200 text-yellow-800 text-xs p-2 italic my-2">*Se ha actualizado la contraseña del usuario.</div>
		</section>
	</section>

	<article>
		<table class="w-full text-xs">
			<thead class="font-bold text-sm">
				<td class="pl-2">ID</td>
				<td>Fecha</td>
				<td>Hora</td>
				<td>Total (MXN)</td>
				<td>Acciones</td>
			</thead>
			<tbody class="border-1 border-black pl-2">
				<tr v-for="arqueo in arqueos" class="odd:bg-slate-200 even:bg-slate-50 hover:bg-slate-300">
					<td class="pl-2">{{arqueo.id}}</td>
					<td>{{arqueo.fecha}}</td>
					<td>{{arqueo.hora}}</td>
					<td>{{calcular_total_arqueo(arqueo)}}</td>
					<td class="py-2 pr-2">
						<NuxtLink :to="`./arqueos/read/${arqueo.id}`" class="p-2 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded-md">Ver Más</NuxtLink>
						<NuxtLink :to="`./arqueos/edit/${arqueo.id}`" class="p-2 ml-2 text-xs bg-orange-600 hover:bg-orange-700 text-white rounded-md text-slate-20">Editar</NuxtLink>
						<button class="p-2 ml-2 text-xs bg-red-600 hover:bg-red-700 text-white rounded-md">Eliminar</button>
					</td>
				</tr>
			</tbody>
		</table>
	</article>	
</template>

<script setup>
	const arqueos = ref([]);

	const fetchDataFromFirebase = async () => {
		const data = await fetchDataByCollection("arqueos");
		arqueos.value = data;
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

	// Llama a la función fetchDataFromFirebase cuando el componente se monte
	onMounted(fetchDataFromFirebase);
</script>