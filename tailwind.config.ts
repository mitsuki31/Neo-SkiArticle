import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        xs: '400px',  // For very small devices
        sm: '640px',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        heading: ['Poppins', ...defaultTheme.fontFamily.sans],
        inter: ['Inter', ...defaultTheme.fontFamily.sans],
        poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
        'major-mono': ['Major Mono Display', ...defaultTheme.fontFamily.mono],
        gugi: ['Gugi', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        slide: {
					"0%": { transform: "translateX(0)" },
					"100%": { transform: "translateX(-100%)" },
				},
        slidein: {
					from: {
						opacity: "0",
						transform: "translateY(-10px)",
					},
					to: {
						opacity: "1",
						transform: "translateY(0)",
					},
				},
        'spin-once': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        slide: "slide 2s linear infinite",
				slidein: "slidein 1s ease var(--slidein-delay, 0) forwards",
        'spin-slow': 'spin 10s linear infinite',
        'spin-once': 'spin-once 600ms ease-in-out',
        blink: 'blink 1s steps(2, start) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
