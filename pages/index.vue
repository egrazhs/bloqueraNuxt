<template>
	<section id="vista_inicio" name="vista">
		<h1 class="font-bold text-4xl">Inicio</h1>
		<hr>

		<section class="p-2 hover:bg-slate-200">	
			<h4 class="font-bold">Ultimos cambios agregados:</h4>
			<ol class="text-xs">
				<li>~ Ya se muestra nombre del cliente en Ver remisión en vez del id.</li>
				<li>~ Agregar CRUD de Familias de productos.</li>
			</ol>
		</section>

		<section class="p-2 hover:bg-slate-200">
			<h4 class="font-bold">To Do:</h4>
			<ol class="text-xs">
				<li>~ Barras de búsqueda en documentos</li>
				<li>~ Paginar documentos en donde haya mas de 10 en una pagina.</li>
				<li>~ Subir página a dominio de prueba.</li>
				<li>~ Manejo de sesión de usuarios.</li>
				<li>~ Inventario.</li>
				<li>~ Función para evitar que se sobreescriban o se creen remisiones con un id ya hecho.</li>
				<li>~ Modificar el precio unitario de un producto al elegir nuevo en remisiones.</li>
				<li>~ Dar Formato a cantidades y fechas en Abonos</li>
				<li>~ Dar Formato a cantidades y fechas en Estado de Cuenta</li>
				<li>~ Agregar Boton de ver estado de cuenta en Ver Cliente.</li>
				<li>~ Al parecer hay un bug donde en algunos casos la cantidad abonada o total de una remision se guarda como un string.</li>
				<li>~ Poner Slugs en clientes; Poner tanto codigo como nombre en los input [Cod - Nombre.]</li>
				<li>~ "Levantado en Piso" como opcion por default en remisones para la Obra.</li>
				<li>~ Compactar Diseño de la lista de productos.</li>
				<li>~ Desglosar precio subtotal de cada producto en materiales al agregar Remisión.</li>
				<li>~ Checkbox de IVA en agregar remision.</li>
				<li>~ Poner Opcion de Chofer/Fletero y Vendedor en Remision.</li>
				<li>~ CRUD de Vendedores.</li>
				<li>~ CRUD de chofer/Fletes.</li>
				<li>~ Poder elegir periodo de tiempo en estado de cuenta.</li>
				<li>~ Desglosar lista de productos en Ver Remisión en vez de mostrar solo el array.</li>
				<li>~ Dar formato a Fecha en Ver Remisión.</li>
				<li>~ Agregar botón de editar en pantallas de Ver Documento.</li>
				<li>~ Modificar productos en database; Agregar familia a los productos.</li>
			</ol>
		</section>

		<section class="p-2 hover:bg-slate-200">
			<h4 class="font-bold">CRUD</h4>
			<hr>

			<article class="flex flex-wrap gap-4 justify-between">
				<div>
					<h6 class="font-bold">Usuarios</h6>
					<ol class="text-xs">
						<li><span class="text-green-600">✓ - </span>Detalles</li>
						<li><span class="text-green-600">✓ - </span>Crear</li>
						<li><span class="text-green-600">✓ - </span>Ver</li>
						<li><span class="text-green-600">✓ - </span>Modificar</li>
						<li><span class="text-green-600">✓ - </span>Eliminar</li>
					</ol>
				</div>

				<div>
					<h6 class="font-bold">Clientes</h6>
					<ol class="text-xs">
						<li><span class="text-green-600">✓ - </span>Detalles</li>
						<li><span class="text-green-600">✓ - </span>Crear</li>
						<li><span class="text-green-600">✓ - </span>Ver</li>
						<li><span class="text-green-600">✓ - </span>Modificar</li>
						<li><span class="text-green-600">✓ - </span>Eliminar</li>
					</ol>
				</div>

				<div>
					<h6 class="font-bold">Proveedores</h6>
					<ol class="text-xs">
						<li><span class="text-green-600">✓ - </span>Crear</li>
						<li><span class="text-green-600">✓ - </span>Ver</li>
						<li><span class="text-green-600">✓ - </span>Modificar</li>
						<li><span class="text-green-600">✓ - </span>Eliminar</li>
						<li><span class="text-green-600">✓ - </span>Detalles</li>
					</ol>
				</div>

				<div>
					<h6 class="font-bold">Familias Productos</h6>
					<ol class="text-xs">
						<li><span class="text-green-600">✓ - </span>Detalles</li>
						<li><span class="text-green-600">✓ - </span>Crear</li>
						<li><span class="text-green-600">✓ - </span>Ver</li>
						<li><span class="text-green-600">✓ - </span>Modificar</li>
						<li><span class="text-green-600">✓ - </span>Eliminar</li>
					</ol>
				</div>

				<div>
					<h6 class="font-bold">Productos</h6>
					<ol class="text-xs">
						<li><span class="text-green-600">✓ - </span>Crear</li>
						<li><span class="text-green-600">✓ - </span>Ver</li>
						<li><span class="text-green-600">✓ - </span>Modificar</li>
						<li><span class="text-green-600">✓ - </span>Eliminar</li>
						<li><span class="text-green-600">✓ - </span>Detalles</li>
					</ol>
				</div>

				<div>
					<h6 class="font-bold">Remisiones</h6>
					<ol class="text-xs">
						<li><span class="text-green-600">✓ - </span>Crear.</li>
						<li><span class="text-green-600">✓ - </span>Ver</li>
						<li>Modificar</li>
						<li><span class="text-green-600">✓ - </span>Eliminar</li>
						<li><span class="text-green-600">✓ - </span>Detalles</li>
					</ol>
				</div>

				<div>
					<h6 class="font-bold">Sucursales</h6>
					<ol class="text-xs">
						<li><span class="text-green-600">✓ - </span>Crear.</li>
						<li><span class="text-green-600">✓ - </span>Ver</li>
						<li><span class="text-green-600">✓ - </span>Modificar</li>
						<li><span class="text-green-600">✓ - </span>Eliminar</li>
						<li><span class="text-green-600">✓ - </span>Detalles</li>
					</ol>
				</div>

				<div>
					<h6 class="font-bold">Vehiculos</h6>
					<ol class="text-xs">
						<li><span class="text-green-600">✓ - </span>Crear.</li>
						<li><span class="text-green-600">✓ - </span>Ver</li>
						<li><span class="text-green-600">✓ - </span>Modificar</li>
						<li><span class="text-green-600">✓ - </span>Eliminar</li>
						<li><span class="text-green-600">✓ - </span>Detalles</li>
					</ol>
				</div>

				<div>
					<h6 class="font-bold">Arqueos</h6>
					<ol class="text-xs">
						<li><span class="text-green-600">✓ - </span>Crear.</li>
						<li><span class="text-green-600">✓ - </span>Ver</li>
						<li><span class="text-green-600">✓ - </span>Modificar</li>
						<li><span class="text-green-600">✓ - </span>Eliminar</li>
						<li><span class="text-green-600">✓ - </span>Detalles</li>
					</ol>
				</div>

				<div>
					<h6 class="font-bold">Abonos</h6>
					<ol class="text-xs">
						<li><span class="text-green-600">✓ - </span>Crear.</li>
						<li><span class="text-green-600">✓ - </span>Ver</li>
						<li><span class="text-green-600">✓ - </span>Modificar</li>
						<li><span class="text-green-600">✓ - </span>Eliminar</li>
						<li><span class="text-green-600">✓ - </span>Detalles</li>
					</ol>
				</div>
			</article>
		</section>

		<section class="p-2 hover:bg-slate-200">
			<h4 class="font-bold">Backlog</h4>

			<section class="p-2 hover:bg-slate-200">	
				<h4 class="font-bold">31/08/2024</h4>
				<ol class="text-xs">
					<li>~ Reemplazo de Links por componentes de Boton <i>AddNew</i> en todos los tipos de documentos.</li>
					<li>~ Realizadas pruebas en Paginas index de todos los documentos.</li>
					<li>~ Cambiar el id de los documentos en la BD para normalizar el tipo de numeración</li>
					<li>~ Dar formato a 0´s a la izquierda en numeraciones de las tablas [UI/UX]</li>
					<li>~ Utils para consultas a BD.</li>
					<li>~ mostrar Hora de arqueo en index</li>
					<li>~ Utils para arqueos</li>
					<li>~ Mostrar bien el formato de la fecha en arqueos</li>
					<li>~ API local de productos y clientes</li>
					<li>~ Agregar boton para ver estado de cuenta en tabla de clientes.</li>
					<li>~ mostrar nombre del cliente en remisiones en index</li>
					<li>~ Hacer ejemplo de estado de cuenta de un cliente/Proveedor</li>
					<li>~ Mostrar total de la remision antes de crearlo.</li>
					<li>~ En remisiones al momento de guardar materiales guarda el nombre del producto en vez de su id para referencia</li>
					<li>~ Agregar 0´s a la izquierda en remisiones al agregar si es un id personalizado.</li>
					<li>~ CRUD Abonos</li>
					<li>~ Abono deberia guardar el id del cliente y no su nombre.</li>
					<li>~ El input de cliente en abonos deberia ser un v-autocomplete</li>
					<li>~ Pagina de estado de cuenta.</li>
					<li>~ Agregar campo de informacion adicional para detalles en abonos.</li>
					<li>~ Opción de abonar todo o una cantidad parcial al momento de crear Remisiones</li>
				</ol>
			</section>
		</section>
	</section>
</template>

<script setup>
	import { db } from '~/utils/firebase';
	import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';

	let { data: api_clientes } = await useFetch('/api/clientes');

	useHead({
		title: 'Bloquera GDL'
	});


	const arreglarIds = async () => {
		console.log('Función para arreglar Ids de documentos llamada');

		const documento = 'clientes';
		
		try {
			let abonos = await fetchDataByCollection(documento);
			console.log('Abonos obtenidos:', abonos);
			let contador = 1;
			for (const abono of abonos) {
				// Convertir el ID a un número, agregar ceros a la izquierda y convertir de nuevo a string
				const newId = padWithZeros(contador, 6);
				const viejo_id = abono.id;
				console.log('Nuevo ID:', newId);

				// Crear un nuevo documento con el ID ajustado
				abono.id = newId;
				const newDocRef = doc(db, documento, newId);
				await setDoc(newDocRef, abono);

				// Eliminar el documento original si es necesario
				const oldDocRef = doc(db, documento, viejo_id);
				await deleteDoc(oldDocRef);

				console.log(`Documento con ID ${viejo_id} renombrado a ${newId}`);
				contador++;
			}

		} catch (error) {
			console.error('Error al arreglar los IDs:', error);
		}
	};
</script>