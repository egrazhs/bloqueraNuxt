<template>
	<DocumentIndexPage
		documentTitle="Proveedores"
		singularDocumentTitle="Proveedor"
		baseRoute="/proveedores"
		collectionName="proveedores"
		:documentFields="documentFields"
	/>

	<v-container>
		<section>
			<h1 class="font-bold text-4xl">Proveedores</h1>
		
			<div class="mt-4">
				<ButtonsAddNew route="./proveedores/create" text="Proveedor" />
			</div>

			<hr class="border-1 border-slate-300 my-4">

			<section>
				<!-- Mensaje de éxito -->
				<div v-if="$route.query.c" class="transition-opacity bg-blue-200 text-blue-800 text-xs p-2 italic my-2">
					*Se ha agregado el Proveedor de manera exitosa.
				</div>

				<div v-if="$route.query.documentoActualizado" class="transition-opacity bg-yellow-200 text-yellow-800 text-xs p-2 italic my-2">
					*Se ha actualizado la información del Proveedor.
				</div>

				<div v-if="documento_eliminado" class="transition-opacity bg-red-200 text-red-800 text-xs p-2 italic my-2">
					*Se ha borrado el Proveedor de manera exitosa.
				</div>

				<!-- Mensaje de error -->
				<div v-if="error" class="transition-opacity bg-red-200 text-red-800 text-xs p-2 italic my-2">
					{{ error }}
				</div>
			</section>
		</section>

		<ScreensLoading v-if="loading"></ScreensLoading>

		<article v-else>
			<!-- Botón de menú para las opciones de visibilidad -->
			<v-menu transition="scale-transition">
				<template v-slot:activator="{ props }">
		        	<v-btn icon v-bind="props" class="mb-4">
		          		<v-icon>mdi-cog</v-icon>
		        	</v-btn>
      			</template>
				<!-- Contenido del menú: opciones de propiedades a mostrar -->
				<v-list density="compact">
					<v-list-item density="compact">
						<v-checkbox v-model="selectedColumns.codigo" label="Código" density="compact"></v-checkbox>
					</v-list-item>
					<v-list-item density="compact">
						<v-checkbox v-model="selectedColumns.nombre" label="Nombre" density="compact"></v-checkbox>
					</v-list-item>
					<v-list-item density="compact">
						<v-checkbox v-model="selectedColumns.alias" label="Alias" density="compact"></v-checkbox>
					</v-list-item>
				</v-list>
			</v-menu>

			<table class="w-full text-xs table-auto">
				<thead class="font-bold text-sm">
					<tr>
						<th v-if="selectedColumns.id" @click="sortBy('id')" class="pl-2 cursor-pointer whitespace-nowrap">
							<span>ID</span>
							<v-icon small class="ml-1">mdi-swap-vertical</v-icon>
						</th>
						<th v-if="selectedColumns.codigo" @click="sortBy('codigo')" class="pl-2 cursor-pointer whitespace-nowrap">
							<span>Código</span>
							<v-icon small class="ml-1">mdi-swap-vertical</v-icon>
						</th>
						<th v-if="selectedColumns.nombre" @click="sortBy('nombre')" class="pl-2 cursor-pointer whitespace-nowrap">
							<span>Nombre</span>
							<v-icon small class="ml-1">mdi-swap-vertical</v-icon>
						</th>
						<th v-if="selectedColumns.alias" @click="sortBy('alias')" class="pl-2 cursor-pointer whitespace-nowrap">
							<span>Alias</span>
							<v-icon small class="ml-1">mdi-swap-vertical</v-icon>
						</th>
						<th class="whitespace-nowrap">Acciones</th>
					</tr>
				</thead>
				<tbody class="border-1 border-black pl-2">
					<tr v-for="proveedor in sortedProveedores" :key="proveedor.id" data-key="proveedor.id" class="odd:bg-slate-200 even:bg-slate-50 hover:bg-slate-300">
						<td v-if="selectedColumns.id" class="pl-2 truncate">{{ proveedor.id }}</td>
						<td v-if="selectedColumns.codigo" class="truncate">{{ proveedor.codigo }}</td>
						<td v-if="selectedColumns.nombre" class="truncate">{{ proveedor.nombre }}</td>
						<td v-if="selectedColumns.alias" class="truncate">{{ proveedor.alias }}</td>
						<td class="py-2 pr-2 flex space-x-2">
							<ButtonsSeeMore :route="'./proveedores/read/' + proveedor.id" />
							<ButtonsEdit :route="'./proveedores/edit/' + proveedor.id" />
							<ButtonsDelete :item="proveedor" @confirm="confirmar_eliminacion" />
						</td>
					</tr>
				</tbody>
			</table>
		</article>
    </v-container>
</template>

<script setup>
	const loading = ref(true);
	
	const proveedores = ref([]);

	const documentFields = ref({
	 	codigo: 'Código',
	 	nombre: 'Nombre',
	 	telefono: 'Teléfono',
	 	email: 'Correo'
	});

	const selectedColumns = ref({
		id: true,
		codigo: true,
		nombre: true,
		alias: true
	});

	// Estado para el orden de columnas
	const sortKey = ref(null);
	const sortOrder = ref(1);

	// Función para ordenar la tabla
	const sortBy = (key) => {
	  if (sortKey.value === key) {
	    sortOrder.value = sortOrder.value * -1;
	  } else {
	    sortKey.value = key;
	    sortOrder.value = 1;
	  }
	};

	const sortedProveedores = computed(() => {
		return [...proveedores.value].sort((a, b) => {
			if (!sortKey.value) return 0;
			const compareA = a[sortKey.value];
			const compareB = b[sortKey.value];

			if (compareA < compareB) return -1 * sortOrder.value;
			if (compareA > compareB) return 1 * sortOrder.value;
			return 0;
		});
	});

	const fetchDataFromFirebase = async () => {
		const data = await fetchDataByCollection("proveedores");
		proveedores.value = data;
		loading.value = false;
	};

	onMounted(fetchDataFromFirebase);
</script>

<style scoped>
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