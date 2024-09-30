<template>
	<ScreensLoading v-if="loading" />
	<main v-else>
		<v-table>
			<thead>
			</thead>
			<tbody>
				<tr v-for="(producto, index) in familia_tabicon_r40" :key="producto.id">
					<td v-if="index === 0" :rowspan="familia_tabicon_r40.length" class="font-bold">Solidos Tabicon R40</td>
					<td>{{producto.descripcion}}</td>
					<td>$3.70</td>
					<td>2,100</td>
					<td>3,000</td>
					<td>{{producto.piezas_por_tarima}}</td>
					<td>{{producto.rabon}}</td>
					<td>{{producto.torton}}</td>
					<td>{{producto.precio_rabon}}</td>
					<td>{{producto.precio_torton}}</td>
				</tr>
			</tbody>
		</v-table>
	</main>
</template>

<script setup>
	const loading = ref(true);
	const productos = ref([]);

	const familia_tabicon_r40 = ref([]);
	const familia_tabicon_r60 = ref([]);

	onMounted(async () => {
		const data = await fetchDataByCollection("productos");
		productos.value = data;

		familia_tabicon_r40.value = productos.value.filter( (producto) => producto.familia == "001");
		familia_tabicon_r60.value = productos.value.filter( (producto) => producto.familia == "002");

		loading.value = false;
	});
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
