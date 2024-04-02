<template>
	<section id="vista_inicio" name="vista">
		<h1 class="font-bold text-4xl">Inicio</h1>
		<hr>
		<section class="p-2 hover:bg-slate-200">
			<h4 class="font-bold">Reporte de Inventario</h4>
			<p class="text-sm">Lorem ipsum dolor sit amet porro.</p>
		</section>

		<section class="p-2 hover:bg-slate-200">
			<h4 class="font-bold">Novedades y Actualizaciones</h4>
			<ol class="text-xs">
				<li>Se agregó la categorias de Productos.</li>
				<li>Se modificó el Alias del usuario <span class="italic underline">Erick</span></li>
				<li>Se cambió la sucursal <span>Tlajomulco</span></li>
			</ol>
		</section>
	</section>
</template>
<!--
section(id="vista_inicio", name="vista")
    h1() Inicio
    hr
    section(class="p-2 hover:bg-slate-200")
        h4(class="font-bold") Reporte de inventario
        p(class="text-sm") Lorem ipsum dolor sit amet porro.
    section(class="p-2 hover:bg-slate-200")
        h4(class="font-bold") Novedades y actualizaciones
        ol(class="text-xs")
            li - 
            li - Se agregó el vehículo 
                span(class="italic underline") Estaquitas
                | .
            li - Se modificó el Alias del usuario 
                span(class="italic underline") Erick
                | .
            li - Se cambió la dirección a la sucursal 
                span(class="italic underline") Tlajomulco
                | .
    section(class="hidden")
        h6(class="font-bold text-2xl my-2") Acciones de desarollador:
        button(id="btn_cambiar_ids", class="bg-yellow-600 hover:bg-yellow-800 text-white p-4") Cambiar las ID´s por numeros incrementables-->