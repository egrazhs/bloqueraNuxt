<template>
	<v-container>
		<v-card v-if="doc_info" class="mx-auto mt-5">
			<v-card-title class="headline d-flex align-center justify-between">
				<div>
					<ButtonsReturnArrow size="x-small" />
					<span class="ml-4">Detalles del Arqueo</span>
				</div>

				<ButtonsEdit :route="'/arqueos/edit/' + doc_info.id" />
			</v-card-title>

			<v-divider :thickness="1" class="border-opacity-75 border-slate-400 my-3"></v-divider>
			
			<v-card-text>
				<v-list>
					<v-list-item>
						<v-list-item-title>ID:</v-list-item-title>
						<v-list-item-subtitle>{{parseInt(doc_info.id, 10)}}</v-list-item-subtitle>
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
						<v-list-item-subtitle>{{doc_info.informacion_adicional}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Total:</v-list-item-title>
						<v-list-item-subtitle>{{calcular_total_arqueo(doc_info)}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Billetes de 1000:</v-list-item-title>
						<v-list-item-subtitle>{{parseInt(doc_info.billetes_1000)}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Billetes de 500:</v-list-item-title>
						<v-list-item-subtitle>{{parseInt(doc_info.billetes_500)}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Billetes de 200:</v-list-item-title>
						<v-list-item-subtitle>{{parseInt(doc_info.billetes_200)}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Billetes de 100:</v-list-item-title>
						<v-list-item-subtitle>{{parseInt(doc_info.billetes_100)}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Billetes de 50:</v-list-item-title>
						<v-list-item-subtitle>{{parseInt(doc_info.billetes_50)}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Billetes de 20:</v-list-item-title>
						<v-list-item-subtitle>{{parseInt(doc_info.billetes_20)}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Monedas de 20:</v-list-item-title>
						<v-list-item-subtitle>{{parseInt(doc_info.monedas_20)}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Monedas de 10:</v-list-item-title>
						<v-list-item-subtitle>{{parseInt(doc_info.monedas_10)}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Monedas de 5:</v-list-item-title>
						<v-list-item-subtitle>{{parseInt(doc_info.monedas_5)}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Monedas de 2:</v-list-item-title>
						<v-list-item-subtitle>{{parseInt(doc_info.monedas_2)}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Monedas de 1:</v-list-item-title>
						<v-list-item-subtitle>{{parseInt(doc_info.monedas_1)}}</v-list-item-subtitle>
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
			const data = await getDoc(doc(db, 'arqueos', id));
			if (data.exists()) {
				doc_info.value = data.data();
			} else {
				console.error('Documento no encontrado');
			}
		} catch (error) {
			console.error('Error al obtener detalles del documento:', error.message);
		}
	});


	function calcular_total_arqueo(arqueo){
		let cantidad_total = 0;

   		cantidad_total += arqueo.billetes_1000 * 1000;
    	cantidad_total += arqueo.billetes_500 * 500;
    	cantidad_total += arqueo.billetes_200 * 200;
    	cantidad_total += arqueo.billetes_100 * 100;
    	cantidad_total += arqueo.billetes_50 * 50;
    	cantidad_total += arqueo.billetes_20 * 20;

    	cantidad_total += arqueo.monedas_20 * 20;
    	cantidad_total += arqueo.monedas_10 * 10;
    	cantidad_total += arqueo.monedas_5 * 5;
    	cantidad_total += arqueo.monedas_2 * 2;
    	cantidad_total += arqueo.monedas_1 * 1;
    	return cantidad_total;
	}
</script>