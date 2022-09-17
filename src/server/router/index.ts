// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./products";
import { stripeRouter } from "./stripe";
import { ordersRouter } from "./orders";

export const appRouter = createRouter()
	.transformer(superjson)
	.merge("products.", exampleRouter)
	.merge("stripe", stripeRouter)
	.merge("order", ordersRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
