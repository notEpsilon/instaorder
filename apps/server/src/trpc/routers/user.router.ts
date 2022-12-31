import mssql from "mssql";
import { z } from "zod";
import { User } from "../../types/User";
import { t } from "../config.trpc";

export const userRouter = t.router({
  findUser: t.procedure
    .input(z.object({ id: z.string().length(25) }))
    .query(async ({ ctx, input }) => {
      const result =
        await mssql.query<User>`SELECT * FROM [base_user] WHERE id=${input.id}`;

      const user =
        result.recordset.length === 0 ||
        !result.recordset[0] ||
        !result.recordset[0].id
          ? null
          : result.recordset[0];

      if (!user) {
        ctx.res.status(404);
        return { msg: null, err: null };
      }

      return { msg: { ...user, password: undefined }, err: null };
    }),
});
