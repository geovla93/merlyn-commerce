import { useDispatch } from "react-redux";
import Image from "next/image";
import CustomButton from "../CustomButton/CustomButton";

import { addItem } from "../../store/cartSlice";

const ItemPreview = ({ item }) => {
	const { name, imageUrl, price, quantity } = item;
	const dispatch = useDispatch();

	const handleAddItem = () => {
		dispatch(addItem(item));
	};

	return (
		<div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-10 my-16">
			<div className="relative flex-1 w-full">
				<Image
					src={imageUrl}
					alt={name}
					width={290}
					height={350}
					quality={100}
					layout="responsive"
					objectFit="contain"
					objectPosition="top"
				/>
			</div>
			<div className="flex-1 flex flex-col text-left space-y-8">
				<h1 className="text-2xl md:text-3xl">{name}</h1>
				<h3 className="text-xl md:text-2xl">${price}</h3>
				<p className="text-lg md:text-xl">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut
					porta orci, ac eleifend magna. Curabitur eu nibh in nisl aliquam
					interdum eu in urna. Praesent dignissim libero urna, non finibus neque
					iaculis eget. Pellentesque turpis neque, aliquet ut pretium sit amet,
					pulvinar sed magna. Donec finibus risus libero, ut lacinia tellus
					euismod nec. Cras euismod tortor et urna ultrices, nec pellentesque
					nulla posuere. Quisque vel neque vel ligula lacinia pretium. Donec
					elementum ipsum ipsum, a luctus dolor euismod sed. Sed placerat libero
					lobortis urna consectetur euismod. Phasellus at semper augue. Nam nec
					aliquam ex. Aenean sit amet gravida quam. Donec semper molestie
					pulvinar. In hac habitasse platea dictumst. Nulla vitae molestie
					lorem.
				</p>
				<div className="flex justify-between w-4/5 space-x-8">
					<div className="flex flex-1 space-x-4">
						{/* <label htmlFor="size">Size</label> */}
						<select
							className="p-4"
							name="size"
							id="size"
							defaultValue="Size"
							defaultChecked
						>
							<option value="Size" disabled>
								Size
							</option>
							<option value="xs">XS</option>
							<option value="s">S</option>
							<option value="m">M</option>
							<option value="l">L</option>
							<option value="xl">XL</option>
						</select>
					</div>
					<CustomButton type="button" onClick={handleAddItem}>
						ADD TO CART
					</CustomButton>
				</div>
			</div>
		</div>
	);
};

export default ItemPreview;
