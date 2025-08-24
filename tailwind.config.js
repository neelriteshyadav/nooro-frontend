/**
 * @format
 * @type {import('tailwindcss').Config}
 */

module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				gray: {
					750: '#374151', // Custom gray for hover states
				},
				task: {
					red: '#ef4444', // Bright red from screenshots
					orange: '#f97316', // Bright orange from screenshots
					amber: '#f59e0b', // Bright amber from screenshots
					green: '#22c55e', // Bright green from screenshots
					blue: '#3b82f6', // Bright blue from screenshots
					indigo: '#6366f1', // Bright indigo from screenshots
					violet: '#8b5cf6', // Bright violet from screenshots
					pink: '#ec4899', // Bright pink from screenshots
					stone: '#78716c', // Bright stone from screenshots
				},
			},
			animation: {
				'fade-in': 'fadeIn 0.3s ease-in-out',
				'slide-up': 'slideUp 0.3s ease-out',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				slideUp: {
					'0%': { transform: 'translateY(10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
			},
		},
	},
	plugins: [],
};
