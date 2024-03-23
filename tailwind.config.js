/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'primary': '#ff5500',
        "color-green": "#65ff6c",
        "color-primary": "#ffffff",
        "color-secondary": "rgba(255, 255, 255, 0.6)",
        "gray-100": "#161616",
        "gray-200": "#1f1f1f",
        "gray-300": "#303030",
      },
      boxShadow: {
        "nav": '0px 2px 8px 4px rgba(0, 0, 0, 0.38)',
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0px 0px 12px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
        xl: 'rgba(0, 0, 0, 0.2) 1px 1px 1px',
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
};
