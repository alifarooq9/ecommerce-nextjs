// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./products";
import { protectedExampleRouter } from "./protected-example-router";

export const appRouter = createRouter()
	.transformer(superjson)
	.merge("products.", exampleRouter)
	.merge("stripe", protectedExampleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
