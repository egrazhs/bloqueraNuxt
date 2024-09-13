<template>
	<v-container>
		<v-card v-if="doc_info" class="mx-auto mt-5">
			<v-card-title class="headline d-flex align-center">
				<ButtonsReturnArrow size="x-small" />
				<span class="ml-4">Detalles del Arqueo</span>
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
						<v-list-item-subtitle><span v-if="doc_info.descripcion == ''">N/A</span>{{doc_info.descripcion}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Código:</v-list-item-title>
						<v-list-item-subtitle><span v-if="doc_info.codigo == ''">N/A</span>{{doc_info.codigo}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Condición:</v-list-item-title>
						<v-list-item-subtitle><span v-if="doc_info.condicion == ''">N/A</span>{{doc_info.condicion}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Status:</v-list-item-title>
						<v-list-item-subtitle><span v-if="doc_info.status == ''">N/A</span>{{doc_info.status}}</v-list-item-subtitle>
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
			const data = await getDoc(doc(db, 'formas_de_pagos', id));
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