<template>
	<v-container>
		<v-card v-if="doc_info" class="mx-auto mt-5">
			<v-card-title class="headline d-flex align-center justify-between">
				<div>
					<ButtonsReturnArrow size="x-small" />
					<span class="ml-4">Detalles del Vehiculo</span>
				</div>

				<ButtonsEdit :route="'/vehiculos/edit/' + doc_info.id" />
			</v-card-title>

			<v-divider :thickness="1" class="border-opacity-75 border-slate-400 my-3"></v-divider>
			
			<v-card-text>
				<v-list>
					<v-list-item>
						<v-list-item-title>ID:</v-list-item-title>
						<v-list-item-subtitle>{{parseInt(doc_info.id, 10)}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Alias:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.alias}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Matrícula:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.matricula}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Modelo:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.modelo}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Año:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.year}}</v-list-item-subtitle>
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
			const data = await getDoc(doc(db, 'vehiculos', id));
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