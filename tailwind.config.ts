import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
        },
        screens: {
          xs: '30rem',
          sm: '36rem',
          md: '48rem',
          lg: '60rem',
          tall: { raw: '(min-height: 680px)' },
        },
      },
      colors: {
        primary: {
          DEFAULT: '#5865F2',
          100: '#E1E6FF',
          200: '#B3BDFF',
          300: '#8593FF',
          400: '#5865F2',
          500: '#4752C4',
        },
        secondary: {
          DEFAULT: '#F43F5E',
          100: '#FFE4E9',
          200: '#FFB8C5',
          300: '#FF8CA1',
          400: '#F43F5E',
          500: '#E11D48',
        },
        green: {
          DEFAULT: '#38A169',
          100: '#D4EDDA',
          200: '#A9DCC3',
          300: '#7CCBAA',
          400: '#38A169',
          500: '#2F855A',
        },
        red: {
          DEFAULT: '#F56565',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F56565',
          500: '#E53E3E',
        },
        gray: {
          DEFAULT: '#A5A5A5',
          100: '#F5F5F5',
          200: '#E1E1E1',
          300: '#C7C7C7',
          400: '#A5A5A5',
          500: '#6B6B6B',
          600: '#1E1F29',
        },
        text: {
          light: '#EAEAEA',
          dark: '#1C1C1E',
          muted: '#A5A5A5',
        },
      },
    },
  },
  plugins: [],
};
export default config;
