<template>
	<v-container>
		<v-card v-if="doc_info" class="mx-auto mt-5">
			<v-card-title class="headline d-flex align-center justify-between">
				<div>
					<ButtonsReturnArrow size="x-small" />
					<span class="ml-4">Detalles del Abono</span>
				</div>

				<ButtonsEdit :route="'/abonos/edit/' + doc_info.id" />
			</v-card-title>

			<v-divider :thickness="1" class="border-opacity-75 border-slate-400 my-3"></v-divider>
			
			<v-card-text>
				<v-list>
					<v-list-item>
						<v-list-item-title>ID:</v-list-item-title>
						<v-list-item-subtitle>{{parseInt(doc_info.id, 10)}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Cliente:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.cliente}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Cantidad:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.cantidad}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Fecha:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.fecha.split('T')[0]}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Hora:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.fecha.split('T')[1]}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Información Adicional:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.info_adicional? doc_info.info_adicional : 'N/A'}}</v-list-item-subtitle>
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
			const data = await getDoc(doc(db, 'abonos', id));
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