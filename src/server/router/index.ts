// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { productRouter } from "./products";
import { stripeRouter } from "./stripe";
import { ordersRouter } from "./orders";

export const appRouter = createRouter()
	.transformer(superjson)
	.merge("product", productRouter)
	.merge("strip", stripeRouter)
	.merge("orders", ordersRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
