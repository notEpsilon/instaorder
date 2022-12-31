import { z } from "zod";
import { t } from "../config.trpc";
import mssql from "mssql";
import cuid from "cuid";
import argon2 from "argon2";
import { __cookie_ttl__, __prod__ } from "../../constants";
import { LogInReturn } from "../../types/LogInReturn";
import { User } from "../../types/User";

export const authRouter = t.router({
  createUser: t.procedure
    .input(
      z.object({
        username: z.string().min(3).max(255),
        email: z.string().email().min(6).max(255),
        password: z.string(),
        owner: z.number().min(0).max(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const baseUserid = cuid();
      const hashedPassword = await argon2.hash(input.password);

      await mssql.query`
        INSERT INTO [base_user] (id, username, email, password, is_owner)
        VALUES (${baseUserid}, ${input.username}, ${input.email}, ${hashedPassword}, ${input.owner});
      `;

      const user_id = cuid();

      if (input.owner === 0) {
        await mssql.query`
            INSERT INTO [customer] (id, base_user_id) VALUES (${user_id}, ${baseUserid});
          `;
      } else {
        await mssql.query`
          INSERT INTO [owner] (id, base_user_id) VALUES (${user_id}, ${baseUserid});
        `;
      }

      ctx.res.status(201);
      return { id: user_id };
    }),
  logUserIn: t.procedure
    .input(
      z.object({
        email: z.string().min(3).max(255),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }): Promise<LogInReturn> => {
      // check if email exists
      const result = await mssql.query<User>`
        SELECT bu.email, bu.password, bu.id
        FROM [base_user] AS bu
        LEFT JOIN [customer] AS c
        ON bu.id=c.base_user_id
        LEFT JOIN [owner] AS o
        ON bu.id=o.base_user_id
        WHERE email=${input.email};
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
  currUser: t.procedure.query(({ ctx }) => {
    if (ctx.req.session && (ctx.req.session as any).userId) {
      return { userId: (ctx.req.session as any).userId as string };
    }
    return null;
  }),
  logout: t.procedure.mutation(async ({ ctx }) => {
    if (!(ctx.req.session && (ctx.req.session as any).userId)) {
      ctx.res.status(400);
      return { msg: null, err: "already logged out" };
    }
    const err = await new Promise((resolve, reject) => {
      ctx.req.session.destroy((err) => {
        if (err) {
          reject(err);
        } else {
          ctx.res.clearCookie("qid");
          ctx.res.clearCookie("c_usr");
          resolve(null);
        }
      });
    });
    return { msg: err ? null : "logged out successfully", err: err };
  }),
});
