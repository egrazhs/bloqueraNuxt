<template>
	<section id="vista_inicio" name="vista">
		<h1 class="font-bold text-4xl">Inicio</h1>
		<hr>

		<section class="p-2 hover:bg-slate-200">	
			<h4 class="font-bold">Ultimos cambios agregados:</h4>
			<ol class="text-xs">
				<li>~ Agregar propiedad de dias de monto de credito. [7, 15 , 21, 30]</li>
				<li>~ Cambiados estilos  funcionalidad de la barra de navegación</li>
				<li>~ Tabla de Proveedores ya se puede ordenar por orden alfabetico o numerico</li>
				<li>~ Tabla de Proveedores ya se puede elegir que propiedades mostrar o quitar.</li>
				<li>~ Agregadas propiedades nuevas a documentos productos, para completar la lista de precios.</li>
				<li>~ Agregar propiedades de tarima y torton en productos.</li>
				<li>~ Lista de Precios de productos.</li>
				<li>~ Agregar Precio en productos (Recogido en planta).</li>
				<li>~ Agregar Lista de Precios en main Nav</li>
				<li>~ Solucionado problema que guardaba los los precios de los productos sin los centavos.</li>
				<li>~ Agregado iconos en el layout del menu de navegación. (Paquete MDI)</li>
				<li>~ Agregar botón de editar en pantallas de Ver Documento.</li>
			</ol>
		</section>

		<section class="p-2 hover:bg-slate-200">
			<h4 class="font-bold">To Do:</h4>
			<ol class="text-xs">
				<li>~ Inventario.</li>
				<li>~ Modificar el precio unitario de un producto al elegir nuevo en remisiones.</li>
				<li>~ "Levantado en Piso" como opcion por default en remisones para la Obra.</li>
				<li>~ Desglosar precio subtotal de cada producto en materiales al agregar Remisión.</li>
				<li>~ Checkbox de IVA en agregar remision.</li>
				<li>~ Poder elegir periodo de tiempo en estado de cuenta.</li>
				<li>~ Listar/Mostrar productos de esa familia de productos</li>
				<li>~ Poner chofer al lado de sucursal en ver remisiones.</li>
				<li>~ Poner Cantidad a pagar a chofer [en las remisiones]</li>
				<li>~ Agregar la forma de pago al ejemplo de remisiones.</li>
				<li>~ Guardar comision de pago a vendedores en remisiones (no es visible en detalles de la remision).</li>
				<li>~ Opcion para ordenar tablas.</li>
				<li>~ En Familia de produtos, mostrar los productos de esa familia en Ver Mas</li>
				<li>~ Mandar a poder agregar producto en esa familia.</li>
			</ol>
		</section>

		<section class="p-2 hover:bg-slate-200">
			<h4 class="font-bold">CRUD</h4>
			<hr>

			<article class="flex flex-wrap gap-4">
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
					<h6 class="font-bold">Trabajadores</h6>
					<ol class="text-xs">
						<li><span class="text-green-600">✓ - </span>Crear</li>
						<li><span class="text-green-600">✓ - </span>Ver</li>
						<li><span class="text-green-600">✓ - </span>Modificar</li>
						<li><span class="text-green-600">✓ - </span>Eliminar</li>
						<li><span class="text-green-600">✓ - </span>Detalles</li>
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
						<li><span class="text-green-600">✓ - </span>Detalles</li>
						<li><span class="text-green-600">✓ - </span>Crear</li>
						<li><span class="text-green-600">✓ - </span>Ver</li>
						<li><span class="text-green-600">✓ - </span>Modificar</li>
						<li><span class="text-green-600">✓ - </span>Eliminar</li>
					</ol>
				</div>

				<div>
					<h6 class="font-bold">Formas de Pago</h6>
					<ol class="text-xs">
						<li><span class="text-green-600">✓ - </span>Detalles</li>
						<li><span class="text-green-600">✓ - </span>Crear</li>
						<li><span class="text-green-600">✓ - </span>Ver</li>
						<li><span class="text-green-600">✓ - </span>Modificar</li>
						<li><span class="text-green-600">✓ - </span>Eliminar</li>
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

				<div>
					<h6 class="font-bold">Moldes</h6>
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

		<section class="p-2 hover:bg-slate-200">
			<h4 class="font-bold">Backlog</h4>

			<section class="p-2 hover:bg-slate-200">
				<h4 class="font-bold">19/09/2024</h4>
				<ol class="text-xs">
					<li>~ Ya se muestra nombre del cliente en Ver remisión en vez del id.</li>
					<li>~ Agregar CRUD de Familias de productos.</li>
					<li>~ Modificar productos en database; Agregar familia a los productos.</li>
					<li>~ Agregar CRUD de Trabajadores.</li>
					<li>~ Actualizado CRUD de Productos.</li>
					<li>~ Agregar Boton de ver estado de cuenta en Ver Cliente.</li>
					<li>~ Listo CRUD de proveedores adhoc al excel.</li>
					<li>~ Quitar documentos del main nav que no esten utilizando al momento.</li>
					<li>~ Poner Slugs en clientes; Poner tanto codigo como nombre en los input [Cod - Nombre.]</li>
					<li>~ [SOLUCIONADO] Al parecer hay un bug donde en algunos casos la cantidad abonada o total de una remision se guarda como un string.</li>
					<li>~ CRUD de Trabajadores.</li>
					<li>~ CRUD de clientes de acuerdo al excel</li>
					<li>~ CRUD de Formas de pago</li>
					<li>~ Agregar propiedad de Rabon (tarima *7) y Torton (Tarima *10) en productos.</li>
					<li>~ Hacer vista de remisiones.</li>
				</ol>

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