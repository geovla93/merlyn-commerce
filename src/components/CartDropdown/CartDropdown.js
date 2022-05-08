import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import CartItem from "../CartItem/CartItem";
import CustomButton from "../CustomButton/CustomButton";

import { toggleCartHidden } from "../../store/cartSlice";

const CartDropdown = () => {
	const cartItems = useSelector((state) => state.cart.cartItems);
	const quantity = useSelector((state) => state.cart.quantity);
	const hidden = useSelector((state) => state.cart.hidden);
	const dispatch = useDispatch();
	const router = useRouter();

	const handleCartCheckoutClick = () => {
		router.push("/checkout");
		dispatch(toggleCartHidden());
	};

	return (
		<div className="absolute top-20 right-8 bg-white w-80 h-96 flex flex-col space-y-4 border shadow-md z-100 p-4">
			<div className="flex-1 flex flex-col items-center overflow-auto">
				{quantity !== 0 ? (
					cartItems.map((item) => <CartItem key={item._id} item={item} />)
				) : (
					<h1>Your cart is empty</h1>
				)}
			</div>
			<CustomButton onClick={handleCartCheckoutClick}>
				GO TO CHECKOUT
			</CustomButton>
		</div>
	);
};

export default CartDropdown;
