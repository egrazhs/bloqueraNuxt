<template>
	<v-container>
		<v-card class="mx-auto mt-5" max-width="600">
			<v-card-title class="headline d-flex align-center">
				<v-btn icon @click="volver">
					<v-icon size="24">mdi-arrow-left</v-icon>
				</v-btn>
				<span class="ml-4">Editar Usuario</span>
			</v-card-title>
			<v-divider></v-divider>
			<v-card-text>
				<v-form ref="form" v-model="valid" lazy-validation>
					<v-text-field
					v-model="usuario.nombre_completo"
					:rules="rules.required"
					label="Nombre Completo"
					required
					></v-text-field>
					<v-text-field
					v-model="usuario.username"
					:rules="rules.required"
					label="Username"
					required
					></v-text-field>
					<v-text-field
					v-model="usuario.alias"
					:rules="rules.required"
					label="Alias"
					required
					></v-text-field>
				</v-form>
			</v-card-text>
			<v-divider></v-divider>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="blue darken-1" @click="guardar" :disabled="!valid">
					Guardar
				</v-btn>
			</v-card-actions>
		</v-card>

		<v-container v-if="loading" class="d-flex justify-center align-center" style="height: 100vh;">
			<div class="text-center">
				<v-progress-circular indeterminate size="64"></v-progress-circular>
				<p>Cargando detalles del usuario...</p>
			</div>
		</v-container>
	</v-container>
</template>

<script setup>
	import { getDoc, updateDoc, doc, getFirestore } from 'firebase/firestore';
	import firebaseConfig from '~/utils/firebaseConfig';
	import { initializeApp } from 'firebase/app';

	const app = initializeApp(firebaseConfig);
	// Obtiene la instancia de Firestore
	const db = getFirestore(app);

	const router = useRouter();
	const route = useRoute();

	const usuario = ref({
		nombre_completo: '',
		username: '',
		alias: ''
	});
	const loading = ref(true);
	const valid = ref(false);
	const rules = {
		required: [value => !!value || 'Este campo es requerido']
	};

	const volver = () => {
		router.push('/usuarios');
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
		} finally {
			loading.value = false;
		}
	};

	const guardar = async () => {
		try {
			const { id } = route.params;
			await updateDoc(doc(db, 'usuarios', id), usuario.value);
			router.push({ path: '/usuarios', query: { usuarioActualizado: true } });
		} catch (error) {
			console.error('Error al actualizar el usuario:', error.message);
		}
	};

	onMounted(fetchUsuario);
</script>
