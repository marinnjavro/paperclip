const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  prefix: '',
  mode: 'jit',
  important: true,
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    function ({ addComponents }) {
      addComponents({
        '.multi-row-end-3': {
          '@screen xxxs': {
            'grid-row-end': '3',
          },
          '@screen xxs': {
            'grid-row-end': '3',
          },
          '@screen xs': {
            'grid-row-end': '3',
          },
          '@screen sm': {
            'grid-row-end': '3',
          },
        },
        '.multi-margin-top-2px': {
          '@screen xxxs': {
            "margin-top": '2px',
          },
          '@screen xxs': {
            "margin-top": '2px',
          },
          '@screen xs': {
            "margin-top": '2px',
          },
          '@screen sm': {
            "margin-top": '2px',
          },
        },
        '.multi-width-25px': {
          '@screen xxxs': {
            width: '25px',
          },
          '@screen xxs': {
            width: '25px',
          },
          '@screen xs': {
            width: '25px',
          },
          '@screen sm': {
            width: '25px',
          },
        },
        /* CONTENT CREATORS */
        '.content-image5-scale': {
          '@screen xxxs': {
            "background-image": "url('/assets/static/images/ContentCreationTabImages/image5-2.png')",
          },
          '@screen md': {
            "background-image": "url('/assets/static/images/ContentCreationTabImages/image5-1.png')",
          },
          '@screen lg': {
            "background-image": "url('/assets/static/images/ContentCreationTabImages/image5.png')",
          },
        },
        '.content-image6-scale': {
          '@screen xxxs': {
            "background-image": "url('/assets/static/images/ContentCreationTabImages/image6-2.png')",
          },
          '@screen md': {
            "background-image": "url('/assets/static/images/ContentCreationTabImages/image6-1.png')",
          },
          '@screen lg': {
            "background-image": "url('/assets/static/images/ContentCreationTabImages/image6.png')",
          },
        },
        '.content-image7-scale': {
          '@screen xxxs': {
            "background-image": "url('/assets/static/images/ContentCreationTabImages/image7-2.png')",
          },
          '@screen md': {
            "background-image": "url('/assets/static/images/ContentCreationTabImages/image7-1.png')",
          },
          '@screen lg': {
            "background-image": "url('/assets/static/images/ContentCreationTabImages/image7.png')",
          },
        },
        /* CORPORATE */
        '.corporate-image5-scale': {
          '@screen xxxs': {
            "background-image": "url('/assets/static/images/CorporateLearningTabImages/image5-2.png')",
          },
          '@screen md': {
            "background-image": "url('/assets/static/images/CorporateLearningTabImages/image5-1.png')",
          },
          '@screen lg': {
            "background-image": "url('/assets/static/images/CorporateLearningTabImages/image5.png')",
          },
        },
        '.corporate-image6-scale': {
          '@screen xxxs': {
            "background-image": "url('/assets/static/images/CorporateLearningTabImages/image6-2.png')",
          },
          '@screen md': {
            "background-image": "url('/assets/static/images/CorporateLearningTabImages/image6-1.png')",
          },
          '@screen lg': {
            "background-image": "url('/assets/static/images/CorporateLearningTabImages/image6.png')",
          },
        },
        '.corporate-image7-scale': {
          '@screen xxxs': {
            "background-image": "url('/assets/static/images/CorporateLearningTabImages/image7-2.png')",
          },
          '@screen md': {
            "background-image": "url('/assets/static/images/CorporateLearningTabImages/image7-1.png')",
          },
          '@screen lg': {
            "background-image": "url('/assets/static/images/CorporateLearningTabImages/image7.png')",
          },
        },
        /* PROFESSORS */
        '.professors-image5-scale': {
          '@screen xxxs': {
            "background-image": "url('/assets/static/images/ProfessorTabImages/e-Learning-experience-2.png')",
          },
          '@screen md': {
            "background-image": "url('/assets/static/images/ProfessorTabImages/e-Learning-experience-1.png')",
          },
          '@screen lg': {
            "background-image": "url('/assets/static/images/ProfessorTabImages/e-Learning-experience.png')",
          },
        },
        '.professors-image6-scale': {
          '@screen xxxs': {
            "background-image": "url('/assets/static/images/ProfessorTabImages/research-2.png')",
          },
          '@screen md': {
            "background-image": "url('/assets/static/images/ProfessorTabImages/research-1.png')",
          },
          '@screen lg': {
            "background-image": "url('/assets/static/images/ProfessorTabImages/research.png')",
          },
        },
        '.professors-image7-scale': {
          '@screen xxxs': {
            "background-image": "url('/assets/static/images/ProfessorTabImages/faculty-collaboration-2.png')",
          },
          '@screen md': {
            "background-image": "url('/assets/static/images/ProfessorTabImages/faculty-collaboration-1.png')",
          },
          '@screen lg': {
            "background-image": "url('/assets/static/images/ProfessorTabImages/faculty-collaboration.png')",
          },
        },
      });
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-jakarta-sans)']
      },
      colors: {
        /* Cogent theme colors */
        night: {
          base: {
            primary: {
              DEFAULT: '#7101FF',
              hover: '#5B00D0',
              pressed: '#3300A8',
              darker: '#3c1c72'
            },
            secondary: {
              DEFAULT: '#08E9EE',
              hover: '#14F1F7',
              pressed: '#0BDEE3',
              darker: '#1f6573'
            },
            '01': '#1E1E2C',
            '02': '#2B2C3E',
            '03': '#2F3048',
            '04': '#353648',
            '05': '#404257',
            '06': '#51526D'
          },
          text: {
            DEFAULT: '#9092AF',
            '01': ' #AAABC5',
            link: {
              DEFAULT: '#06E9EE',
              hover: '#10F2F7',
              pressed: '#0ADEE3'
            },
            label: {
              primary: {
                DEFAULT: '#242555',
                inverse: '#FFF'
              },
              secondary: {
                DEFAULT: '#9FA6B4',
                inverse: '#FFF',
                '02': '#AAABC5'
              },
              tertirary: {
                DEAFULT: '#BDBECC',
                inverse: '#FFF'
              }
            },
            negative: '#FF2500',
            positive: '#1C6BE2'
          }
        },
        day: {
          base: {
            primary: {
              DEFAULT: '#7135FF',
              hover: '#5B29D0',
              pressed: '#331FA8',
              darker: '#3c1c72'
            },
            secondary: {
              DEFAULT: '#06E9EE',
              hover: '#10F2F7',
              pressed: '#0ADEE3',
              darker: '#1f6573'
            },
            '01': '#FFFFFF',
            '02': '#F1F5FB',
            '03': '#ECF3FE',
            '04': '#E6EDF8',
            '05': '#D6DDE7',
            '06': '#C7D0DF'
          },
          text: {
            link: {
              DEFAULT: '#06E9EE',
              hover: '#10F2F7',
              pressed: '#0ADEE3'
            },
            label: {
              primary: {
                DEFAULT: '#242555',
                inverse: '#242555'
              },
              secondary: {
                DEAFULT: '#FFF',
                inverse: '#9FA6B4'
              },
              tertirary: {
                DEAFULT: '#FFF',
                inverse: '#BDBECC'
              }
            },
            negative: '#FF2500',
            positive: '#1C6BE2'
          },
          static: {
            background: '#2F3048',
            icon: '#AAABC5'
          }
        },
        support: {
          gray: {
            '001': '#A6A8C3',
            '002': '#9092AF',
            '003': '#8586a1',
            '005': '#484963',
            '006': '#0c0c0c',
            '007': '#b3b3b3'
          },
          violet: {
            101: '#5B00D0',
            102: '#7101FF',
            103: '#7C0EFD',
            104: '#8C1CFF',
            105: '#9C2FFF',
            106: '#AB3DFC'
          },
          turquoise: {
            201: '#08E9EE',
            202: '#10F2F7',
            203: '#19FAFF',
            204: '#26FFFF',
            205: '#62FFFF',
            206: '#9AFDFD'
          },
          blue: {
            301: '#1C6BE2',
            302: '#2776ED',
            303: '#3281F8',
            304: '#4695FF',
            305: '#519FF5',
            306: '#63B3FF'
          },
          red: {
            401: '#FF0E00',
            402: '#FF3F32',
            403: '#FF493C',
            404: '#FF675A',
            405: '#FF7B6E',
            406: '#FF998C'
          }
        },
        opacity: {
          violet: '#7102FF',
          turquoise: '#06E9EE',
          blue: '#1C6BE2',
          silver: '#9092AF',
          white: '#FFFFFF'
        }
      },
      keyframes: {
        'rotate-180': {
          from: {
            transform: 'rotate(0deg)'
          },
          to: {
            transform: 'rotate(180deg)'
          }
        },
        'rotate-back': {
          from: {
            transform: 'rotate(180deg)'
          },
          to: {
            transform: 'rotate(0deg)'
          }
        }
      },
      animation: {
        'rotate-180': 'rotate-180 0.5s forwards',
        'rotate-back': 'rotate-back 0.5s forwards'
      }
    },
    screens: {
      xxxs: '0px',
      xxs: '350px',
      xs: '475px',
      ...defaultTheme.screens
    },
    fontSize: {
      xxxs: ['9px', '10px'],
      xxs: ['11px', '14px'],
      xs: ['13px', '16px'],
      sm: ['15px', '20px'],
      base: ['17px', '24px'],
      lg: ['20px', '24px'],
      xl: ['24px', '28px'],
      '2xl': ['28px', '32px'],
      '3xl': ['32px', '36px'],
      '4xl': ['36px', '40px'],
      '5xl': ['44px', '48px']
    },
    borderRadius: {
      ...defaultTheme.borderRadius,
      none: '0',
      full: '9999px',
      sm: '2px',
      default: '4px',
      md: '6px',
      lg: '8px',
      xl: '12px',
      '2xl': '16px',
      '3xl': '24px',
      '4xl': '32px'
    }
  },
  variants: {
    extend: {}
  }
}
