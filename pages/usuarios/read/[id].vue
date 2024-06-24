<template>
	<v-container>
<<<<<<< HEAD
		<v-card v-if="usuario" class="mx-auto mt-5" max-width="500">
			<v-card-title class="headline d-flex align-center">
				<v-btn icon @click="volver">
					<v-icon size="16">mdi-arrow-left</v-icon>
				</v-btn>
				<span class="ml-4">Detalles del Usuario</span>
			</v-card-title>
			<v-divider></v-divider>
			<v-card-text>
				<v-list>
					<v-list-item v-for="(value, key) in usuarioData" :key="key" class="hoverable">
						<v-list-item-content>
							<v-list-item-title><strong>{{ key }}:</strong></v-list-item-title>
							<v-list-item-subtitle>{{ value }}</v-list-item-subtitle>
						</v-list-item-content>
						<v-divider></v-divider>
					</v-list-item>
				</v-list>
			</v-card-text>
			<v-divider></v-divider>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="blue darken-1" @click="irAEditar">
					Editar
				</v-btn>
			</v-card-actions>
		</v-card>

		<v-container v-else class="d-flex justify-center align-center" style="height: 100vh;">
=======
		<v-card v-if="usuario" class="mx-auto mt-5">
			<v-card-title class="headline d-flex align-center">
				<ButtonsReturnArrow size="x-small" />
				<span class="ml-4">Detalles del Usuario</span>
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

		<v-container v-else class="d-flex justify-center align-center">
>>>>>>> b55e77ec30160e40abe477eb34f78045f3d3e9f3
			<div class="text-center">
				<v-progress-circular indeterminate size="64"></v-progress-circular>
				<p>Cargando detalles del usuario...</p>
			</div>
		</v-container>
	</v-container>
</template>

<script setup>
<<<<<<< HEAD
	import { ref, onMounted, computed } from 'vue';
	import { getDoc, doc } from 'firebase/firestore';
	import { useRouter, useRoute } from 'vue-router';
=======
	import { getDoc, doc } from 'firebase/firestore';
>>>>>>> b55e77ec30160e40abe477eb34f78045f3d3e9f3
	import { initializeApp } from 'firebase/app';
	import { getFirestore } from 'firebase/firestore';
	import firebaseConfig from '~/utils/firebaseConfig';

	const app = initializeApp(firebaseConfig);
<<<<<<< HEAD
	const db = getFirestore(app);

	const router = useRouter();
	const route = useRoute();
	const usuario = ref(null);

	const volver = () => {
		router.push('/usuarios');
	};

	const irAEditar = () => {
		if (usuario.value) {
			router.push(`/usuarios/edit/${route.params.id}`);
		}
	};

	const fetchUsuario = async () => {
		try {
			const { id } = route.params;
=======
	// Obtiene la instancia de Firestore
	const db = getFirestore(app);

	const router = useRouter();
	const usuario = ref(null);

	onMounted(async () => {
		try {
			const { id } = router.currentRoute.value.params;
>>>>>>> b55e77ec30160e40abe477eb34f78045f3d3e9f3
			const usuarioDoc = await getDoc(doc(db, 'usuarios', id));
			if (usuarioDoc.exists()) {
				usuario.value = usuarioDoc.data();
			} else {
				console.error('Usuario no encontrado');
			}
		} catch (error) {
			console.error('Error al obtener detalles del usuario:', error.message);
		}
<<<<<<< HEAD
	};

	onMounted(fetchUsuario);

	const usuarioData = computed(() => {
		if (usuario.value) {
			return {
				'Nombre': usuario.value.nombre_completo,
				'Username': usuario.value.username,
				'Alias': usuario.value.alias
			};
		}
		return {};
=======
>>>>>>> b55e77ec30160e40abe477eb34f78045f3d3e9f3
	});
</script>

<style scoped>
	.mx-auto {
		margin: auto;
	}

	.mt-5 {
		margin-top: 2rem;
	}

	.hoverable {
		transition: background-color 0.3s ease;
	}

	.hoverable:hover {
		background-color: rgba(0, 0, 0, 0.05);
	}
</style>
