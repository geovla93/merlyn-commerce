import { useSelector, useDispatch } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/client";

import CheckoutItem from "../CheckoutItem/CheckoutItem";
import CustomButton from "../CustomButton/CustomButton";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const CheckoutInner = () => {
	const cartItems = useSelector((state) => state.cart.cartItems);
	const total = useSelector((state) => state.cart.totalAmount);
	const [session] = useSession();

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
		<div className="flex flex-col items-center my-10 w-full space-y-4">
			<div className="flex border-b border-black pb-4 w-11/12 md:max-w-6xl">
				<span className="w-3/12 md:w-4/12 text-sm md:text-xl text-left">
					Product
				</span>
				<span className="w-3/12 md:w-3/12 text-sm md:text-xl text-left">
					Description
				</span>
				<span className="w-2/12 md:w-2/12 text-sm md:text-xl">Quantity</span>
				<span className="w-2/12 md:w-2/12 text-sm md:text-xl">Price</span>
				<span className="w-2/12 md:w-1/12 text-sm md:text-xl text-right">
					Remove
				</span>
			</div>
			<div className="flex flex-col w-11/12 md:max-w-6xl max-h-96 overflow-y-scroll space-y-4 shadow-lg rounded-md">
				{cartItems.map((item) => (
					<CheckoutItem key={item._id} item={item} />
				))}
			</div>
			<div className="flex w-11/12 md:max-w-6xl justify-end">
				<h3 className="uppercase text-3xl">Total: ${total}</h3>
			</div>
			<p className="text-4xl text-red-500">
				*Please use the following test credit card for payments*
				<br />
				4242 4242 4242 4242 - Exp: 03/23 - CVV: 123
			</p>
			<div className="flex w-11/12 md:max-w-6xl justify-end">
				<CustomButton onClick={createCheckoutSession} styles="px-12">
					Checkout
				</CustomButton>
			</div>
		</div>
	);
};

export default CheckoutInner;
