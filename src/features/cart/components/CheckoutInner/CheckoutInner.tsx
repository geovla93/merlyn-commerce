import { FC } from 'react';
import { loadStripe } from '@stripe/stripe-js';

import CheckoutItem from '../CheckoutItem';
import Button from '@/components/ui/Button';
import useCart from '@/features/cart/hooks/useCart';
import List from '@/components/ui/List';
import useIsMounted from '@/hooks/useIsMounted';
import toast from 'react-hot-toast';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const CheckoutInner: FC = () => {
  const isMounted = useIsMounted();
  const { cartItems, totalAmount } = useCart();
  const taxAmount = isMounted ? totalAmount * 0.76 : 0;
  const shippingPrice = isMounted ? (totalAmount >= 50 ? 0 : 10) : 0;
  const orderTotal = isMounted ? totalAmount + shippingPrice : 0;

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    // Call api route to create checkout session...
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      body: JSON.stringify({
        items: cartItems,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const checkoutSession = await response.json();

    // Redirect user/customer to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.id,
    });

    if (result.error) {
      toast.error(result.error.message);
      return;
    }
  };

  return (
    <div className="my-10 flex w-full flex-col items-center space-y-4">
      <p className="text-4xl text-red-500">
        *Please use the following test credit card for payments*
        <br />
        4242 4242 4242 4242 - Exp: 03/25 - CVV: 123
      </p>
      <h1 className="self-start text-3xl font-semibold">Shopping Cart</h1>
      <div className="grid w-full gap-6 lg:grid-cols-3 lg:gap-10">
        <List
          data={cartItems}
          keyExtractor={(item) => item.id}
          renderItem={(item) => <CheckoutItem item={item} />}
          className="w-full divide-y-2 border-y-2 py-6 lg:col-span-2"
        />
        <div className="w-full space-y-3 rounded bg-white p-3 shadow-lg lg:place-self-start">
          <h3 className="text-left text-lg font-medium">Order Summary</h3>
          <div className="flex flex-col divide-y">
            <div className="flex justify-between py-2">
              <p className="text-gray-600">Subtotal</p>
              <p>${totalAmount.toFixed(2)}</p>
            </div>
            <div className="flex justify-between py-2">
              <p className="text-gray-600">Shipping estimate</p>
              <p>${shippingPrice}</p>
            </div>
            <div className="flex justify-between py-2">
              <p className="text-gray-600">Tax estimate</p>
              <p>${taxAmount}</p>
            </div>
            <div className="flex justify-between py-2">
              <p className="font-medium">Order total</p>
              <p>${orderTotal}</p>
            </div>
          </div>
          <Button className="w-full" onClick={createCheckoutSession}>
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutInner;
