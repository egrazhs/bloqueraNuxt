<template>
	<v-container>
		<v-card v-if="doc_info" class="mx-auto mt-5">
			<v-card-title class="headline d-flex align-center">
				<ButtonsReturnArrow size="x-small" />
				<span class="ml-4">Detalles del Producto</span>
			</v-card-title>

			<v-divider :thickness="1" class="border-opacity-75 border-slate-400 my-3"></v-divider>
			
			<v-card-text>
				<v-list>
					<v-list-item>
						<v-list-item-title>ID:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.id}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Descripción:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.descripcion}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Código:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.codigo}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Peso:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.peso}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Porcentaje de comisión a vendedores:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.porcentaje_comision_vendedores}}%</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Unidad de medida:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.unidad_medida}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Piezas por Tarima:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.piezas_por_tarima}}</v-list-item-subtitle>
					</v-list-item>

				</v-list>
			</v-card-text>
		</v-card>

		<ScreensLoading v-else></ScreensLoading>
	</v-container>
</template>

<script setup>
	import { db } from '~/utils/firebase';
	import { getDoc, doc } from 'firebase/firestore';

	const router = useRouter();
	const doc_info = ref(null);

	onMounted(async () => {
		try {
			const { id } = router.currentRoute.value.params;
			const data = await getDoc(doc(db, 'productos', id));
			if (data.exists()) {
				doc_info.value = data.data();
			} else {
				console.error('Documento no encontrado');
			}
		} catch (error) {
			console.error('Error al obtener detalles del documento:', error.message);
		}
	});
</script>