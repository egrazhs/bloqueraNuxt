<template>
	<section id="vista_inicio" name="vista">
		<h1 class="font-bold text-4xl">Inicio</h1>
		<hr>

		<section class="p-2 hover:bg-slate-200">
			<h4 class="font-bold">Ultimos cambios agregados</h4>
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
			</ol>
		</section>

		<section class="p-2 hover:bg-slate-200">
			<h4 class="font-bold">To Do:</h4>
			<ol class="text-xs">
				<li>~ Barras de búsqueda en documentos</li>
				<li>~ Paginar documentos en donde haya mas de 10 en una pagina.</li>
				<li>~ Subir página a dominio de prueba.</li>
				<li>~ Manejo de sesión de usuarios.</li>
				<li>~ Mostrar nombre de usuario conectado en el panel de admin.</li>
				<li>~ Inventario.</li>
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
						<li>Crear.</li>
						<li>Ver</li>
						<li>Modificar</li>
						<li>Eliminar</li>
						<li>Detalles</li>
					</ol>
				</div>
			</article>
		</section>
	</section>
</template>

<script setup>
	import { db } from '~/utils/firebase';
	import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';

	let {data} = await useFetch('/api/clientes');

	useHead({
		title: 'Bloquera GDL'
	});

	// Función para agregar padding a un número
	const padWithZeros = (num, length) => {
	    return num.toString().padStart(length, "0");
	};


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