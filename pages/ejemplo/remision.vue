<template>
	<h1 class="font-bold text-2xl">Ejemplo de Remisión</h1>

	<section id="remision" class="uppercase">
		<article class="flex flex-wrap w-full text-xs mb-4">
			<div class="flex border-2 border-blue-600 font-bold flex-grow">
				<h3 class="w-1/2 bg-yellow-500 text-white p-2">STATUS</h3>
				<h3 class="w-1/2 p-2 text-red-600">PAGADO</h3>
			</div>

			<div class="flex border-2 border-blue-600 font-bold flex-grow">
				<h3 class="w-1/2 bg-yellow-500 text-white p-2">VENDEDOR</h3>
				<h3 class="w-1/2 p-2 text-red-600">V</h3>
			</div>

			<div class="flex border-2 border-blue-600 font-bold flex-grow">
				<h3 class="w-1/2 bg-yellow-500 text-white p-2">SUCURSAL</h3>
				<h3 class="w-1/2 p-2 text-red-600">SL</h3>
			</div>
		</article>

		<article class="flex flex-wrap justify-end">	
			<div class="flex w-1/3 border-2 border-blue-600 font-bold">
				<h3 class="w-1/2 bg-yellow-500 text-white p-2">REMISIÓN</h3>
				<h3 class="w-1/2 p-2 text-red-600">12438</h3>
			</div>
		</article>

		<article class="flex flex-wrap my-4">
			<div class="font-bold border-2 border-blue-600 flex-grow mr-4 p-4">
				<h3 name="cliente">Ramón Alvarado</h3>
				<h3>Levantado en Piso</h3>
				<h3 name="Sucursal">SANTA LUCÍA</h3>
			</div>

			<div class="font-bold border-2 border-blue-600 w-1/3">
				<table class="w-full">
					<thead class="bg-yellow-500 text-white font-bold">
						<td class="text-center py-2">FECHA DE ENTREGA</td>
					</thead>
					<tbody>
						<td class="text-center">09-SEP-2024</td>
					</tbody>
				</table>
			</div>
		</article>
		
		<article>
			<table class="border-2 border-blue-600 w-full min-h-40">
				<thead class="bg-yellow-500 text-white font-bold">
					<td class="text-center">CÓDIGO</td>
					<td class="text-center">CANTIDAD</td>
					<td class="text-center">DESCRIPCIÓN</td>
					<td class="text-center">PRECIO UNIT.</td>
					<td class="text-center">IMPORTE</td>
				</thead>
				<tbody class="font-bold">
					<tr>
						<td class="text-center border-left-2">11R40</td>
						<td class="text-center">1,000</td>
						<td class="text-center">TABICÓN 11X14X28</td>
						<td class="text-center">$4.15</td>
						<td class="text-center">$4,150.00</td>
					</tr>
				</tbody>
			</table>
		</article>
		
		<article class="flex flex-wrap justify-end my-4">
			<div class="font-bold border-2 border-blue-600 px-6 py-2 w-1/3">
				<h3 class="flex"><span class="text-red-600 w-1/2 text-right">VENTA TOTAL:</span> <span class="text-green-800 pl-2">$4,150.00</span></h3>
				<h3 class="flex"><span class="text-red-600 w-1/2 text-right">ANTICIPO:</span> <span class="text-green-800 pl-2"></span></h3>
				<h3 class="flex"><span class="text-red-600 w-1/2 text-right">VENTA TOTAL:</span> <span class="text-green-800 pl-2">$4,150.00</span></h3>
			</div>
		</article>
	</section>
</template>