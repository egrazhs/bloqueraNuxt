<template>
	<article class="bg-blue-800 text-white flex flex-col justify-between">
		<div>
			<NuxtLink to="./" name="opcion_menu" data-for="vista_inicio" >
				<div class="py-2 px-2 md:px-8 hover:bg-blue-600 bg-yellow-400 hover:bg-yellow-400 cursor-pointer flex items-center">
					<img src="~/assets/images/heroicons/clipboard.svg" class="w-5 h-5" draggable="false" />
					<span class="text-xs md:text-sm ml-1">Inicio</span>
				</div>
			</NuxtLink>

			<NuxtLink to="./usuarios" name="opcion_menu" data-for="vista_usuarios">
				<div class="py-2 px-2 md:px-8 hover:bg-blue-600 cursor-pointer flex items-center">
					<img src="~/assets/images/heroicons/user.svg" class="w-5 h-5" draggable="false" />
					<span class="text-xs md:text-sm ml-1">Usuarios</span>
				</div>
			</NuxtLink>

            <NavItem to="/" imgSource="clipboard.svg" text="Inicio" />
            <NavItem to="/" imgSource="user.svg" text="Inicio" />
            <NavItem to="/" imgSource="clipboard.svg" text="Inicio" />
            <NavItem to="/" imgSource="clipboard.svg" text="Inicqwwwio" />
            <NavItem to="/" imgSource="clipboard.svg" text="Inicio" />
            <NavItem to="/" imgSource="clipboard.svg" text="Inicio" />
		</div>

		<div>
			<div id="cerrar_sesion" class="py-4 px-2 md:px-8 hover:bg-blue-600 cursor-pointer flex items-center">
                <img src="~/assets/images/heroicons/arrow-right-on-rectangle.svg" class="w-6 h-6" draggable="false">
                <span class="text-xs ml-1"> Cerrar Sesión</span>
            </div>
		</div>
	</article>
</template>
<!--
article(c)
            div
                div(name="opcion_menu", data-for="vista_inicio", class="py-2 px-2 md:px-8 hover:bg-blue-600 bg-yellow-400 hover:bg-yellow-400 cursor-pointer flex items-center")
                    img(src="img/heroicons/clipboard.svg", class="w-5 h-5", draggable="false")
                    span(class="text-xs md:text-sm ml-1") Inicio
                div(name="opcion_menu", data-for="vista_usuarios", class="py-2 px-2 md:px-8 hover:bg-blue-600 cursor-pointer flex items-center")
                    img(src="img/heroicons/user.svg", class="w-5 h-5", draggable="false")
                    span(class="text-xs md:text-sm ml-1") Usuarios
                div(name="opcion_menu", data-for="vista_clientes", class="py-2 px-2 md:px-8 hover:bg-blue-600 cursor-pointer flex items-center")
                    img(src="img/heroicons/user-group.svg", class="w-5 h-5", draggable="false")
                    span(class="text-xs md:text-sm ml-1") Clientes
                div(name="opcion_menu", data-for="vista_proveedores", class="py-2 px-2 md:px-8 hover:bg-blue-600 cursor-pointer flex items-center")
                    img(src="img/heroicons/briefcase.svg", class="w-5 h-5", draggable="false")
                    span(class="text-xs md:text-sm ml-1") Proveedores
                div(name="opcion_menu", data-for="vista_vehiculos", class="py-2 px-2 md:px-8 hover:bg-blue-600 cursor-pointer flex items-center")
                    img(src="img/heroicons/truck.svg", class="w-5 h-5", draggable="false")
                    span(class="text-xs md:text-sm ml-1") Vehículos
                div(name="opcion_menu", data-for="vista_productos", class="py-2 px-2 md:px-8 hover:bg-blue-600 cursor-pointer flex items-center")
                    img(src="img/heroicons/cog.svg", class="w-5 h-5", draggable="false")
                    span(class="text-xs md:text-sm ml-1") Productos
                div(name="opcion_menu", data-for="vista_sucursales", class="py-2 px-2 md:px-8 hover:bg-blue-600 cursor-pointer flex items-center")
                    img(src="img/heroicons/building-storefront.svg", class="w-5 h-5", draggable="false")
                    span(class="text-xs md:text-sm ml-1") Sucursales
                div(name="opcion_menu", data-for="vista_inventario", class="py-2 px-2 md:px-8 hover:bg-blue-600 cursor-pointer flex items-center")
                    img(src="img/heroicons/presentation-chart.svg", class="w-5 h-5", draggable="false")
                div(name="opcion_menu", data-for="vista_arqueos", class="py-2 px-2 md:px-8 hover:bg-blue-600 cursor-pointer flex items-center")
                    img(src="img/heroicons/currency-dollar.svg", class="w-5 h-5", draggable="false")
                    span(class="text-xs md:text-sm ml-1") Arqueos
                div(name="opcion_menu", data-for="vista_remisiones", class="py-2 px-2 md:px-8 hover:bg-blue-600 cursor-pointer flex items-center")
                    img(src="img/heroicons/banknote.svg", class="w-5 h-5", draggable="false")
                    span(class="text-xs md:text-sm ml-1") Remisiones
                div(name="opcion_menu", data-for="vista_ejemplo", class="py-2 px-2 md:px-8 hover:bg-blue-600 cursor-pointer flex items-center")
                    img(src="img/heroicons/window.svg", class="w-5 h-5", draggable="false")
                    span(class="text-xs md:text-sm ml-1") Ejemplo E.C.
            div
                div(id="cerrar_sesion", class="py-4 px-2 md:px-8 hover:bg-blue-600 cursor-pointer flex items-center")
                    img(src="img/heroicons/arrow-right-on-rectangle.svg", class="w-6 h-6", draggable="false")
                    span(class="text-xs ml-1") Cerrar Sesión
-->