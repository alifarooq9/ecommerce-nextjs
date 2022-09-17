// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./products";
import { stripeRouter } from "./stripe";

export const appRouter = createRouter()
	.transformer(superjson)
	.merge("products.", exampleRouter)
	.merge("stripe", stripeRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
