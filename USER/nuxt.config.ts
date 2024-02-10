import {resolve} from "path";
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  alias: {
    "@": resolve(__dirname, "/"),
  },
  css: ["~/assets/main.scss"],
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  i18n: {
    vueI18n: './configs/i18n.config.ts' // if you are using custom path, default 
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  components: {
    global: true,
    dirs: [
      './components', // Add your components directory here
    ],
  },
})
