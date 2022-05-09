import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";

import CheckoutItem from "../CheckoutItem/CheckoutItem";
import CustomButton from "../CustomButton/CustomButton";
import useCart from "../../hooks/useCart";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const CheckoutInner = () => {
  // const cartItems = useSelector((state) => state.cart.cartItems);
  // const total = useSelector((state) => state.cart.totalAmount);
  const { data: session } = useSession();
  const { cartItems, totalAmount: total } = useCart();

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    // Call api route to create checkout session...
    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      body: JSON.stringify({
        items: cartItems,
        email: session ? session.user.email : "",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const checkoutSession = await response.json();

    // Redirect user/customer to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.id,
    });

    if (result.error) alert(result.error.message);
  };

  return (
    <div className="my-10 flex w-full flex-col items-center space-y-4">
      <div className="flex w-11/12 border-b border-black pb-4 md:max-w-6xl">
        <span className="w-3/12 text-left text-sm md:w-4/12 md:text-xl">
          Product
        </span>
        <span className="w-3/12 text-left text-sm md:w-3/12 md:text-xl">
          Description
        </span>
        <span className="w-2/12 text-sm md:w-2/12 md:text-xl">Quantity</span>
        <span className="w-2/12 text-sm md:w-2/12 md:text-xl">Price</span>
        <span className="w-2/12 text-right text-sm md:w-1/12 md:text-xl">
          Remove
        </span>
      </div>
      <div className="flex max-h-96 w-11/12 flex-col space-y-4 overflow-y-scroll rounded-md shadow-lg md:max-w-6xl">
        {cartItems.map((item) => (
          <CheckoutItem key={item._id} item={item} />
        ))}
      </div>
      <div className="flex w-11/12 justify-end md:max-w-6xl">
        <h3 className="text-3xl uppercase">Total: ${total}</h3>
      </div>
      <p className="text-4xl text-red-500">
        *Please use the following test credit card for payments*
        <br />
        4242 4242 4242 4242 - Exp: 03/23 - CVV: 123
      </p>
      <div className="flex w-11/12 justify-end md:max-w-6xl">
        <CustomButton onClick={createCheckoutSession} style="px-12">
          Checkout
        </CustomButton>
      </div>
    </div>
  );
};

export default CheckoutInner;
