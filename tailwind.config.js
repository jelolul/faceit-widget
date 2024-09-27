const { nextui } = require('@nextui-org/theme');
/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

module.exports = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@nextui-org/theme/dist/components/[object Object].js"
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
			},
			colors: {
				'primary': {
					'50': '#fff7ec',
					'100': '#ffedd3',
					'200': '#ffd6a5',
					'300': '#ffb96d',
					'400': '#ff8f32',
					'500': '#ff6f0a',
					DEFAULT: '#ff5500',
					'700': '#cc3b02',
					'800': '#a12f0b',
					'900': '#82290c',
					'950': '#461104',
				},
				'color-green': '#65ff6c',
				'color-primary': '#ffffff',
				'color-secondary': 'rgba(255, 255, 255, 0.6)',
				'gray': {
					'0': '#f6f6f6',
					'100': '#161616',
					'200': '#1f1f1f',
					'300': '#303030',
					'400': '#e7e7e7',
					'500': '#d1d1d1',
					'600': '#b0b0b0',
					'700': '#888888',
					'800': '#6d6d6d',
					'900': '#5d5d5d',
					'950': '#4f4f4f',
					'1000': '#454545',
					'1100': '#3d3d3d',
				},
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			boxShadow: {
				'nav': '0px 2px 8px 4px rgba(0, 0, 0, 0.38)',
				md2: '0px 0px 4px 1px rgba(0, 0, 0, 1)'
			},
			textShadow: {
				sm: '0 1px 2px var(--tw-shadow-color)',
				DEFAULT: '0px 0px 12px var(--tw-shadow-color)',
				lg: '0 8px 16px var(--tw-shadow-color)',
				xl: 'rgba(0, 0, 0, 0.2) 1px 1px 1px'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
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
		require("tailwindcss-animate")
	],
};
