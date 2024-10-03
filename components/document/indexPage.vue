<template>
    <ScreensLoading v-if="loading" />
    
    <div v-else>    
        <section>
            <h1 class="font-bold text-4xl">{{ documentTitle }}</h1>

            <div class="mt-4">
                <ButtonsAddNew :route="`${baseRoute}/create`" :text="singularDocumentTitle" />
            </div>

            <hr class="border-1 border-slate-300 my-4">

            <section>
                <!-- Mensaje de éxito -->
                <div v-if="$route.query.c" class="transition-opacity bg-blue-200 text-blue-800 text-xs p-2 italic my-2">
                    *Se ha agregado {{ singularDocumentTitle }} de manera exitosa.
                </div>

                <div v-if="$route.query.documentoActualizado" class="transition-opacity bg-yellow-200 text-yellow-800 text-xs p-2 italic my-2">
                    *Se ha actualizado la información del {{ singularDocumentTitle }}.
                </div>

                <div v-if="documento_eliminado" class="transition-opacity bg-red-200 text-red-800 text-xs p-2 italic my-2">
                    *Se ha borrado el {{ singularDocumentTitle }} de manera exitosa.
                </div>

                <!-- Mensaje de error -->
                <div v-if="error" class="transition-opacity bg-red-200 text-red-800 text-xs p-2 italic my-2">
                    {{ error }}
                </div>
            </section>
        </section>

        

        <article>
            <v-menu transition="scale-transition">
                <template v-slot:activator="{ props }">
                    <v-btn icon v-bind="props" class="mb-4">
                        <v-icon>mdi-cog</v-icon>
                    </v-btn>
                </template>
                <!-- Contenido del menú: opciones de propiedades a mostrar -->
                <v-list density="compact">
                    <v-list-item v-for="field in documentFields" :key="field.key" density="compact" class="py-0">
                        <v-checkbox
                            v-model="field.show"
                            :label="field.label"
                            density="compact"
                        ></v-checkbox>
                    </v-list-item>
                </v-list>
            </v-menu>

            <table class="w-full text-xs table-auto">
                <thead class="font-bold text-sm">
                    <tr>
                        <th @click="sortBy('id')" class="pl-2 cursor-pointer whitespace-nowrap">
                            <span> ID </span>
                            <v-icon small class="ml-1">mdi-swap-vertical</v-icon>
                        </th>
                        <!--Aqui los Nombre de las propiedades en la tabla-->
                        <th v-for="field in documentFields" :key="field.key" @click="sortBy(field.key)" v-show="field.show" class="pl-2 cursor-pointer whitespace-nowrap">
                            <span>{{ field.label }}</span>
                            <v-icon small class="ml-1">mdi-swap-vertical</v-icon>
                        </th>

                        
                        <th class="whitespace-nowrap">Acciones</th>
                    </tr>
                </thead>
                <tbody class="border-1 border-black pl-2">
                    <tr v-for="document in sortedDocuments" :key="document.id" :data-key="document.id" class="odd:bg-slate-200 even:bg-slate-50 hover:bg-slate-300">
                        <td class="pl-2 truncate">{{document.id}}</td>
                        
                        <!--Aqui los valores de las propiedades-->
                        <td v-for="field in documentFields" :key="field.key" v-show="field.show" class="pl-2 truncate">
                            {{ document[field.key] }}
                        </td>
                        
                        <td class="py-2 pr-2 flex space-x-2">
                            <ButtonsSeeMore :route="`${baseRoute}/read/${document.id}`" />
                            <ButtonsEdit :route="`${baseRoute}/edit/${document.id}`" />
                            <ButtonsDelete :item="document" @confirm="confirmar_eliminacion" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </article>

        <ModalsConfirmDelete 
            :show="dialog" 
            :item="documento_seleccionado" 
            :confirmMessage="`¿Estás seguro de que deseas eliminar este ${singularDocumentTitle}?`" 
            :deleteFunction="eliminar_documento_confirmado" 
            @cancel="cancelar_eliminacion" 
            @confirm="eliminar_documento_confirmado"
            :data_name="''" 
            :data_value="data_value"
        />
    </div>
