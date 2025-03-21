// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxtjs/i18n', '@nuxt/fonts'],
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
    strategy: 'no_prefix',
    langDir: './locales', 
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'fr', language: 'fr-CA', name: 'Français', file: 'fr.json' }
    ],
    defaultLocale: 'en',
    lazy: true
  },
  runtimeConfig: {
    BACKENDBASE_ADMIN_USER: process.env.BACKENDBASE_ADMIN_USER,
    BACKENDBASE_ADMIN_PASS: process.env.BACKENDBASE_ADMIN_PASS,
    OPENAI_API_KEY: process.env.OAI_API_KEY,
    STRIPE_API_KEY: process.env.STRIPE_API_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    public: {
      BACKENDBASE_URL: process.env.BACKENDBASE_URL,
      BUILD_NUMBER: process.env.BUILD_NUMBER || process.env.VERCEL_GIT_COMMIT_SHA?.substring(0, 7),
    }
  }
})