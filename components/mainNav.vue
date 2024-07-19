<template>
	<article class="bg-blue-800 text-white flex flex-col justify-between">
		<div>
            <NavItem to="/" imgSource="clipboard.svg" text="Inicio" />
            <NavItem to="/usuarios" imgSource="user.svg" text="Usuarios" />
            <NavItem to="/clientes" imgSource="user-group.svg" text="Clientes" />
            <NavItem to="/proveedores" imgSource="briefcase.svg" text="Proveedores" />
            <NavItem to="/vehiculos" imgSource="truck.svg" text="Vehiculos" />
            <NavItem to="/productos" imgSource="cog.svg" text="Productos" />
            <NavItem to="/sucursales" imgSource="building-storefront.svg" text="Sucursales" />
            <NavItem to="/arqueos" imgSource="presentation-chart.svg" text="Arqueos" />
            <NavItem to="/remisiones" imgSource="banknote.svg" text="Remisiones" />
            <NavItem to="/abonos" imgSource="banknote.svg" text="Abonos" />
            <NavItem to="/ejemplo" imgSource="window.svg" text="Ejemplo de E.C." />		
        </div>

		<div>
			<div id="cerrar_sesion" class="py-4 px-2 md:px-8 hover:bg-blue-600 cursor-pointer flex items-center">
                <img src="~/assets/images/heroicons/arrow-right-on-rectangle.svg" class="w-6 h-6" draggable="false">
                <span class="text-xs ml-1"> Cerrar Sesión</span>
            </div>
		</div>
	</article>
</template>