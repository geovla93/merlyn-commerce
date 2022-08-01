import { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import Stripe from 'stripe';
import { OrderItem } from '@prisma/client';
import { buffer } from 'micro';

import prisma from '@/lib/prisma';

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

const createOrder = async (session: Stripe.Checkout.Session) => {
  console.log('Fulfilling order...');

  const customer: { name?: string; email: string } = JSON.parse(
    session.metadata.customer,
  );

  const order = await prisma.order.create({
    data: {
      amount: session.amount_total / 100,
      address: {
        street: session.shipping.address.line1,
        city: session.shipping.address.city,
        country: session.shipping.address.country,
        zip: session.shipping.address.postal_code,
        state: session.shipping.address.state,
      },
      phone: session.shipping.phone,
      images: JSON.parse(session.metadata.images),
      shippingAmount: Number(session.metadata.shipping_amount) / 100,
      items: JSON.parse(session.metadata.items) as OrderItem[],
      user: {
        connectOrCreate: {
          where: { email: customer.email },
          create: { ...customer },
        },
      },
    },
  });

  console.log('💰 Order created');
  return order;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2020-08-27',
    });
    const signingSecret = process.env.STRIPE_WEBHOOK_SECRET;

    const requestBuffer = await buffer(req);
    const signature = req.headers['stripe-signature'];

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        requestBuffer,
        signature,
        signingSecret,
      );
    } catch (error) {
      console.log('Signing error', error);
      res.status(400).send(`Webhook Error: ${error.message}`);
      return;
    }

    if (event.type === 'checkout.session.completed') {
      console.log('💰 Payment received!');
      const session = event.data.object;

      // Create an order in the database
      const order = await createOrder(session as Stripe.Checkout.Session);
      res.status(201).json({ message: `Placed order with id: ${order.id}` });
    } else {
      console.log(`💰 Unknown event type: ${event.type}`);
      res.status(400).send(`Unknown event type: ${event.type}`);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default handler;
