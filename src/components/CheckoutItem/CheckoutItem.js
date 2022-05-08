import { useDispatch } from "react-redux";
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	XIcon,
} from "@heroicons/react/solid";

import { removeItem, addItem, clearItemFromCart } from "../../store/cartSlice";

const CheckoutItem = ({ item }) => {
	const { name, imageUrl, price, quantity } = item;
	const dispatch = useDispatch();

	const handleRemoveItem = () => dispatch(removeItem(item));
	const handleAddItem = () => dispatch(addItem(item));
	const handleClearItem = () => dispatch(clearItemFromCart(item));

	return (
		<div className="flex justify-between items-center">
			<div className="w-3/12 md:w-4/12 flex">
				<img
					className="bg-contain h-full w-1/3"
					src={imageUrl}
					alt={name}
					loading="lazy"
				/>
			</div>
			<h2 className="w-3/12 md:w-3/12 text-left">{name}</h2>
			<div className="w-2/12 md:w-2/12 flex items-center justify-center space-x-2">
				<ChevronLeftIcon
					onClick={handleRemoveItem}
					className="h-5 w-5 hover:bg-gray-200 hover:bg-opacity-60 rounded-full cursor-pointer"
				/>
				<span>{quantity}</span>
				<ChevronRightIcon
					onClick={handleAddItem}
					className="h-5 w-5 hover:bg-gray-200 hover:bg-opacity-60 rounded-full cursor-pointer"
				/>
			</div>
			<span className="w-2/12 md:w-2/12">{price}$</span>
			<span className="w-2/12 md:w-1/12 flex justify-end pr-4 md:pr-5">
				<XIcon
					onClick={handleClearItem}
					className="w-5 h-5 hover:bg-gray-200 hover:bg-opacity-60 rounded-full cursor-pointer"
				/>
			</span>
		</div>
	);
};

export default CheckoutItem;
