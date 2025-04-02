export default defineNuxtConfig({

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

<<<<<<< HEAD
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
=======
  ssr: true,
  devtools: { enabled: true },
>>>>>>> e4d8a7c3f07311e16d42a15347792918f2d5601b

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

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2024-07-14',
<<<<<<< HEAD
});
=======

  nitro: {
    compressPublicAssets: true,
  },

  vite: {
    optimizeDeps: {
      include: ['pusher-js'],
    },
  },

  typescript: {
    strict: true,
    typeCheck: 'build',
  },

  echo: {
    key: '',
    scheme: 'http',
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  sanctum: {
    baseUrl: 'http://localhost:80',
    redirect: {
      onGuestOnly: '/dashboard',
      onLogin: '/dashboard',
    },
  },
})
>>>>>>> e4d8a7c3f07311e16d42a15347792918f2d5601b
