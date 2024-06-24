<template>
	<section>
		<h1 class="font-bold text-4xl">Vehiculos</h1>
	
		<div class="mt-4">
			<ButtonsAddNew route="./vehiculos/create" text="Vehiculo" />
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
				<td>Modelo</td>
				<td>Año</td>
				<td>Matrícula</td>
				<td>Alias</td>
				<td>Acciones</td>
			</thead>
			<tbody class="border-1 border-black pl-2">
				<tr v-for="vehiculo in vehiculos" class="odd:bg-slate-200 even:bg-slate-50 hover:bg-slate-300">
					<td class="pl-2">{{vehiculo.id}}</td>
					<td>{{vehiculo.modelo}}</td>
					<td>{{vehiculo.year}}</td>
					<td>{{vehiculo.matricula}}</td>
					<td>{{vehiculo.alias}}</td>
					<td class="py-2 pr-2">
						<NuxtLink :to="`./vehiculos/read/${vehiculo.id}`" class="p-2 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded-md">Ver Más</NuxtLink>
						<NuxtLink :to="`./vehiculos/edit/${vehiculo.id}`" class="p-2 ml-2 text-xs bg-orange-600 hover:bg-orange-700 text-white rounded-md text-slate-20">Editar</NuxtLink>
						<button class="p-2 ml-2 text-xs bg-red-600 hover:bg-red-700 text-white rounded-md">Eliminar</button>
					</td>
				</tr>
			</tbody>
		</table>
	</article>	
</template>

<script setup>
	const vehiculos = ref([]);

	const fetchDataFromFirebase = async () => {
		const data = await fetchDataByCollection("vehiculos");
		vehiculos.value = data;
	};

	// Llama a la función fetchDataFromFirebase cuando el componente se monte
	onMounted(fetchDataFromFirebase);
</script>