export default defineNuxtConfig({
  devtools: { enabled: true },

  ssr: true,

  future: {
    compatibilityVersion: 4,
  },

  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    'nuxt-auth-sanctum',
    '@nuxt/image',
    '@pinia/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxt/icon',
    'nuxt-schema-org',
    'nuxt-laravel-echo',
    '@nuxtjs/sitemap',
    '@nuxt/fonts',
  ],

  fonts: {
    defaults: {
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      styles: ['normal', 'italic'],
    },
    families: [
      { name: 'Figtree', provider: 'google' },
    ],
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  vite: {
    optimizeDeps: {
      include: ['pusher-js'],
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  typescript: {
    strict: false,
    typeCheck: false,
  },

  nitro: {
    compressPublicAssets: true,
  },

  sanctum: {
    baseUrl: 'https://localhost:80',
    redirect: {
      onGuestOnly: '/dashboard',
      onLogin: '/dashboard',
    },
  },

  echo: {
    key: '',
    scheme: 'http',
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'en',
        class: 'scroll-smooth',
      },
      bodyAttrs: {
        class: 'antialiased',
      },
      link: [
        {
          rel: 'icon',
          href: '/favicon.ico',
        },
        {
          rel: 'shortcut icon',
          href: '/favicon.ico',
        },
        {
          rel: 'apple-touch-icon',
          href: '/favicon.ico',
        },
      ],
    },
  },

  compatibilityDate: '2024-07-14',
});
