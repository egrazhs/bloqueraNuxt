<template>
	<v-container>
		<v-card v-if="usuario" class="mx-auto mt-5">
			<v-card-title class="headline d-flex align-center justify-between">
				<div>
					<ButtonsReturnArrow size="x-small" />
					<span class="ml-4">Detalles del Usuario</span>
				</div>

				<ButtonsEdit :route="'/usuarios/edit/' + usuario.id" />
			</v-card-title>

			<v-divider :thickness="1" class="border-opacity-75 border-slate-400 my-3"></v-divider>
			
			<v-card-text>
				<v-list>
					<v-list-item>
						<v-list-item-title>ID:</v-list-item-title>
						<v-list-item-subtitle>{{parseInt(usuario.id, 10)}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Nombre:</v-list-item-title>
						<v-list-item-subtitle>{{usuario.nombre_completo}}</v-list-item-subtitle>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>Username:</v-list-item-title>
						<v-list-item-subtitle>{{usuario.username}}</v-list-item-subtitle>
					</v-list-item>
				</v-list>


				<h2 class="italic mb-4">Permisos:</h2>
				<v-divider :thickness="1" class="border-opacity-75 border-slate-400 my-4"></v-divider>
				
				<CheckboxGroupCRUD title="Usuarios" prefix="usuarios" :usuario="usuario" :isDisabled=true />
				<CheckboxGroupCRUD title="Clientes" prefix="clientes" :usuario="usuario" :isDisabled=true  />
				<CheckboxGroupCRUD title="Proveedores" prefix="proveedores" :usuario="usuario" :isDisabled=true  />
				<CheckboxGroupCRUD title="Vehiculos" prefix="vehiculos" :usuario="usuario" :isDisabled=true  />
				<CheckboxGroupCRUD title="Productos" prefix="productos" :usuario="usuario" :isDisabled=true  />
				<CheckboxGroupCRUD title="Sucursales" prefix="sucursales" :usuario="usuario" :isDisabled=true  />
				<CheckboxGroupCRUD title="Arqueos" prefix="arqueos" :usuario="usuario" :isDisabled=true  />
				<CheckboxGroupCRUD title="Remisiones" prefix="remisiones" :usuario="usuario" :isDisabled=true  />
			</v-card-text>
		</v-card>

		<ScreensLoading v-else></ScreensLoading>
	</v-container>
</template>

<script setup>
	import { db } from '~/utils/firebase';
	import { getDoc, doc } from 'firebase/firestore';

	const router = useRouter();
	const usuario = ref(null);

	onMounted(async () => {
		try {
			const { id } = router.currentRoute.value.params;
			const usuarioDoc = await getDoc(doc(db, 'usuarios', id));
			if (usuarioDoc.exists()) {
				usuario.value = usuarioDoc.data();
			} else {
				console.error('Usuario no encontrado');
			}
		} catch (error) {
			console.error('Error al obtener detalles del usuario:', error.message);
		}
	});
</script>