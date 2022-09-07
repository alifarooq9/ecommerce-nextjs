import { createProtectedRouter } from "./protected-router";
import { z } from "zod";
import Stripe from "stripe";
import { env } from "../../env/server.mjs";

const stripe = new Stripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, {
	apiVersion: "2022-08-01",
});

export const stripeRouter = createProtectedRouter().mutation(".pay", {
	input: z.object({
		items: z
			.object({
				id: z.string(),
				price: z.number(),
				title: z.string(),
				imageUrl: z.string().array(),
				quantity: z.number(),
				description: z.string(),
				currency: z.string(),
			})
			.array(),
	}),
	async resolve({ ctx, input }) {
		let orderLists: any = [];

		await input.items.forEach((i) => {
			orderLists = [
				...orderLists,
				{
					price_data: {
						currency: i.currency,
						product_data: {
							name: i.title,
							images: [i.imageUrl[0]],
						},
						unit_amount:
							(i.price.toFixed(2).split(".")[0] as string) +
							i.price.toFixed(2).split(".")[1],
					},
					quantity: i.quantity,
				},
			];
		});

		console.log(orderLists);

		try {
			return await stripe.checkout.sessions.create({
				mode: "payment",
				customer_email: ctx.session.user.email as string,
				payment_method_types: ["card"],

				line_items: await orderLists,
				shipping_address_collection: {
					allowed_countries: ["US", "PK"],
				},
				shipping_options: [
					{
						shipping_rate_data: {
							type: "fixed_amount",
							fixed_amount: {
								amount: 0,
								currency: "usd",
							},
							display_name: "Free shipping",

							delivery_estimate: {
								minimum: {
									unit: "business_day",
									value: 5,
								},
								maximum: {
									unit: "business_day",
									value: 7,
								},
							},
						},
					},
					{
						shipping_rate_data: {
							type: "fixed_amount",
							fixed_amount: {
								amount: 1500,
								currency: "usd",
							},
							display_name: "Next day air",

							delivery_estimate: {
								minimum: {
									unit: "business_day",
									value: 1,
								},
								maximum: {
									unit: "business_day",
									value: 1,
								},
							},
						},
					},
				],

				success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
				cancel_url: `http://localhost:3000/`,
			});
		} catch (error) {
			return error;
		}
	},
});
