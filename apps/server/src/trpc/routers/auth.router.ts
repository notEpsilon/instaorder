import { z } from "zod";
import { t } from "../config.trpc";
import mssql from "mssql";
import cuid from "cuid";
import argon2 from "argon2";
import { User } from "../../types/User";
import { __cookie_ttl__, __prod__ } from "../../constants";

export const authRouter = t.router({
  createUser: t.procedure
    .input(
      z.object({
        username: z.string().min(3).max(255),
        email: z.string().email().min(6).max(255),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const id = cuid();
      const hashedPassword = await argon2.hash(input.password);

      await mssql.query`
        INSERT INTO [users] (id, username, email, password)
        VALUES (${id}, ${input.username}, ${input.email}, ${hashedPassword});
      `;

      ctx.res.status(201);
      return { id };
    }),
  logUserIn: t.procedure
    .input(
      z.object({
        email: z.string().min(3).max(255),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // check if email exists
      const result = await mssql.query<User>`
        SELECT * FROM [users] WHERE email=${input.email}
      `;

      const user =
        result.recordset.length === 0 || !result.recordset[0].email
          ? null
          : result.recordset[0];

      if (!user) {
        ctx.res.status(404);
        return { msg: null, err: "incorrect email or password" };
      }

      // compare passwords
      const correctPassword = await argon2.verify(
        user.password,
        input.password
      );

      if (!correctPassword) {
        ctx.res.status(400);
        return { msg: null, err: "incorrect email or password" };
      }

      // log user in by creating session
      (ctx.req.session as any).userId = user.id;
      ctx.res.cookie("c_usr", user.id, {
        httpOnly: false,
        maxAge: __cookie_ttl__,
        secure: __prod__,
        sameSite: "lax",
      });

      ctx.res.status(200);
      return { msg: user.id, err: null };
    }),
});
