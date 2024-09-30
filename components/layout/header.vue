<template>
    <v-app-bar color="primary" prominent>
        <v-app-bar-nav-icon variant="text" v-slot:prepend @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Bloquera Guadalajara</v-toolbar-title>

        <template v-if="$vuetify.display.mdAndUp">
            <v-btn icon="mdi-magnify" variant="text"></v-btn>

            <v-btn icon="mdi-filter" variant="text"></v-btn>
            <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
        </template>
    </v-app-bar>
</template>