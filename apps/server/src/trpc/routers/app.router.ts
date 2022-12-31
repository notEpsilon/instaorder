import { t } from "../config.trpc";
import { authRouter } from "./auth.router";
import { customerRouter } from "./customer.router";
import { ownerRouter } from "./owner.router";
import { userRouter } from "./user.router";

export const appRouter = t.router({
  auth: authRouter,
  users: userRouter,
  owner: ownerRouter,
  customer: customerRouter,
});

export type AppRouter = typeof appRouter;
