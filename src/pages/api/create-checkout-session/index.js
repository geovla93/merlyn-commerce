import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
	const { items, email } = req.body;

	const transformedItems = items.map((item) => {
		return {
			price_data: {
				currency: "eur",
				product_data: {
					name: item.name,
					images: [item.imageUrl],
				},
				unit_amount: item.price * 100,
			},
			description: item.name,
			quantity: item.quantity,
		};
	});

	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: transformedItems,
			mode: "payment",
			success_url: `${process.env.HOST}/success`,
			cancel_url: `${process.env.HOST}/checkout`,
			metadata: {
				email,
				images: JSON.stringify(items.map((item) => item.image)),
			},
			shipping_address_collection: {
				allowed_countries: ["GB", "US", "GR"],
			},
			shipping_rates: ["shr_1IyAqlC6hrWRc19PpzAi2ATR"],
		});

		res.status(200).json({ id: session.id });
	} catch (error) {
		console.log(error);
	}
};
