import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { initTRPC, inferAsyncReturnType } from "@trpc/server";
import superjson from "superjson";

export const createContext = async ({
  req,
  res,
}: CreateExpressContextOptions) => ({
  req,
  res,
});

export type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create({ transformer: superjson });
