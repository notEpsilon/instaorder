import { t } from "../config.trpc";
import mssql from "mssql";
import { z } from "zod";
import cuid from "cuid";

interface Food {
  id: string;
  food_name: string;
  price: number;
  image_url: string;
}

export const customerRouter = t.router({
  allFood: t.procedure.query(async () => {
    // const res = await mssql.query<Food[]>`
    //         CREATE VIEW [Total Sum] AS (SELECT SUM(price) AS total FROM [food] GROUP BY [price]);
    //     `;
    // await mssql.query`CREATE VIEW [Total Cost] AS (SELECT SUM(price) AS [total] FROM [food])`;
    const res = await mssql.query<Food[]>`
      SELECT * FROM [food];
    `;
    const total = await mssql.query`
      SELECT [total] FROM [Total Cost];
    `;
    // const qry = await mssql.query`
    //   SELECT SUM(price) AS total FROM (SELECT * FROM [food]) GROUP BY price;
    // `;
    // const tot = qry.recordset[0].total;
    // if (tot != total.recordset[0].total) console.log("invalid result");
    return { food: res.recordset, total: total.recordset[0].total };
  }),
  placeOrder: t.procedure
    .input(
      z.object({
        orderName: z.string().min(3).max(255),
        food: z.string().length(25),
        cid: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const id = cuid();
      const realCid = await mssql.query`
        SELECT id FROM customer WHERE base_user_id=${input.cid};
      `;
      const rcid = realCid.recordset[0].id;
      await mssql.query`
        INSERT INTO [orders] (id, customer_id, name) VALUES (${id}, ${rcid}, ${input.orderName});
      `;
      await mssql.query`
        UPDATE [food] SET orders_id=${id} WHERE id=${input.food};
      `;
    }),
  getOrders: t.procedure
    .input(z.object({ cid: z.string().length(25) }))
    .query(async ({ input }) => {
      const realCid = await mssql.query`
        SELECT id FROM customer WHERE base_user_id=${input.cid};
      `;
      const rcid = realCid.recordset[0].id;
      const result = await mssql.query`
          SELECT * FROM [orders] WHERE customer_id=${rcid};
      `;
      // await mssql.query`CREATE UNIQUE INDEX Orders_idx ON [orders] (name)`;
      return { orders: result.recordset };
    }),
});
