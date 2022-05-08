const CustomButton = ({ children, styles, inverted, ...otherProps }) => {
	const invertedColors = inverted
		? "bg-white text-black hover:bg-black hover:text-white"
		: "bg-black text-white hover:bg-white hover:text-black";
	return (
		<button
			{...otherProps}
			className={`${
				styles && styles
			} border-2 border-black rounded-sm p-4 outline-none transition duration-300 ${invertedColors}`}
		>
			{children}
		</button>
	);
};

export default CustomButton;
