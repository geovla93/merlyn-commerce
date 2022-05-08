import { useRouter } from "next/router";
import Image from "next/image";

const MenuItem = ({ title, imageUrl, size, linkUrl }) => {
	const router = useRouter();

	const handleMenuClick = () => {
		router.push(`${linkUrl}`);
	};
	return (
		<div
			className={`${
				size ? "lg:col-span-3" : "lg:col-span-2"
			} relative overflow-hidden cursor-pointer group`}
			onClick={handleMenuClick}
		>
			<img
				loading="lazy"
				src={imageUrl}
				alt={title}
				className="w-full h-full group-hover:transform group-hover:scale-110 transition duration-3000"
			/>
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white opacity-70 flex flex-col justify-center items-center border px-6 h-24 group-hover:opacity-90">
				<h2 className="text-2xl">{title.toUpperCase()}</h2>
				<p>SHOP NOW</p>
			</div>
		</div>
	);
};

export default MenuItem;
