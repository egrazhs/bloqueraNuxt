<template>
	<v-dialog v-model="dialog" max-width="500">
		<v-card>
			<v-card-title class="headline">Confirmar Eliminación</v-card-title>
			<v-card-text>{{ confirmMessage }}</v-card-text>
			<div v-if="item" class="mt-4">
				<v-row class="text-xs italic">
					<v-col cols="1"></v-col>
					<v-col cols="5" md="5">
						<strong>ID:</strong> {{ parseInt(item.id, 10) }}
					</v-col>
					<v-col cols="5" md="5">
						<strong>{{ data_name }} : </strong> {{ data_value }}
					</v-col>
				</v-row>
			</div>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="red darken-1" text @click="cancel">Cancelar</v-btn>
				<v-btn :disabled="deleting" color="green darken-1" text @click="confirm">
					<template v-if="deleting">
						<v-progress-circular indeterminate size="20"></v-progress-circular>
					</template>
					<template v-else>
						Eliminar
					</template>
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script setup>
	const props = defineProps({
		show: {
			type: Boolean,
			required: true
		},
		item: {
			type: Object,
			required: false
		},
		confirmMessage: {
			type: String,
			default: '¿Estás seguro de que deseas eliminar este elemento?'
		},
		data_name: {
			type: String,
			required: false,
			default: 'Nombre'
		},
		data_value: {
			type: String,
			required: true
		}
	});

	const emit = defineEmits(['cancel', 'confirm']);

	const dialog = ref(props.show);
	const deleting = ref(false);

	watch(() => props.show, (newVal) => {
		dialog.value = newVal;
	});

	const cancel = () => {
		emit('cancel');
	};

	const confirm = async () => {
		deleting.value = true;
		emit('confirm', props.item);
		setTimeout(() => { // Simulate delete process
  			deleting.value = false;
  			emit('cancel');
		}, 2000);
	};
</script>