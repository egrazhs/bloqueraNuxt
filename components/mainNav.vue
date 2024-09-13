<template>
	<article class="bg-blue-800 text-white flex flex-col justify-between">
		<div>
            <NavItem to="/" imgSource="/images/heroicons/clipboard.svg" text="Inicio" />
            <NavItem to="/usuarios" imgSource="/images/heroicons/user.svg" text="Usuarios" />
            <NavItem to="/trabajadores" imgSource="/images/heroicons/user-group.svg" text="Trabajadores" />
            <NavItem to="/clientes" imgSource="/images/heroicons/user-group.svg" text="Clientes" />
            <NavItem to="/proveedores" imgSource="/images/heroicons/briefcase.svg" text="Proveedores" />
            <NavItem to="/familias_productos" imgSource="/images/heroicons/cog.svg" text="Familias Productos" />
            <NavItem to="/productos" imgSource="/images/heroicons/cog.svg" text="Productos" />
            <NavItem to="/formas_de_pago" imgSource="/images/heroicons/cog.svg" text="Formas de Pago" />
            <!--<NavItem to="/vehiculos" imgSource="/images/heroicons/truck.svg" text="Vehiculos" />-->
            <!--<NavItem to="/sucursales" imgSource="/images/heroicons/building-storefront.svg" text="Sucursales" />-->
            <!--<NavItem to="/arqueos" imgSource="/images/heroicons/presentation-chart.svg" text="Arqueos" />-->
            <!--<NavItem to="/remisiones" imgSource="/images/heroicons/banknote.svg" text="Remisiones" />-->
            <!--<NavItem to="/abonos" imgSource="/images/heroicons/banknote.svg" text="Abonos" />-->
            <!--<NavItem to="/ejemplo" imgSource="/images/heroicons/window.svg" text="Ejemplo de E.C." />-->
        </div>

		<div>
			<div id="cerrar_sesion" class="py-4 px-2 md:px-8 hover:bg-blue-600 cursor-pointer flex items-center">
                <img src="/images/heroicons/arrow-right-on-rectangle.svg" class="w-6 h-6" draggable="false">
                <span class="text-xs ml-1"> Cerrar Sesión</span>
            </div>
		</div>
	</article>
</template>