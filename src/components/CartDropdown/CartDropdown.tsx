import { FC } from "react";
import { useRouter } from "next/router";

import CartItem from "../CartItem/CartItem";
import CustomButton from "../CustomButton/CustomButton";

import useCart from "../../hooks/useCart";

const CartDropdown: FC = () => {
  // const cartItems = useSelector((state) => state.cart.cartItems);
  // const quantity = useSelector((state) => state.cart.quantity);
  // const hidden = useSelector((state) => state.cart.hidden);
  // const dispatch = useDispatch();
  const router = useRouter();
  const { toggleCartHidden, cartItems, quantity } = useCart();

  const handleCartCheckoutClick = () => {
    toggleCartHidden();
    router.push("/checkout");
  };

  return (
    <div className="absolute top-20 right-8 z-100 flex h-96 w-80 flex-col space-y-4 border bg-white p-4 shadow-md">
      <div className="flex flex-1 flex-col items-center overflow-auto">
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
