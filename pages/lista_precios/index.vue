<template>
	<ScreensLoading v-if="loading" />
	<main v-else>
		<v-table fixed-header height="100%" density="compact">
			<thead class="text-xs">
			    <tr>
					<th rowspan="2" colspan="2" class="border px-2 py-1 bg-yellow text-center text-lg">Lista de Precios 2024<br> BLOQUERA GUADALAJARA</th>
					<th rowspan="3" class="border px-2 py-1 bg-yellow text-center">PRECIO <br> RECOGIDO <br> EN PLANTA</th>
					<th class="border px-2 py-1 bg-blue text-center">$1,800</th>
					<th class="border px-2 py-1 bg-blue text-center">$2,500</th>
					<th rowspan="3" class="border px-2 py-1 bg-yellow text-center">Piezas<br>por<br>Tarima</th>
					<th rowspan="2" colspan="2" class="border px-2 py-1 bg-yellow text-center">Tarimas por Flete Local</th>
					<th rowspan="2" colspan="2" class="border px-2 py-1 bg-yellow text-center">Precios Puesto en Obra</th>
			    </tr>
			    <tr>
			     	<th colspan="2" class="border px-2 py-1 bg-yellow text-center">Piezas por camion Local</th>
			    </tr>
			    <tr>
			    	<th class="border px-2 py-1 bg-blue text-center text-lg">Familia</th>
			   		<th class="border px-2 py-1 bg-blue text-center text-lg">Producto</th>
			   		<th class="border px-2 py-1 bg-blue text-center text-lg">Rabón</th>
			      	<th class="border px-2 py-1 bg-blue text-center text-lg">Torton</th>
			      	<th class="border px-2 py-1 bg-blue text-center text-lg">Rabón</th>
			      	<th class="border px-2 py-1 bg-blue text-center text-lg">Torton</th>
			      	<th class="border px-2 py-1 bg-blue text-center text-lg">Rabón</th>
			      	<th class="border px-2 py-1 bg-blue text-center text-lg">Torton</th>
			    </tr>
		  	</thead>

			<tbody class="text-xs">
				<tr v-for="(producto, index) in familia_tabicon_r40" :key="producto.id">
					<td v-if="index === 0" :rowspan="familia_tabicon_r40.length" class="font-bold">Solidos Tabicon R40</td>
					<td>{{producto.descripcion}}</td>
					<td class="bg-yellow-200 text-right">${{producto.precio_recogido_en_planta}}</td>
					<td class="text-right">{{producto.piezas_por_tarima * producto.tarimas_por_flete_local_rabon}}</td>
					<td class="text-right">{{producto.piezas_por_tarima * producto.tarimas_por_flete_local_torton}}</td>
					<td class="text-center">{{producto.piezas_por_tarima}}</td>
					<td class="text-center">{{producto.tarimas_por_flete_local_rabon}}</td>
					<td class="text-center">{{producto.tarimas_por_flete_local_torton}}</td>
					<td class="bg-yellow-200 text-right">${{producto.precio_puesto_en_obra_rabon}}</td>
					<td class="bg-yellow-200 text-right">${{producto.precio_puesto_en_obra_torton}}</td>
				</tr>

				<tr>
					<td colspan="10" class="border-x-white-100"></td>
				</tr>

				<tr v-for="(producto, index) in familia_tabicon_r60" :key="producto.id">
					<td v-if="index === 0" :rowspan="familia_tabicon_r60.length" class="font-bold">Solidos Tabicon R60</td>
					<td>{{producto.descripcion}}</td>
					<td class="bg-yellow-200 text-right">${{producto.precio_recogido_en_planta}}</td>
					<td class="text-right">{{producto.piezas_por_tarima * producto.tarimas_por_flete_local_rabon}}</td>
					<td class="text-right">{{producto.piezas_por_tarima * producto.tarimas_por_flete_local_torton}}</td>
					<td class="text-center">{{producto.piezas_por_tarima}}</td>
					<td class="text-center">{{producto.tarimas_por_flete_local_rabon}}</td>
					<td class="text-center">{{producto.tarimas_por_flete_local_torton}}</td>
					<td class="bg-yellow-200 text-right">${{producto.precio_puesto_en_obra_rabon}}</td>
					<td class="bg-yellow-200 text-right">${{producto.precio_puesto_en_obra_torton}}</td>
				</tr>

				<tr>
					<td colspan="10" class="no-borders"></td>
				</tr>

				<tr v-for="(producto, index) in familia_boveduca" :key="producto.id">
					<td v-if="index === 0" :rowspan="familia_boveduca.length" class="font-bold">Boveduca</td>
					<td>{{producto.descripcion}}</td>
					<td class="bg-yellow-200 text-right">${{producto.precio_recogido_en_planta}}</td>
					<td class="text-right">{{producto.piezas_por_tarima * producto.tarimas_por_flete_local_rabon}}</td>
					<td class="text-right">{{producto.piezas_por_tarima * producto.tarimas_por_flete_local_torton}}</td>
					<td class="text-center">{{producto.piezas_por_tarima}}</td>
					<td class="text-center">{{producto.tarimas_por_flete_local_rabon}}</td>
					<td class="text-center">{{producto.tarimas_por_flete_local_torton}}</td>
					<td class="bg-yellow-200 text-right">${{producto.precio_puesto_en_obra_rabon}}</td>
					<td class="bg-yellow-200 text-right">${{producto.precio_puesto_en_obra_torton}}</td>
				</tr>

				<tr>
					<td colspan="10" class="no-borders"></td>
				</tr>

				<tr v-for="(producto, index) in familia_losa" :key="producto.id">
					<td v-if="index === 0" :rowspan="familia_losa.length" class="font-bold">Losa</td>
					<td>{{producto.descripcion}}</td>
					<td class="bg-yellow-200 text-right">${{producto.precio_recogido_en_planta}}</td>
					<td class="text-right">{{producto.piezas_por_tarima * producto.tarimas_por_flete_local_rabon}}</td>
					<td class="text-right">{{producto.piezas_por_tarima * producto.tarimas_por_flete_local_torton}}</td>
					<td class="text-center">{{producto.piezas_por_tarima}}</td>
					<td class="text-center">{{producto.tarimas_por_flete_local_rabon}}</td>
					<td class="text-center">{{producto.tarimas_por_flete_local_torton}}</td>
					<td class="bg-yellow-200 text-right">${{producto.precio_puesto_en_obra_rabon}}</td>
					<td class="bg-yellow-200 text-right">${{producto.precio_puesto_en_obra_torton}}</td>
				</tr>

				<tr>
					<td colspan="10" class="no-borders"></td>
				</tr>

				<tr v-for="(producto, index) in familia_hueco_r40" :key="producto.id">
					<td v-if="index === 0" :rowspan="familia_hueco_r40.length" class="font-bold">Hueco R40</td>
					<td>{{producto.descripcion}}</td>
					<td class="bg-yellow-200 text-right">${{producto.precio_recogido_en_planta}}</td>
					<td class="text-right">{{producto.piezas_por_tarima * producto.tarimas_por_flete_local_rabon}}</td>
					<td class="text-right">{{producto.piezas_por_tarima * producto.tarimas_por_flete_local_torton}}</td>
					<td class="text-center">{{producto.piezas_por_tarima}}</td>
					<td class="text-center">{{producto.tarimas_por_flete_local_rabon}}</td>
					<td class="text-center">{{producto.tarimas_por_flete_local_torton}}</td>
					<td class="bg-yellow-200 text-right">${{producto.precio_puesto_en_obra_rabon}}</td>
					<td class="bg-yellow-200 text-right">${{producto.precio_puesto_en_obra_torton}}</td>
				</tr>

				<tr>
					<td colspan="10" class="no-borders"></td>
				</tr>

				<tr v-for="(producto, index) in familia_hueco_r60" :key="producto.id">
					<td v-if="index === 0" :rowspan="familia_hueco_r60.length" class="font-bold">Hueco R60</td>
					<td>{{producto.descripcion}}</td>
					<td class="bg-yellow-200 text-right">${{producto.precio_recogido_en_planta}}</td>
					<td class="text-right">{{producto.piezas_por_tarima * producto.tarimas_por_flete_local_rabon}}</td>
					<td class="text-right">{{producto.piezas_por_tarima * producto.tarimas_por_flete_local_torton}}</td>
					<td class="text-center">{{producto.piezas_por_tarima}}</td>
					<td class="text-center">{{producto.tarimas_por_flete_local_rabon}}</td>
					<td class="text-center">{{producto.tarimas_por_flete_local_torton}}</td>
					<td class="bg-yellow-200 text-right">${{producto.precio_puesto_en_obra_rabon}}</td>
					<td class="bg-yellow-200 text-right">${{producto.precio_puesto_en_obra_torton}}</td>
				</tr>

				<tr>
					<td colspan="10" class="no-borders"></td>
				</tr>

				<tr v-for="(producto, index) in familia_hueco_color_r70" :key="producto.id">
					<td v-if="index === 0" :rowspan="familia_hueco_color_r70.length" class="font-bold">Hueco Color R70</td>
					<td>{{producto.descripcion}}</td>
					<td class="bg-yellow-200 text-right">${{producto.precio_recogido_en_planta}}</td>
					<td class="text-right">{{producto.piezas_por_tarima * producto.tarimas_por_flete_local_rabon}}</td>
					<td class="text-right">{{producto.piezas_por_tarima * producto.tarimas_por_flete_local_torton}}</td>
					<td class="text-center">{{producto.piezas_por_tarima}}</td>
					<td class="text-center">{{producto.tarimas_por_flete_local_rabon}}</td>
					<td class="text-center">{{producto.tarimas_por_flete_local_torton}}</td>
					<td class="bg-yellow-200 text-right">${{producto.precio_puesto_en_obra_rabon}}</td>
					<td class="bg-yellow-200 text-right">${{producto.precio_puesto_en_obra_torton}}</td>
				</tr>

				<tr>
					<td colspan="10" class="no-borders"></td>
				</tr>

				<tr v-for="(producto, index) in familia_block_split_r60" :key="producto.id">
					<td v-if="index === 0" :rowspan="familia_block_split_r60.length" class="font-bold">Block Split R60</td>
					<td>{{producto.descripcion}}</td>
					<td class="bg-yellow-200 text-right">${{producto.precio_recogido_en_planta}}</td>
					<td class="text-right">{{producto.piezas_por_tarima * producto.tarimas_por_flete_local_rabon}}</td>
					<td class="text-right">{{producto.piezas_por_tarima * producto.tarimas_por_flete_local_torton}}</td>
					<td class="text-center">{{producto.piezas_por_tarima}}</td>
					<td class="text-center">{{producto.tarimas_por_flete_local_rabon}}</td>
					<td class="text-center">{{producto.tarimas_por_flete_local_torton}}</td>
					<td class="bg-yellow-200 text-right">${{producto.precio_puesto_en_obra_rabon}}</td>
					<td class="bg-yellow-200 text-right">${{producto.precio_puesto_en_obra_torton}}</td>
				</tr>

				<tr>
					<td colspan="10" class="no-borders"></td>
				</tr>

				<tr v-for="(producto, index) in familia_tabicon_split_r60" :key="producto.id">
					<td v-if="index === 0" :rowspan="familia_tabicon_split_r60.length" class="font-bold">Tabicón Split R60</td>
					<td>{{producto.descripcion}}</td>
					<td class="bg-yellow-200 text-right">${{producto.precio_recogido_en_planta}}</td>
					<td class="text-right">{{producto.piezas_por_tarima * producto.tarimas_por_flete_local_rabon}}</td>
					<td class="text-right">{{producto.piezas_por_tarima * producto.tarimas_por_flete_local_torton}}</td>
					<td class="text-center">{{producto.piezas_por_tarima}}</td>
					<td class="text-center">{{producto.tarimas_por_flete_local_rabon}}</td>
					<td class="text-center">{{producto.tarimas_por_flete_local_torton}}</td>
					<td class="bg-yellow-200 text-right">${{producto.precio_puesto_en_obra_rabon}}</td>
					<td class="bg-yellow-200 text-right">${{producto.precio_puesto_en_obra_torton}}</td>
				</tr>

				<tr>
					<td colspan="10" class="no-borders"></td>
				</tr>

				<tr v-for="(producto, index) in familia_prefabricados" :key="producto.id">
					<td v-if="index === 0" :rowspan="familia_tabicon_r40.length" class="font-bold">PREFABRICADOS</td>
					<td>{{producto.descripcion}}</td>
					<td class="bg-yellow-200 text-right">${{producto.precio_recogido_en_planta}}</td>
					<td class="text-right">{{producto.piezas_por_tarima * producto.tarimas_por_flete_local_rabon}}</td>
					<td class="text-right">{{producto.piezas_por_tarima * producto.tarimas_por_flete_local_torton}}</td>
					<td class="text-center">{{producto.piezas_por_tarima}}</td>
					<td class="text-center">{{producto.tarimas_por_flete_local_rabon}}</td>
					<td class="text-center">{{producto.tarimas_por_flete_local_torton}}</td>
					<td class="bg-yellow-200 text-right">${{producto.precio_puesto_en_obra_rabon}}</td>
					<td class="bg-yellow-200 text-right">${{producto.precio_puesto_en_obra_torton}}</td>
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
	const familia_boveduca = ref([]);
	const familia_losa = ref([]);
	const familia_hueco_r40 = ref([]);
	const familia_hueco_r60 = ref([]);
	const familia_hueco_color_r70 = ref([]);
	const familia_block_split_r60 = ref([]);
	const familia_tabicon_split_r60 = ref([]);
	const familia_prefabricados = ref([]);

	onMounted(async () => {
		const data = await fetchDataByCollection("productos");
		productos.value = data;

		familia_tabicon_r40.value = productos.value.filter( (producto) => producto.familia == "001");
		familia_tabicon_r60.value = productos.value.filter( (producto) => producto.familia == "002");
		familia_boveduca.value = productos.value.filter( (producto) => producto.familia == "003");
		familia_losa.value = productos.value.filter( (producto) => producto.familia == "004");
		familia_hueco_r40.value = productos.value.filter( (producto) => producto.familia == "005");
		familia_hueco_r60.value = productos.value.filter( (producto) => producto.familia == "006");
		familia_hueco_color_r70.value = productos.value.filter( (producto) => producto.familia == "007");
		familia_block_split_r60.value = productos.value.filter( (producto) => producto.familia == "008");
		familia_tabicon_split_r60.value = productos.value.filter( (producto) => producto.familia == "009");
		familia_prefabricados.value = productos.value.filter( (producto) => producto.familia == "010");

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
