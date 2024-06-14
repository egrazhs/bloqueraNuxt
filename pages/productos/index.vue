<template>
	<section>
		<h1 class="font-bold text-4xl">Productos</h1>
	
		<div class="mt-4">
			<NuxtLink to="./productos/create" class="py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs">Agregar nuevo Usuario</NuxtLink>
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
				<td>Producto: </td>
				<td>Acciones</td>
			</thead>
			<tbody class="border-1 border-black pl-2">
				<tr v-for="producto in productos" class="odd:bg-slate-200 even:bg-slate-50 hover:bg-slate-300">
					<td class="pl-2">{{producto.id}}</td>
					<td>{{producto.nombre}}</td>
					<td class="py-2 pr-2">
						<NuxtLink :to="`./productos/read/${producto.id}`" class="p-2 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded-md">Ver Más</NuxtLink>
						<NuxtLink :to="`./productos/edit/${producto.id}`" class="p-2 ml-2 text-xs bg-orange-600 hover:bg-orange-700 text-white rounded-md text-slate-20">Editar</NuxtLink>
						<button class="p-2 ml-2 text-xs bg-red-600 hover:bg-red-700 text-white rounded-md">Eliminar</button>
					</td>
				</tr>
			</tbody>
		</table>
	</article>	
</template>

<script setup>
	const productos = ref([]);

	const fetchDataFromFirebase = async () => {
		const data = await fetchDataByCollection("productos");
		productos.value = data;
	};

	// Llama a la función fetchDataFromFirebase cuando el componente se monte
	onMounted(fetchDataFromFirebase);
</script>