/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif']
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px #000000',
        'brutal-lg': '8px 8px 0px 0px #000000',
        'brutal-active': '0px 0px 0px 0px #000000'
      },
      colors: {
        brutal: {
          yellow: '#DFE104',
          blue: '#2196F3',
          red: '#FF5252',
          cream: '#F4F4F0',
          black: '#09090B',
          green: '#00FF41',
          purple: '#B388FF',
          orange: '#FFAB40',
          pink: '#FF4081'
        }
      },
      borderWidth: {
        '3': '3px',
        '4': '4px'
      }
    }
  },
  plugins: []
}
