import { createRouter } from "./context";
import { z } from "zod";

export const productRouter = createRouter()
	.query(".getAll", {
		async resolve({ ctx }) {
			return await ctx.prisma.product.findMany({});
		},
	})
	.query(".get", {
		input: z.object({
			id: z.string(),
		}),
		async resolve({ ctx, input }) {
			return await ctx.prisma.product.findFirst({
				where: {
					id: input.id,
				},
			});
		},
	})
	.mutation(".add", {
		input: z.object({
			title: z.string(),
			description: z.string(),
			price: z.number(),
			color: z.string(),
			curreny: z.string(),
			imageUrl: z.string(),
		}),
		async resolve({ input, ctx }) {
			await ctx.prisma.product
				.create({
					data: {
						title: input.title,
						description: input.description,
						price: input.price,
						color: input.color,
						curreny: input.curreny,
						imageUrl: input.imageUrl,
					},
				})
				.then((p) => {
					return { result: p };
				})
				.catch((err) => {
					return { error: err };
				});
		},
	});
