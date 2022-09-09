import { createProtectedRouter } from "./protected-router";
import { z } from "zod";
import Stripe from "stripe";
import { env } from "../../env/server.mjs";

const stripe = new Stripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, {
	apiVersion: "2022-08-01",
	timeout: 160000,
});

export const stripeRouter = createProtectedRouter()
	.query(".success", {
		input: z.object({
			allItems: z
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
			session_id: z.string(),
		}),
		async resolve({ input, ctx }) {
			try {
				const session = await stripe.checkout.sessions
					.retrieve(input.session_id, {
						expand: ["line_items"],
					})
					.then((res) => {
						return res;
					});

				if (!session) return;

				const orderExists = await ctx.prisma.orders.findFirst({
					where: {
						id: session.id,
					},
				});

				if (orderExists) {
					return { session, order: orderExists };
				}

				const order = await ctx.prisma.orders.create({
					data: {
						id: session.id,
						customer: session.customer_details as any,
						totalAmount: {
							shipping: session.shipping_cost?.amount_subtotal,
							amount: session.amount_subtotal,
						},
						items: input.allItems,
						stripeSession: session as any,
						userId: ctx.session.user.id,
					},
				});

				return { session, order };
			} catch (error: any) {
				return { error: error.message };
			}
		},
	})
	.mutation(".pay", {
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
								description: i.description,
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
				const session = await stripe.checkout.sessions.create({
					mode: "payment",
					customer_email: ctx.session.user.email as string,
					payment_method_types: ["card", "alipay", "us_bank_account"],
					allow_promotion_codes: true,
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

					success_url: `${env.NEXT_PUBLIC_ORIGIN}success?session_id={CHECKOUT_SESSION_ID}`,
					cancel_url: `${env.NEXT_PUBLIC_ORIGIN}`,
				});

				return session;
			} catch (error) {
				return error;
			}
		},
	});
