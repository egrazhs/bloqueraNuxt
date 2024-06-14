<template>
	<v-container>
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
			<div class="text-center">
				<v-progress-circular indeterminate size="64"></v-progress-circular>
				<p>Cargando detalles del usuario...</p>
			</div>
		</v-container>
	</v-container>
</template>

<script setup>
	import { ref, onMounted, computed } from 'vue';
	import { getDoc, doc } from 'firebase/firestore';
	import { useRouter, useRoute } from 'vue-router';
	import { initializeApp } from 'firebase/app';
	import { getFirestore } from 'firebase/firestore';
	import firebaseConfig from '~/utils/firebaseConfig';

	const app = initializeApp(firebaseConfig);
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
			const usuarioDoc = await getDoc(doc(db, 'usuarios', id));
			if (usuarioDoc.exists()) {
				usuario.value = usuarioDoc.data();
			} else {
				console.error('Usuario no encontrado');
			}
		} catch (error) {
			console.error('Error al obtener detalles del usuario:', error.message);
		}
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
