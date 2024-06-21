<template>
	<v-dialog v-model="dialog" max-width="500">
		<v-card>
			<v-card-title class="headline">{{ title }}</v-card-title>
			<v-card-text>{{ message }}</v-card-text>
			<div v-if="details" class="mt-4">
				<v-row class="text-xs italic">
					<v-col cols="1"></v-col>
					<v-col cols="5" md="5">
						<strong>ID:</strong> {{ details.id }}
					</v-col>
					<v-col cols="5" md="5">
						<strong>{{ detailsLabel }}:</strong> {{ details.value }}
					</v-col>
				</v-row>
			</div>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="red darken-1" text @click="cancelar">Cancelar</v-btn>
				<v-btn :disabled="loading" color="green darken-1" text @click="confirmar">
					<template v-if="loading">
						<v-progress-circular indeterminate size="20"></v-progress-circular>
					</template>
					<template v-else>
						Confirmar
					</template>
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script setup>
	import { defineProps, defineEmits } from 'vue';

	const emits = defineEmits(['cancelar', 'confirmar']);

	const cancelar = () => {
		emits('cancelar');
	};

	const confirmar = () => {
		emits('confirmar');
	};
</script>

<style scoped>
	.text-xs {
		font-size: 0.75rem;
	}
	.italic {
		font-style: italic;
	}
	.mt-4 {
		margin-top: 1rem;
	}
</style>
