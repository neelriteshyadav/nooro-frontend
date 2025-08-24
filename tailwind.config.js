/** @format */

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
					750: '#374151',
				},
				task: {
					red: '#ef4444',
					orange: '#f97316',
					amber: '#f59e0b',
					green: '#22c55e',
					blue: '#3b82f6',
					indigo: '#6366f1',
					violet: '#8b5cf6',
					pink: '#ec4899',
					stone: '#78716c',
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
