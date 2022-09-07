// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { productRouter } from "./products";
import { stripeRouter } from "./stripe";

export const appRouter = createRouter()
	.transformer(superjson)
	.merge("product", productRouter)
	.merge("strip", stripeRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