</template>

<script setup>
const props = defineProps({
    documentTitle: { type: String, required: true },          // Título general de la página
    singularDocumentTitle: { type: String, required: true },  // Título en singular (Proveedor, Cliente, etc.)
    baseRoute: { type: String, required: true },              // Ruta base para los CRUD (e.g. "/proveedores")
    collectionName: { type: String, required: true },         // Nombre de la colección en Firebase
    documentFields: { type: Object, required: true },         // Campos a mostrar, clave-valor
    defaultVisibleColumns: { type: Object, required: false, default: () => ({})  // Propiedad para aclarar que propiedades son las que se muestran por default.
  }
});

const loading = ref(true);

const documents = ref([]);

//Props para modal de eliminación
const dialog = ref(false);
const documento_seleccionado = ref(null);
const documento_eliminado = ref(false);
const eliminando = ref(false);
const error = ref('');
let data_value = ref('');

//Props para la tabla
const selectedColumns = ref({
    id: true,  // Siempre será true
    codigo: props.defaultVisibleColumns.codigo ?? false,
    nombre: props.defaultVisibleColumns.nombre ?? false,
    alias: props.defaultVisibleColumns.alias ?? false,
});
const sortKey = ref(null);
const sortOrder = ref(1);


// Inicializar las columnas seleccionadas con todos los campos visibles por defecto
onMounted(() => {
    selectedColumns.value = Object.keys(props.documentFields).reduce((acc, key) => {
        acc[key] = true;
        return acc;
    }, {});

    fetchDataFromFirebase();
});



// Función para ordenar la tabla
const sortBy = (key) => {
    if (sortKey.value === key) {
        sortOrder.value = sortOrder.value * -1;
    } else {
        sortKey.value = key;
        sortOrder.value = 1;
    }
};

const sortedDocuments = computed(() => {
    return [...documents.value].sort((a, b) => {
        if (!sortKey.value) return 0;
        const compareA = a[sortKey.value];
        const compareB = b[sortKey.value];

        if (compareA < compareB) return -1 * sortOrder.value;
        if (compareA > compareB) return 1 * sortOrder.value;
        return 0;
    });
});

// Cargar los documentos desde Firebase
const fetchDataFromFirebase = async () => {
    const data = await fetchDataByCollection(props.collectionName);
    documents.value = data;
    loading.value = false;
};

// Función para confirmar la eliminación de un documento
const confirmar_eliminacion = (doc) => {
    documento_seleccionado.value = doc;
    dialog.value = true;
};

// Función para cancelar la eliminación
const cancelar_eliminacion = () => {
    documento_seleccionado.value = null;
    dialog.value = false;
};

// Función para eliminar un documento confirmado
const eliminar_documento_confirmado = async () => {
    if (documento_seleccionado.value) {
        eliminando.value = true;
        error.value = '';

        const doc_row = document.querySelector(`tr[data-key="${documento_seleccionado.value.id}"]`);
        doc_row.classList.add('fading-out');

        setTimeout(async () => {
            try {
                await deleteDataByDocId(props.collectionName, documento_seleccionado.value.id);
                documents.value = documents.value.filter(u => u.id !== documento_seleccionado.value.id);
                documento_seleccionado.value = null;
                dialog.value = false;
                documento_eliminado.value = true;
            } catch (err) {
                error.value = 'Error eliminando el documento. Por favor, intenta de nuevo.';
            } finally {
                eliminando.value = false;
            }
            setTimeout(() => {
                documento_eliminado.value = false;
            }, 3000);
        }, 500);
    }
};
</script>

<style scoped>
    table {
        width: 100%;
        border-collapse: collapse;
    }

    th, td {
        border: 1px solid #ddd;
        padding: 8px;
    }

    th {
        background-color: #f2f2f2;
    }
</style>
