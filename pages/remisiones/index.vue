<template>
	<section>
		<h1 class="font-bold text-4xl">Remisiones</h1>
	
		<div class="mt-4">
			<ButtonsAddNew route="./remisiones/create" text="Remision" />
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
				<td>Cliente</td>
				<td>Fecha</td>
				<td>Obra</td>
				<td>Importe</td>
				<td>Acciones</td>
			</thead>
			<tbody class="border-1 border-black pl-2">
				<tr v-for="remision in remisiones" class="odd:bg-slate-200 even:bg-slate-50 hover:bg-slate-300">
					<td class="pl-2">{{remision.id}}</td>
					<td>{{remision.cliente}}</td>
					<td>{{dar_formato_a_fecha(remision.fecha)}}</td>
					<td>{{remision.obra}}</td>
					<td class="text-right pr-2">{{ formatCurrency(calcular_importe_remision(remision)) }}</td>
					<td class="py-2 pr-2">
						<NuxtLink :to="`./remisiones/read/${remision.id}`" class="p-2 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded-md">Ver Más</NuxtLink>
						<NuxtLink :to="`./remisiones/edit/${remision.id}`" class="p-2 ml-2 text-xs bg-orange-600 hover:bg-orange-700 text-white rounded-md text-slate-20">Editar</NuxtLink>
						<button class="p-2 ml-2 text-xs bg-red-600 hover:bg-red-700 text-white rounded-md">Eliminar</button>
					</td>
				</tr>
			</tbody>
		</table>
	</article>	
</template>

<script setup>
	const remisiones = ref([]);

	const fetchDataFromFirebase = async () => {
		const data = await fetchDataByCollection("remisiones");
		
		remisiones.value = data;
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

	// Llama a la función fetchDataFromFirebase cuando el componente se monte
	onMounted(fetchDataFromFirebase);
</script>