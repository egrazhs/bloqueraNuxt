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
						<v-list-item-subtitle>{{parseInt(doc_info.id, 10)}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Nombre:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.nombre}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Descripción:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.descripcion}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Código:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.prefijo}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Peso:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.peso}}</v-list-item-subtitle>
					</v-list-item>

					<h4 class="px-4 py-2 font-bold text-lg">Precios:</h4>

					<v-list-item>
						<v-list-item-title>Piso:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.piso}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Obra:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.obra}}</v-list-item-subtitle>
					</v-list-item>

					<h4 class="px-4 py-2 font-bold text-lg">Cantidades</h4>

					<v-list-item>
						<v-list-item-title>Rabón:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.rabon}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Tarima:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.tarima}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Tortón:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.torton}}</v-list-item-subtitle>
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