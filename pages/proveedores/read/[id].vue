<template>
	<v-container>
		<v-card v-if="doc_info" class="mx-auto mt-5">
			<v-card-title class="headline d-flex align-center justify-between">
				<div>
					<ButtonsReturnArrow size="x-small" />
					<span class="ml-4">Detalles del Proveedor</span>
				</div>

				<ButtonsEdit :route="'/proveedores/edit/' + doc_info.id" />
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
						<v-list-item-title>Tipo de Persona:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.tipo_de_persona}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Vende:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.que_vende}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Factura:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.hace_factura}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Forma de Pago:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.forma_de_pago}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Crédito:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.tiene_credito}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item v-if="doc_info.tiene_credito == 'SI'">
						<v-list-item-title>Monto de Crédito:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.monto_credito}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Contacto:</v-list-item-title>
						<v-list-item-subtitle>{{doc_info.contacto}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Teléfono:</v-list-item-title>
						<v-list-item-subtitle><span v-if="doc_info.telefono == ''">N/A</span>{{doc_info.telefono}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Banco:</v-list-item-title>
						<v-list-item-subtitle><span v-if="doc_info.banco == ''">N/A</span>{{doc_info.banco}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>No. de Cuenta:</v-list-item-title>
						<v-list-item-subtitle><span v-if="doc_info.cuenta == ''">N/A</span>{{doc_info.cuenta}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Alerta:</v-list-item-title>
						<v-list-item-subtitle><span v-if="doc_info.alerta == ''">N/A</span>{{doc_info.alerta}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Correo:</v-list-item-title>
						<v-list-item-subtitle><span v-if="doc_info.correo == ''">N/A</span>{{doc_info.correo}}</v-list-item-subtitle>
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
			const data = await getDoc(doc(db, 'proveedores', id));
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