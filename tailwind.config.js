/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      'title': ['Outfit', 'sans-serif'],
      'base': ['Nunito', 'sans-serif'],
    },
    extend: {
      colors: {
        'darkgreen': {
          DEFAULT: '#00332C',
          dark: '#04332D',
        },
        'bg': {
          DEFAULT: '#F2F7F5',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
