import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { createContext } from "../trpc/config.trpc";
import { appRouter } from "../trpc/routers/app.router";

export const trpcMiddleware = createExpressMiddleware({
  router: appRouter,
  createContext,
});
