<template>
    <v-layout>
        <!-- Barra de navegación superior -->
        <v-app-bar color="primary" app>
            <v-app-bar-nav-icon :icon="drawer ? 'mdi-close' : 'mdi-menu'" variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>
                <img src="/images/logo_blanco_transparente.png" class="w-20">
                <!--<span>Bloquera Guadalajara</span>-->
            </v-toolbar-title>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" class="custom-scroll" color="primary" temporary app>
            <v-list v-model:opened="open">
                <v-list-item prepend-icon="mdi-home" title="Inicio" @click="goToPage('/')" :class="{ 'bg-yellow': router.currentRoute.value.path === '/' }" nav></v-list-item>

               <v-list-group v-model="openGroup" value="Administración" @click="toggleGroup('Administración')">
                    <template v-slot:activator="{ props }">
                        <v-list-item
                            v-bind="props"
                            prepend-icon="mdi-office-building"
                            title="Administración"
                            density="compact"
                            nav
                        ></v-list-item>
                    </template>
                    <v-list-item prepend-icon="mdi-account" title="Usuarios" @click="goToPage('/usuarios')" :class="{ 'bg-yellow': router.currentRoute.value.path === '/usuarios' }" nav></v-list-item>
                    <v-list-item prepend-icon="mdi-account-group" title="Trabajadores" @click="goToPage('/trabajadores')" :class="{ 'bg-yellow': router.currentRoute.value.path === '/trabajadores' }" nav></v-list-item>
                    <v-list-item prepend-icon="mdi-cube" title="Productos" @click="goToPage('/productos')" :class="{ 'bg-yellow': router.currentRoute.value.path === '/productos' }" nav></v-list-item>
                    <v-list-item prepend-icon="mdi-cube-outline" title="Fam. Productos" @click="goToPage('/familias_productos')" :class="{ 'bg-yellow': router.currentRoute.value.path === '/familias_productos' }" nav></v-list-item>
                    <v-list-item prepend-icon="mdi-briefcase-account" title="Clientes" @click="goToPage('/clientes')" :class="{ 'bg-yellow': router.currentRoute.value.path === '/clientes' }" nav></v-list-item>
                    <v-list-item prepend-icon="mdi-truck" title="Proveedores" @click="goToPage('/proveedores')" :class="{ 'bg-yellow': router.currentRoute.value.path === '/proveedores' }" nav></v-list-item>
                </v-list-group>

                <v-list-group v-model="openGroup" value="Finanzas" @click:open="toggleGroup('Finanzas')">
                    <template v-slot:activator="{ props }">
                        <v-list-item
                            v-bind="props"
                            prepend-icon="mdi-currency-usd"
                            title="Finanzas"
                            density="compact"
                            nav
                        ></v-list-item>
                    </template>
                    <v-list-item prepend-icon="mdi-cash-multiple" title="Lista de Precios" @click="goToPage('/lista_precios')" :class="{ 'bg-yellow': router.currentRoute.value.path === '/lista_precios' }" nav></v-list-item>
                </v-list-group>

                <v-list-group v-model="openGroup" value="Operación" @click:open="toggleGroup('Operación')">
                    <template v-slot:activator="{ props }">
                        <v-list-item
                            v-bind="props"
                            prepend-icon='mdi-factory'
                            title="Operación"
                            density="compact"
                            nav
                        ></v-list-item>
                    </template>
                    <v-list-item prepend-icon="mdi-wallet" title="Remisiones" @click="goToPage('/remisiones')" :class="{ 'bg-yellow': router.currentRoute.value.path === '/remisiones' }" nav></v-list-item>
                </v-list-group>

                <v-list-group v-model="openGroup" value="Control" @click:open="toggleGroup('Control')">
                    <template v-slot:activator="{ props }">
                        <v-list-item
                            v-bind="props"
                            prepend-icon='mdi-shield-check'
                            title="Control"
                            density="compact"
                            nav
                        ></v-list-item>
                    </template>
                    <v-list-item prepend-icon="mdi-wallet" title="Formas de pago" @click="goToPage('/formas_de_pago')" :class="{ 'bg-yellow': router.currentRoute.value.path === '/formas_de_pago' }" nav></v-list-item>
                    <v-list-item prepend-icon="mdi-wallet" title="Inventario" @click="goToPage('/inventario')" :class="{ 'bg-yellow': router.currentRoute.value.path === '/inventario' }" nav></v-list-item>
                </v-list-group>

                <v-list-group v-model="openGroup" value="Ejemplos" @click:open="toggleGroup('Ejemplos')">
                    <template v-slot:activator="{ props }">
                        <v-list-item
                            v-bind="props"
                            prepend-icon='mdi-shield-check'
                            title="Ejemplos"
                            density="compact"
                            nav
                        ></v-list-item>
                    </template>
                    <v-list-item prepend-icon="mdi-wallet" title="Estado de Cuenta" @click="goToPage('/ejemplo')" :class="{ 'bg-yellow': router.currentRoute.value.path === '/ejemplo' }" nav></v-list-item>
                    <v-list-item prepend-icon="mdi-wallet" title="Remision" @click="goToPage('/ejemplo/remision')" :class="{ 'bg-yellow': router.currentRoute.value.path === '/ejemplo/remision' }" nav></v-list-item>
                </v-list-group>
            </v-list>

            <!-- Botón de Logout al final -->
            <!--
            <template v-slot:append>
                <div class="pa-2">
                    <v-btn block @click="logout">Logout</v-btn>
                </div>
            </template>
            -->
        </v-navigation-drawer>


        <!-- Contenido principal -->
        <v-main class="scroll-content">
            <v-container>
                <slot></slot>
            </v-container>
        </v-main>
    </v-layout>
</template>


<script setup>
import { useRouter } from 'vue-router';

// Estado reactivo para controlar la apertura del drawer
const drawer = ref(false);
const open = ref([]);
const openGroup = ref(''); // Controla qué grupo está abierto
const router = useRouter();

// Función para manejar la navegación a una subcategoría
const goToPage = (link) => {
  if (router.currentRoute.value.path !== link) {
    router.push(link);
  }
};

const toggleGroup = (group) => {
    openGroup.value = openGroup.value === group ? '' : group;
};

// Función para hacer logout
const logout = () => {
  // Lógica para cerrar sesión
  //console.log("Logout");
};
</script>




<style scoped>
    .scroll-content {
        height: 100vh;
        overflow-y: auto;
    }

    .custom-scroll {
        overflow-y: auto;
        scrollbar-width: thin; /* Para navegadores que soporten esta propiedad */
        scrollbar-color: rgba(255, 255, 255, 0.3) transparent; /* Color de la barra */
    }

    .custom-scroll::-webkit-scrollbar {
        width: 8px;
    }

    .custom-scroll::-webkit-scrollbar-track {
        background: transparent;
    }

    .custom-scroll::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 10px;
    }
</style>