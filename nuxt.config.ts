// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/styles/main.scss'],
  modules: [
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxt/test-utils',
    '@pinia/nuxt'
  ],
  // GitHub Pages configuration
  app: {
    baseURL: '/dogfyDiet/',
    buildAssetsDir: '/_nuxt/'
  },
  nitro: {
    prerender: {
      routes: ['/']
    }
  }
})