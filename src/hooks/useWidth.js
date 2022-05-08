import { useState, useEffect } from "react";

export default function useWidth() {
	const [width, setWidth] = useState(null);

	useEffect(() => {
		function handleResize() {
			setWidth(window.innerWidth);
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return width;
}
