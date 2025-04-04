import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: ['./nuxt.config.ts'],
  theme: {
    extend: {
      aspectRatio: {
        auto: 'auto',
        square: '1 / 1',
        video: '16 / 9',
      },
      colors: {
        nxtkartBlue: '#009FDB',
        nxtkartsecondaryBlue: '#007AE2',
      },
    },
  },
}
