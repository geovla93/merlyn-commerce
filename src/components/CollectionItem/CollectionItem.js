import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const CollectionItem = ({ item }) => {
	const [isHovered, setIsHovered] = useState(false);
	const router = useRouter();

	let collection = router.query.collectionId;

	if (collection === undefined) {
		collection = item.category.toLowerCase();
	}

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	const handleRedirect = () => {
		router.push(`/shop/${collection}/${item._id}`);
	};

	return (
		<div
			className={`h-96 w-full p-4 relative flex flex-col items-center border ${
				isHovered ? "shadow-md" : "shadow-none"
			}`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div
				style={{
					backgroundImage: `url(${item.imageUrl})`,
				}}
				className="w-full h-full cursor-pointer bg-no-repeat bg-cover bg-center hover:opacity-80"
				onClick={handleRedirect}
			/>
			<div className="w-full flex flex-col justify-between mt-4">
				<span className="text-left">
					<Link href={`/shop/${collection}/${item._id}`}>
						<a className="py-1 text-left hover:underline">{item.name}</a>
					</Link>
				</span>
				<span className="text-left">{item.price}$</span>
			</div>
		</div>
	);
};

export default CollectionItem;
