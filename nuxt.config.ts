import { defineOrganization } from 'nuxt-schema-org/schema';
export default defineNuxtConfig({
  schemaOrg: {
    identity: defineOrganization({
      '@type': ['Organization', 'Store', 'OnlineStore'],

      // Basic Information
      name: 'NxtKart',
      alternateName: 'Nxtkart Tech Store',
      description:
        'NxtKart is a one-stop tech store offering robotics kits, electronic components, custom PCs, laptops, and smart home devices. Explore innovative technology with fast delivery and expert support across India.',
      url: 'https://www.nxtkart.com',
      logo: '/images/NxtKart_Logo.svg',

      // Contact Information, if applicable
      email: 'care@nxtkart.com',
      telephone: '+91-948-792-9592',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          telephone: '+91-948-792-9592',
          email: 'care@nxtkart.com',
          availableLanguage: ['English'],
        },
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          telephone: '+91-948-792-9592',
          email: 'sales@nxtkart.com',
        },
      ],

      // Business Address (headquarters/returns), if applicable
      address: {
        '@type': 'PostalAddress',
        streetAddress:
          '59, Krishna Street, Gandhi Nagar, Perumathunallur, Guduvanchery',
        addressLocality: 'Chennai',
        addressRegion: 'TN',
        postalCode: '603202',
        addressCountry: 'IN',
      },

      // Return Policy, if applicable
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        name: 'Standard Return Policy',
        inStoreReturnsOffered: false,
        merchantReturnDays: '7',
        returnPolicyCategory:
          'https://schema.org/MerchantReturnFiniteReturnWindow',
        returnMethod: ['ReturnByMail'],
        returnFees: 'https://schema.org/FreeReturn',
        returnPolicyCountry: {
          '@type': 'Country',
          name: ['IN'],
        },
      },

      // Shipping Policy, if applicable
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'INR',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: ['IN'],
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 5,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 2,
            maxValue: 7,
            unitCode: 'DAY',
          },
        },
      },

      // Payment Methods, if applicable
      paymentAccepted: [
        'Credit Card',
        'Debit Card',
        'UPI',
        'Net Banking',
        'Paytm',
        'PhonePe',
        'Google Pay',
      ],
      currenciesAccepted: ['INR'],

      // Social Media & External Links, if applicable
      // 'sameAs': [
      //   'https://facebook.com/modernhome',
      //   'https://instagram.com/modernhome',
      //   'https://pinterest.com/modernhome',
      //   'https://twitter.com/modernhome'
      // ],

      // Trust Indicators, if applicable
      // 'hasCredential': [
      //   {
      //     '@type': 'EducationalOccupationalCredential',
      //     'credentialCategory': 'BBB Rating A+',
      //     'url': 'https://www.bbb.org/modernhome'
      //   },
      //   {
      //     '@type': 'EducationalOccupationalCredential',
      //     'credentialCategory': 'Certified B Corporation',
      //     'url': 'https://www.bcorporation.net/modernhome'
      //   }
      // ],

      // Aggregate Ratings, if applicable
      // 'aggregateRating': {
      //   '@type': 'AggregateRating',
      //   'ratingValue': '4.8',
      //   'reviewCount': '12459',
      //   'bestRating': '5',
      //   'worstRating': '1'
      // },

      // Customer Service Features, if applicable
      // 'hasOfferCatalog': {
      //   '@type': 'OfferCatalog',
      //   'name': 'ModernHome Product Catalog',
      //   'url': 'https://nxtkart.com/products'
      // },

      // Additional Business Properties, if applicable
      slogan: 'The Tech Store',

      // Business Hours (Customer Service), if applicable
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          opens: '10:00:00',
          closes: '18:00:00',
        },
      ],
    }),
  },
  site: {
    title: 'NxtKart',
    description:
      'NxtKart is a one-stop tech store offering robotics kits, electronic components, custom PCs, laptops, and smart home devices. Explore innovative technology with fast delivery and expert support across India.',
    url: 'https://www.nxtkart.com',
  },
  ui: {
    colorMode: false,
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.NUXT_SITE_URL,
    },
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
    '@nuxtjs/robots',
    '@nuxtjs/seo',
    'nuxt-site-config',
    'nuxt-swiper',
    'nuxt-gtag',
  ],

  // sitemap: {
  //   exclude: [
  //     '/cart/**',
  //     '/dashboard/**',
  //     '/maintenance/**',
  //     '/verify-email/**',
  //     '/my-account/**',
  //     '/order/**',
  //     '/search/**',
  //   ],
  //   sources: [
  //     '/api/__sitemap__/urls',
  //   ],
  //   sitemaps: {
  //     main: {
  //       urls() {
  //         return ['/', '/about', '/contact'];
  //       },
  //     },
  //     products: {
  //       sources: [
  //         '/api/products-sitemap-urls'
  //       ],
  //     },
  //     categories: {
  //       sources: [
  //         '/api/categories-sitemap-urls'
  //       ]
  //     },
  //   },
  //   // Set the chunk size to 1000 URLs per sitemap file
  //   defaultSitemapsChunkSize: 1000,
  // },

  gtag: {
    id: 'G-F00GNE6W1B',
  },

  fonts: {
    defaults: {
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      styles: ['normal', 'italic'],
    },
    families: [{ name: 'Figtree', provider: 'google' }],
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
      onGuestOnly: '/',
      onLogin: '/',
    },
  },

  echo: {
    key: '',
    scheme: 'http',
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport:
        'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
      htmlAttrs: {
        lang: 'en',
        class: 'scroll-smooth',
      },
      bodyAttrs: {
        class: 'antialiased',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/assets/favicon.ico' },
        { rel: 'shortcut icon', href: '/assets/favicon.ico' },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/assets/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/assets/favicon-16x16.png',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/assets/apple-touch-icon.png',
        },
        { rel: 'manifest', href: '/assets/site.webmanifest' },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '192x192',
          href: '/assets/android-chrome-192x192.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '512x512',
          href: '/assets/android-chrome-512x512.png',
        },
      ],
      meta: [
        { name: 'theme-color', content: '#007AE2' },
        { property: 'og:image', content: '/images/NxtKart-og-image.jpg' },
        { property: 'og:image:width', content: '500' },
        { property: 'og:image:height', content: '500' },
      ],
      titleTemplate: '%s',
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2024-07-14',
});
