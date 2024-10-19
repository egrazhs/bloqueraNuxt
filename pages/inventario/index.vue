<template>
	<h1 class="text-4xl font-bold">Inventario</h1>

	<h3>Resumen</h3>

	<div class="p-4">
		<!-- Dropdown para seleccionar la familia -->
		<v-select
			v-model="selectedFamily"
			:items="families"
			item-title="descripcion"
			item-value="id"
			label="Selecciona una familia"
			no-data-text="Familia inexistente" 
			@update:model-value="fetchProducts"
			class="mb-4"
		/>

		<!-- Mostrar tabla solo si hay productos cargados -->
		<div v-if="products.length > 0">
			<v-table>
				<thead>
					<tr>
						<th>Nombre del Producto</th>
						<th>Stock</th>
						<th>Precio (Recogido en Planta)</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="product in products" :key="product.id">
						<td>{{ product.descripcion }}</td>
						<td>{{ product.stock }}</td>
						<td>${{ product.precio_recogido_en_planta }}</td>
						<td>
							<v-btn color="primary" @click="openStockModal(product)">Modificar Stock</v-btn>
						</td>
					</tr>
				</tbody>
			</v-table>
		</div>
		<p v-else>No hay productos para mostrar. Selecciona una familia de producto.</p>
	</div>


	 <!-- Modal para modificar el stock -->
	 <v-dialog v-model="stockDialog" max-width="600">
	 	<v-card>
	 		<v-card-title>
	 			<span class="text-h6">Modificar Stock para {{ selectedProduct?.descripcion }}</span>
	 		</v-card-title>
	 		<v-card-text>
	 			<v-form ref="form" v-model="valid" lazy-validation>
	 				<!-- Stock actual y resultante -->
	 				<div class="mb-4">
	 					<p>
	 						<strong>Stock Actual: </strong>
	 						{{ selectedProduct.stock ? selectedProduct.stock : 0 }}
	 					</p>
	 					<p>
	 						Stock Resultante:
	 						<strong :style="{ color: resultColor }">
	 							{{ calculateResultingStock }}
	 						</strong>
	 					</p>
	 				</div>

	 				<!-- Tipo de movimiento -->
	 				<v-radio-group
	 				v-model="movement.type"
	 				:rules="[rules.required]"
	 				label="Tipo de Movimiento"
	 				row
	 				required
	 				>
	 				<v-radio label="Agregar" value="add"></v-radio>
	 				<v-radio label="Quitar" value="substract"></v-radio>
	 			</v-radio-group>

	 			<!-- Cantidad -->
	 			<v-text-field
	 			v-model.number="movement.quantity"
	 			label="Cantidad"
	 			type="number"
	 			:rules="[rules.required, rules.minValue]"
	 			required
	 			@input="calculateStock"
	 			/>

	 			<!-- Comentarios -->
	 			<v-textarea
	 			v-model="movement.comments"
	 			label="Comentarios"
	 			rows="3"
	 			/>
	 		</v-form>
	 	</v-card-text>
	 	<v-card-actions>
	 		<v-spacer></v-spacer>
	 		<v-btn color="grey" text @click="closeStockDialog">Cancelar</v-btn>
	 		<v-btn color="primary" text @click="saveStockMovement">Guardar</v-btn>
	 	</v-card-actions>
	 </v-card>
	</v-dialog>

</template>

<script setup>
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore'

// Variables de estado
const selectedFamily = ref(null);
const products = ref([]);
const families = ref([]);

const movement = ref({
	type: 'add',
	quantity: 0,
	comments: ''
});
const stockDialog = ref(false);
const valid = ref(false);
const selectedProduct = ref(null);


// Cargar las familias al montar el componente
onMounted(async () => {
  try {
    families.value = await createSelectOfDocuments('familias_productos', 'descripcion');
  } catch (error) {
    console.error('Error al cargar las familias:', error);
  }
})

// Función para hacer el fetch de productos según la familia seleccionada
const fetchProducts = async () => {
	console.log('cambio en la familia de producto a  mostrar');
  if (!selectedFamily.value) return

  try {
    const db = getFirestore()
    const productsRef = collection(db, 'productos')
    const q = query(productsRef, where('familia', '==', selectedFamily.value))
    const querySnapshot = await getDocs(q)

    products.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Error al obtener los productos:', error)
  }
  
}


// Reglas de validación
const rules = {
	required: value => !!value || 'Este campo es obligatorio',
	minValue: value => value > 0 || 'La cantidad debe ser mayor que 0',
}


// Computed para calcular el stock resultante
const calculateResultingStock = computed(() => {
 	const currentStock = selectedProduct.value?.stock || 0; // Valor predeterminado 0 si no está definido
 	if (!movement.value.quantity || !movement.value.type) {
    	return currentStock;
 	}
	
	const adjustment = movement.value.type === 'add' ? movement.value.quantity : -movement.value.quantity;
	return currentStock + adjustment;
});

//Computed para el color del stock resultante
const resultColor = computed(() => {
	return calculateResultingStock.value > (selectedProduct.value?.stock || 0) ? 'green' : 'red'
})

// Función para abrir el modal y seleccionar el producto
const openStockModal = (product) => {
	selectedProduct.value = product;
	movement.value.product = product.id;
	stockDialog.value = true;
}

// Función para cerrar el modal
const closeStockDialog = () => {
	stockDialog.value = false;
}

// Función para guardar el movimiento de stock
const saveStockMovement = async () => {
	if (!valid.value) {
		return;
	}

  	try {
		// Obtener el ID personalizado para el nuevo movimiento
		const nuevo_id = await getNextId("movimientos_inventario", 10);

		// Obtener el stock actual del producto antes del cambio
		const stockAnterior = selectedProduct.value?.stock || 0;
		const stockActual = calculateResultingStock.value;

		// Crear un nuevo objeto con los datos del movimiento
		const nuevoDoc = {
			tipo: movement.value.type,
			cantidad: movement.value.quantity,
			comentarios: movement.value.comments,
			id_producto: selectedProduct.value.id,
			stock_anterior: stockAnterior,  // Guardar stock anterior
			stock_actual: stockActual,      // Guardar stock actual
	  		id: nuevo_id,
	  		fecha: new Date().toISOString().split('T')[0],
	  		hora: new Date().toISOString().split('T')[1],
	  		_type: 'movimientos_inventario'
		};

		// Agregar el nuevo movimiento a Firestore utilizando el ID personalizado
		await agregarDocumento('movimientos_inventario', nuevoDoc, nuevo_id);

		// Actualizar el stock en el frontend
		const productoActualizado = products.value.find(p => p.id === selectedProduct.value.id);
		if (productoActualizado) {
			productoActualizado.stock = stockActual;
		}

		// Limpiar los campos del formulario después de agregar el movimiento
		movement.value.quantity = 0; // Reiniciar la cantidad
		movement.value.comments = ''; // Limpiar comentarios
	} catch (error) {
		console.error('Error al agregar el movimiento:', error.message);
	}
	
	console.log('Movimiento guardado:', movement.value);
	closeStockDialog();
}

</script>