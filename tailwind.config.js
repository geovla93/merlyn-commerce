module.exports = {
	content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			transitionDuration: {
				3000: "3000ms",
			},
			zIndex: {
				75: 75,
				100: 100,
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
