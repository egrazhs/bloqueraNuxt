<template>
	<v-container>
		<v-card v-if="doc_info" class="mx-auto mt-5">
			<v-card-title class="headline d-flex align-center">
				<ButtonsReturnArrow size="x-small" />
				<span class="ml-4">Detalles del Trabajador</span>
			</v-card-title>

			<v-divider :thickness="1" class="border-opacity-75 border-slate-400 my-3"></v-divider>
			
			<v-card-text>
				<v-list>
					<v-list-item>
						<v-list-item-title>ID:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.id}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Nombre:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.nombre}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Código:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.codigo}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Alias:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.alias}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Sexo:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.sexo}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Puesto:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.puesto}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Lugar:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.tipo_de_salario}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item v-if="doc_info.tipo_de_salario == 'FIJO'">
						<v-list-item-title>Importe de Salario:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.importe_de_salario}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Periodo de Pago:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.periodo_de_pago}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Forma de Pago:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.forma_de_pago}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Banco:</v-list-item-title>
						<v-list-item-subtitle><span v-if="doc_info.banco == ''">N/A</span>{{doc_info.banco}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Cuenta:</v-list-item-title>
						<v-list-item-subtitle><span v-if="doc_info.cuenta == ''">N/A</span>{{doc_info.cuenta}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Fecha de ingreso:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.fecha_de_ingreso}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Planta:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.planta}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title># IMSS:</v-list-item-title>
						<v-list-item-subtitle><span v-if="doc_info.imss == ''">N/A</span>{{doc_info.imss}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Crédito Infonavit:</v-list-item-title>
						<v-list-item-subtitle><span v-if="doc_info.credito_infonavit == ''">N/A</span>{{doc_info.credito_infonavit}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Salario Diario Integrado:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.salario_diario_integrado}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Telefono:</v-list-item-title>
						<v-list-item-subtitle><span v-if="doc_info.telefono == ''">N/A</span>{{doc_info.telefono}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Domicilio:</v-list-item-title>
						<v-list-item-subtitle><span v-if="doc_info.domicilio == ''">N/A</span>{{doc_info.domicilio}}</v-list-item-subtitle>
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
			const data = await getDoc(doc(db, 'trabajadores', id));
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