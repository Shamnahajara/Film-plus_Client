// Import necessary modules using ES6 syntax
import daisyui from "daisyui";
import lineClamp from '@tailwindcss/line-clamp';

// Define your Tailwind CSS configuration object
const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: '#080A1A',
        subMain: '#F20000',
        dry: '#0B0F29',
        star: '#ecb613',
        boarder: '#4b5563',
        dryGray: '#E0D5D5'
      },
      height: {
        header: '560px',
        rate: '400px'
      },
      fontSize: {
        h1: '2.6rem'
      },
      screens: {
        xs: '475px'
      }
    },
  },
  plugins: [
    daisyui,
    lineClamp,
  ],
};

export default config;


