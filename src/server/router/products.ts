import { createRouter } from "./context";
import { z } from "zod";

export const exampleRouter = createRouter()
	.query("getAll", {
		async resolve({ ctx }) {
			return await ctx.prisma.products.findMany();
		},
	})
	.query("getById", {
		input: z.object({
			id: z.string(),
		}),
		async resolve({ input, ctx }) {
			return await ctx.prisma.products.findUnique({
				where: {
					id: input.id,
				},
			});
		},
	});
