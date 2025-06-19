/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        'primary-color': '#B86344', // Terracotta/rust color from logo
        'secondary-color': '#8A9A5B', // Olive green from logo
        'accent-color': '#2A4356', // Keeping deep blue as an accent
        'text-color': '#5C4637', // Rich brown for text
        'light-bg': '#F5F1E2', // Beige background from logo
        'pink': {
          50: '#FEF5F7',
          100: '#FDEAEE',
          200: '#FACFD5',
          300: '#F8B4BE',
          400: '#F69CAC',
          500: '#F38599',
          600: '#D4757F',
          700: '#B56067',
          800: '#964C52',
          900: '#773C40'
        },
        'blue': {
          50: '#E6EAEF',
          100: '#C0CBD7',
          200: '#96A8BC',
          300: '#6C85A0',
          400: '#4D6B8B',
          500: '#2A4356',
          600: '#253D4F',
          700: '#1F3445',
          800: '#182C3C',
          900: '#121F2B'
        },
        'beige': {
          50: '#F5F1E2', // Match the background color from the logo
          100: '#F0EAD8',
          200: '#E5DBBC',
          300: '#D7C9A0',
          400: '#C9B785',
          500: '#BBA56A',
          600: '#A89255',
          700: '#8D7A48',
          800: '#73633C',
          900: '#5A4E2F'
        },
        'brown': {
          50: '#EFEAE7',
          100: '#D7CBC3',
          200: '#BDAA9C',
          300: '#A38974',
          400: '#7D6854',
          500: '#5C4637',
          600: '#544032',
          700: '#49372C',
          800: '#3F2E25',
          900: '#34251F'
        },
        'terracotta': {
          50: '#F9EFEC',
          100: '#F0D7CE',
          200: '#E6BCAD',
          300: '#DCA28B',
          400: '#D58D72',
          500: '#B86344', // Match the logo's terracotta color
          600: '#A55A3E',
          700: '#8C4D35',
          800: '#73402C',
          900: '#5A3323'
        },
        'olive': {
          50: '#F2F4EE',
          100: '#E2E9D7',
          200: '#D1DCBE',
          300: '#B9C89E',
          400: '#A2B47E',
          500: '#8A9A5B', // Match the logo's olive green color
          600: '#768345',
          700: '#616C39',
          800: '#4E572E',
          900: '#3A4223'
        }
      },
      fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
        'serif': ['Playfair Display', 'serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'fade-in-down': 'fadeInDown 0.5s ease-out',
        'fade-in-left': 'fadeInLeft 0.5s ease-out',
        'fade-in-right': 'fadeInRight 0.5s ease-out',
        'bounce-subtle': 'bounceSubtle 2s infinite ease-in-out',
        'pulse-subtle': 'pulseSubtle 3s infinite ease-in-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '68': '17rem',
        '84': '21rem',
        '96': '24rem',
        '128': '32rem',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'hover': '0 10px 25px rgba(0, 0, 0, 0.1)',
        'card': '0 10px 30px -5px rgba(0, 0, 0, 0.1)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      transitionDuration: {
        '400': '400ms',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      scale: {
        '102': '1.02',
        '103': '1.03',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      maxWidth: {
        '7xl': '80rem',
        '8xl': '88rem',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1400px',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.text-color'),
            a: {
              color: theme('colors.primary-color'),
              '&:hover': {
                color: theme('colors.accent-color'),
              },
            },
            h1: {
              color: theme('colors.accent-color'),
            },
            h2: {
              color: theme('colors.primary-color'),
            },
            h3: {
              color: theme('colors.accent-color'),
            },
            blockquote: {
              borderLeftColor: theme('colors.primary-color'),
            },
          },
        },
      }),
    },
  },
  plugins: [],
  variants: {
    extend: {
      opacity: ['group-hover'],
      transform: ['group-hover', 'hover'],
      scale: ['group-hover', 'hover'],
      translate: ['group-hover', 'hover'],
      blur: ['hover', 'group-hover'],
    },
  },
};