<template>
	<v-container>
		<v-card v-if="doc_info" class="mx-auto mt-5">
			<v-card-title class="headline d-flex align-center">
				<ButtonsReturnArrow size="x-small" />
				<span class="ml-4">Detalles de la sucursal</span>
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
						<v-list-item-title>Prefijo:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.prefijo}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Dirección:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.direccion}}</v-list-item-subtitle>
					</v-list-item>
				</v-list>
			</v-card-text>
		</v-card>

		<ScreensLoading v-else></ScreensLoading>
	</v-container>
</template>

<script setup>
	import { getDoc, doc } from 'firebase/firestore';
	import { initializeApp } from 'firebase/app';
	import { getFirestore } from 'firebase/firestore';
	import firebaseConfig from '~/utils/firebaseConfig';

	const app = initializeApp(firebaseConfig);
	const db = getFirestore(app);

	const router = useRouter();
	const doc_info = ref(null);

	onMounted(async () => {
		try {
			const { id } = router.currentRoute.value.params;
			const data = await getDoc(doc(db, 'sucursales', id));
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