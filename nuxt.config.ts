import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  build: {
    transpile: ['vuetify'],
  },
  css: [
    '@/assets/css/main.css'
  ],
  devtools: { enabled: true },
  imports: {
    dirs: ['utils/**']
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@nuxtjs/tailwindcss'
  ],
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
    // and more...
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})
