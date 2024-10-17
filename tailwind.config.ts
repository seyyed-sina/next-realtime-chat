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
    },
  },
  plugins: [],
};
export default config;
