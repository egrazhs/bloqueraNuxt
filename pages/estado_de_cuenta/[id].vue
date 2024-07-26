<template>
  <ScreensLoading v-if="loading"></ScreensLoading>
  
  <section v-else>
    <h1 class="font-bold text-2xl">Estado de Cuenta: <span>{{ cliente.nombre }}</span></h1>

    <h4 class="font-italic font-bold my-4 text-xl">Resumen: <span>{{ saldo.toFixed(2) }}</span></h4>

    <hr class="my-2">

    <h3 class="font-italic text-lg">Detalles</h3>

    <table class="my-4">
      <thead class="text-sm font-bold">
        <tr>
          <td>Fecha</td>
          <td>Nota</td>
          <td>Obra</td>
          <td>Material</td>
          <td>Cantidad</td>
          <td>Precio</td>
          <td>Importe</td>
          <td>Abono</td>
          <td>Saldo</td>
        </tr>
      </thead>
      <tbody class="text-xs">
        <tr v-for="(transaccion, index) in transacciones" :key="index">
          <td>{{ transaccion.fecha.split('T')[0] }}</td>
          <td class="text-right"><span v-if="transaccion._type == 'remision_material'">{{parseInt(transaccion.id_remision, 10)}}</span></td>
          <td>{{transaccion.obra}}</td>
          <td><span v-if="transaccion._type == 'remision_material'">{{api_productos.productos.find( producto => producto.id == transaccion.producto).nombre}}</span></td>
          <td class="text-right"><span v-if="transaccion._type == 'remision_material'">{{transaccion.cantidad}}</span></td>
          <td class="text-right"><span v-if="transaccion._type == 'remision_material'">${{transaccion.precio_unitario}}</span></td>
          <td class="text-right"><span v-if="transaccion._type == 'remision_material'">${{ (transaccion.cantidad * transaccion.precio_unitario).toFixed(2) }}</span></td>
          <td class="text-right"><span v-if="transaccion._type == 'abono'">${{transaccion.abono.toFixed(2)}}</span></td>
          <td class="text-right">{{ calcularSaldo(index) }}</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td class="font-bold text-xl text-right">Total:</td>
          <td class="text-right">{{ totalRemisiones.toFixed(2).toLocaleString('en-US') }}</td>
          <td class="text-right">{{ totalAbonos.toFixed(2) }}</td>
          <td class="text-right">{{ saldo.toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup>
	import { useRoute } from 'vue-router';
	import { ref, onMounted } from 'vue';
	import { db } from '~/utils/firebase';
	import { collection, query, where, getDocs } from 'firebase/firestore';

	let { data: api_clientes} = await useFetch('/api/clientes');
	let { data: api_productos} = await useFetch('/api/productos');

	const route = useRoute();
	const loading = ref(true);
	const abonos = ref([]);
	const remisiones = ref([]);
	const cliente = ref(null);
	const transacciones = ref([]);
	const totalRemisiones = ref(0);
	const totalAbonos = ref(0);
	const saldo = ref(0);


	onMounted(async () => {
		try {
			const clienteId = route.params.id;

			// Obtener datos del cliente
			cliente.value = await fetchDataById('clientes', clienteId);

			if (cliente.value) {
  				// Obtener abonos del cliente
				const abonosRef = collection(db, 'abonos');
				const q_abonos = query(abonosRef, where('cliente', '==', clienteId));
				const abonosSnapshot = await getDocs(q_abonos);

				abonosSnapshot.forEach(doc => {
					const data = doc.data();
					abonos.value.push(data);
					totalAbonos.value += data.cantidad;
				});

  				// Obtener remisiones del cliente
				const remisionesRef = collection(db, 'remisiones');
				const q_remisiones = query(remisionesRef, where('cliente', '==', clienteId));
				const remisionesSnapshot = await getDocs(q_remisiones);

				remisionesSnapshot.forEach(doc => {
					const data = doc.data();
					remisiones.value.push(data);
					data.material.forEach(material => {
						const importe = material.cantidad * material.precio_unitario;
						totalRemisiones.value += importe;
					});
				});

				abonos.value.forEach(abono => {
					transacciones.value.push({
						...abono,
						abono: abono.cantidad,
						_type: 'abono'
					});
				});

				remisiones.value.forEach(remision => {
					remision.material.forEach(material => {
						transacciones.value.push({
							...remision,
							...material,
							producto: material.producto,
							cantidad: material.cantidad,
							precio_unitario: material.precio_unitario,
							_type: 'remision_material',
							id_remision: remision.id,
							id_material: material.id
						});
					});
				});

				// Combinar y ordenar las transacciones por fecha
				transacciones.value.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

				// Calcular el saldo inicial
				saldo.value = totalRemisiones.value - totalAbonos.value;
			}
		} catch (error) {
			console.error('Error al obtener los datos:', error);
		} finally {
			loading.value = false;
		}
	});

	// Función para calcular el saldo acumulado
	function calcularSaldo(index) {
		let saldoAcumulado = 0;
		for (let i = 0; i <= index; i++) {
			const transaccion = transacciones.value[i];
			if (transaccion._type === 'remision_material') {
				saldoAcumulado += transaccion.cantidad * transaccion.precio_unitario;
			} else if (transaccion._type === 'abono') {
				saldoAcumulado -= transaccion.abono;
			}
		}
		return saldoAcumulado.toFixed(2);
	}
</script>

<style scoped>
	table {
		width: 100%;
		border-collapse: collapse;
	}

	th, td {
		border: 1px solid #ddd;
		padding: 8px;
	}

	th {
		background-color: #f2f2f2;
	}
</style>