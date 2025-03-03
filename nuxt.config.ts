// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxtjs/i18n'],
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
  i18n: {
    vueI18n: './i18n.config.ts',
    strategy: 'no_prefix',
    langDir: './locales', 
    locales: [
      { code: 'en', language: 'en-US', name: 'English', files: ['en.json'] },
      { code: 'fr', language: 'fr-CA', name: 'Français', files: ['fr.json'] }
    ],
    defaultLocale: 'en',
  },
  runtimeConfig: {
    BACKENDBASE_ADMIN_USER: process.env.BACKENDBASE_ADMIN_USER,
    BACKENDBASE_ADMIN_PASS: process.env.BACKENDBASE_ADMIN_PASS,
    OPENAI_API_KEY: process.env.OAI_API_KEY,
    REPLICATE_API_TOKEN: process.env.REPLICATE_API_TOKEN,
    public: {
      BACKENDBASE_URL: process.env.BACKENDBASE_URL,
      BUILD_NUMBER: process.env.BUILD_NUMBER || process.env.VERCEL_GIT_COMMIT_SHA?.substring(0, 7),
    }
  }
})