import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Space Mono"', 'monospace'],
        sans: ['Inter', 'sans-serif'],
        aptos: ['"Aptos Sans"', 'sans-serif'],
      },
      colors: {
        bg: '#09090e',
        surface: '#0f0f17',
        surface2: '#141420',
        accent: '#f5ab03',
        accent2: '#f37d01',
        // accent: '#7c6ef5',
        // accent2: '#a89af7',
        green: '#069454',
      },
      letterSpacing: {
        widest2: '2px',
        widest3: '3px',
      },
    },
  },
  plugins: [],
}
export default config
