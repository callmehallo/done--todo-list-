const tailwindCSSAnimista = require('tailwindcss-animistacss')

module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  purge: ['./src/**/*.{js,jsx}', 'public/index.html'],
  theme: {
    extend: {
      animation: {
        'scale-in-top':
          'scale-in-top 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both',
        'scale-in-tl':
          'scale-in-tl 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both',
        'scale-in-tr':
          'scale-in-tr 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both',
        'rotate-90-cw':
          'rotate-90-cw 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both',
        'rotate-90-cw-r':
          'rotate-90-cw-r 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) reverse both',
        'slide-in-top':
          'slide-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both',
      },
      keyframes: {
        'scale-in-top': {
          '0%': {
            transform: 'scale(0)',
            'transform-origin': '50% 0%',
            opacity: '1',
          },
          to: {
            transform: 'scale(1)',
            'transform-origin': '50% 0%',
            opacity: '1',
          },
        },
        'scale-in-tl': {
          '0%': {
            transform: 'scale(0)',
            'transform-origin': '0% 0%',
            opacity: '1',
          },
          to: {
            transform: 'scale(1)',
            'transform-origin': '0% 0%',
            opacity: '1',
          },
        },
        'scale-in-tr': {
          '0%': {
            transform: 'scale(0)',
            'transform-origin': '100% 0%',
            opacity: '1',
          },
          to: {
            transform: 'scale(1)',
            'transform-origin': '100% 0%',
            opacity: '1',
          },
        },
        'rotate-90-cw': {
          '0%': {
            transform: 'rotate(0)',
          },
          to: {
            transform: 'rotate(90deg)',
          },
        },
        'rotate-90-cw-r': {
          '0%': {
            transform: 'rotate(0)',
          },
          to: {
            transform: 'rotate(90deg)',
          },
        },
        'slide-in-top': {
          '0%': {
            transform: 'translateY(-1000px)',
            opacity: '0',
          },
          to: {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
      },
      colors: {
        cusBlack: '#212121',
        cusTeal: '#6D9886',
        cusBeige: '#D9CAB3',
        cusGrey: '#F6F6F6',
      },
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif'],
      },
    },
  },
  plugins: [
    tailwindCSSAnimista({
      classes: [
        'scale-in-top',
        'scale-in-tl',
        'scale-in-tr',
        'rotate-90-cw',
        'rotate-90-cw-r',
        'slide-in-top',
      ],
      settings: {},
      variants: ['responsive'],
    }),
  ],
}
