// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  alias: {
    '@/prisma/*': './prisma/*',
  },

  devtools: { enabled: true },
  workspaceDir: '.',
  srcDir: 'client/',

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxt/fonts',
  ],

  devServer: {
    port: process.env.FRONTEND_PORT,
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.BACKEND_ENDPOINT_URL,
    },
  },

  colorMode: {
    preference: 'system',
    fallback: 'dark',
    classSuffix: '',
    storageKey: 'nuxt-color-mode',
  },

  tailwindcss: {
    configPath: 'tailwind.config.ts',
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  compatibilityDate: '2024-09-16',

  pinia: {
    autoImports: ['defineStore'],
  },

  piniaPersistedstate: {
    cookieOptions: {
      maxAge: 60 * 60 * 24 * 30,
    },
  },
});
