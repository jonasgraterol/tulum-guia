/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        sand: '#F5F0E8',
        jungle: '#1B7A6D',
        cenote: '#3BC4C4',
        bark: '#2D2A26',
        honey: '#D4A853',
        laguna: '#2BA5A5',
        ruin: '#D4A853',
        nature: '#6DB56D',
        park: '#E87F5F',
        night: '#7B5EA7',
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
