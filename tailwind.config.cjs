/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        'btn-bg': 'linear-gradient(to right, rgb(0, 94, 127) 50%, white 50%)',
      },
      backgroundImage: {
        'hero-pattern': "url('/img/jared-rice-PibraWHb4h8-unsplash.jpg')",
      },
      backgroundPosition: {
        slideStart: 'right bottom',
        slideDone: 'left bottom',
      },
      backgroundSize: {
        'btn-start': '200% 100%',
      },
      colors: {
        brand: {
          blue: 'rgb(0, 94, 127)',
        },
      },
    },
  },
  plugins: [],
}
