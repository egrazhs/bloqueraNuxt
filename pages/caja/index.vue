<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-date-picker v-model="selectedDate" @change="filterTransactions"></v-date-picker>
      </v-col>
      <v-col cols="12">
        <v-data-table :headers="headers" :items="filteredTransactions">
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Caja - Movimientos del Día</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>
          <template v-slot:footer.prepend>
            <div>
              <strong>Total Ingresos: </strong> {{ totalIngresos | currency }}
            </div>
            <div>
              <strong>Total Egresos: </strong> {{ totalEgresos | currency }}
            </div>
            <div>
              <strong>Saldo Final: </strong> {{ saldoFinal | currency }}
            </div>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';

// Datos simulados
const transactions = ref([
  { fecha: '2023-09-01', tipo: 'ingreso', monto: 3000, clave: '#7650', descripcion: 'Chema Mecanico' },
  { fecha: '2023-09-01', tipo: 'ingreso', monto: 1400, clave: '#7651', descripcion: 'Guantes Azules' },
  { fecha: '2023-09-01', tipo: 'egreso', monto: 2200, clave: '#7648', descripcion: 'JAL 2 Viajes' },
  { fecha: '2023-09-01', tipo: 'ingreso', monto: 765, clave: '#7649', descripcion: 'Venta' },
  { fecha: '2023-09-01', tipo: 'egreso', monto: 600, clave: '#7652', descripcion: 'Materiales Sufeji' },
  // Agrega más datos según lo necesites
]);

const selectedDate = ref(null);
const filteredTransactions = ref(transactions.value);

// Cabeceras de la tabla
const headers = [
  { text: 'Fecha', value: 'fecha' },
  { text: 'Tipo', value: 'tipo' },
  { text: 'Monto', value: 'monto' },
  { text: 'Clave', value: 'clave' },
  { text: 'Descripción', value: 'descripcion' },
];

// Filtrar transacciones por la fecha seleccionada
function filterTransactions() {
  filteredTransactions.value = transactions.value.filter(transaction => transaction.fecha === selectedDate.value);
}

// Calcular totales
const totalIngresos = computed(() => {
  return filteredTransactions.value.reduce((total, transaction) => {
    return transaction.tipo === 'ingreso' ? total + transaction.monto : total;
  }, 0);
});

const totalEgresos = computed(() => {
  return filteredTransactions.value.reduce((total, transaction) => {
    return transaction.tipo === 'egreso' ? total + transaction.monto : total;
  }, 0);
});

const saldoFinal = computed(() => totalIngresos.value - totalEgresos.value);

// Formato de moneda
const currency = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' });
</script>

<style scoped>
.v-data-table {
  margin-top: 20px;
}
</style>
