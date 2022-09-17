import { createProtectedRouter } from "./context";

export const ordersRouter = createProtectedRouter().query(".getall", {
	async resolve({ ctx }) {
		const orders = await ctx.prisma.orders.findMany({
			where: {
				userId: ctx.session.user.id,
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		return { orders };
	},
});
