import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        ['sky-blue']: '#8ea50b', //turned this into stiltz green
        denim: '#022959',
        bg: '#EFF5FF',
        ['light-blue']: '#92ACBE', //turned this into stiltz green
        grey: '#9699AA',
        red: '#EE374A',
        'border-grey': '#D6D9E6',
        purple: '#483EFF',
        'very-light-grey': '#F8F9FF',
        meduimgrey: '#D0CDD7',
      },
      maxWidth: {
        '1920px': '1920px',
      },
    }
  },
  plugins: [],
}

export default config
