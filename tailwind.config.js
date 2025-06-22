/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,md,mdx}',
    './docs/**/*.{md,mdx}',
    './static/**/*.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        'albert': ['Albert Sans', 'sans-serif'],
        'cinzel': ['Cinzel', 'serif'],
      },
      spacing: {
        '13': '3.25rem',
        '15': '3.75rem',
        '26': '6.5rem',
        '33': '8.25rem',
        '34': '8.5rem',
        '39': '9.75rem',
        '45': '11.25rem',
        '50': '12.5rem',
        '100': '25rem',
        '116': '29rem',
        '144': '36rem',
      },
      fontSize: {
        '45': '45px',
        '112': '112px',
      },
      lineHeight: {
        '13': '3.25rem',
        '26': '6.5rem',
      },
      zIndex: {
        '100': '100',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // Important for Docusaurus compatibility
  },
}