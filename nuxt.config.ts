// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt'
  ],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  colorMode: {
    classSuffix: "",
  },
  runtimeConfig: {
    BACKENDBASE_ADMIN_USER: process.env.BACKENDBASE_ADMIN_USER,
    BACKENDBASE_ADMIN_PASS: process.env.BACKENDBASE_ADMIN_PASS,
    public: {
      BACKENDBASE_URL: process.env.BACKENDBASE_URL
    }
  }
})
