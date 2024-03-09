import {resolve} from "path";
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
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
    locales: ['US', 'UK', 'DE', 'FR'], // Define your language codes here
    defaultLocale: 'US', // Set the default language
    strategy:'prefix',
    vueI18n: {
      fallbackLocale: 'US',    
    },
    vueI18n:'./configs/i18n.config.ts'
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
