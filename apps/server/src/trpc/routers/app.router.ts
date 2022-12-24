import { t } from "../config.trpc";
import { authRouter } from "./auth.router";
import { userRouter } from "./user.router";

export const appRouter = t.router({
  auth: authRouter,
  users: userRouter,
});

export type AppRouter = typeof appRouter;
