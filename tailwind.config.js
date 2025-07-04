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
        '18': '4.5rem',
        '22': '5.5rem',
        '25': '6.25rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '32': '8rem',
        '33': '8.25rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '39': '9.75rem',
        '45': '11.25rem',
        '46': '11.5rem',
        '47': '11.75rem',
        '50': '12.5rem',
        '55': '13.75rem',
        '62': '15.5rem',
        '64': '16rem',
        '66': '16.5rem',
        '75': '18.75rem',
        '80': '20rem',
        '93': '23.25rem',
        '95': '23.75rem',
        '100': '25rem',
        '116': '29rem',
        '118': '29.5rem',
        '120': '30rem',
        '144': '36rem',
        '150': '37.5rem',
        '152': '38rem',
        '159': '39.75rem',
        '180': '45rem',
        '184': '46rem',
        '190': '47.5rem',
        '198': '49.5rem',
        '200': '50rem',
        '204': '51rem',
        '220': '55rem',
        '230': '57.5rem',
        '250': '62.5rem',
        '267': '66.75rem',
        '310': '77.5rem',
        '320': '80rem',
        '400': '100rem',
        '500': '125rem',
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
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        rotateBorder: {
          to: {
            '--border-angle': '360deg',
          },
        },
      },
      animation: {
        blink: 'blink 1.1s step-start infinite',
        'rotate-border': 'rotateBorder 4s linear infinite',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // Important for Docusaurus compatibility
  },
}