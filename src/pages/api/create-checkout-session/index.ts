import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { CartItem } from '@/types/models';
import { getSession } from 'next-auth/react';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const authSession = await getSession({ req });

  const { items }: { items: CartItem[] } = req.body;

  const transformedItems = items.map((item) => {
    return {
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: item.price * 100,
      },
      description: item.name,
      quantity: item.quantity,
    };
  });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: transformedItems,
      mode: 'payment',
      success_url: `${process.env.HOST}/success?referrer=stripe`,
      cancel_url: `${process.env.HOST}/checkout`,
      metadata: {
        customer: JSON.stringify({
          email: authSession?.user?.email ?? '',
          name: authSession?.user?.name ?? '',
        }),
        images: JSON.stringify(items.map((item) => item.image)),
        items: JSON.stringify(items),
      },
      shipping_address_collection: {
        allowed_countries: ['GB', 'US', 'GR'],
      },
      shipping_rates: ['shr_1IyAqlC6hrWRc19PpzAi2ATR'],
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

export default handler;
