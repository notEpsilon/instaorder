import { z } from "zod";
import { t } from "../config.trpc";
import mssql from "mssql";
import cuid from "cuid";

export const ownerRouter = t.router({
  getMarkets: t.procedure
    .input(
      z.object({
        prevIdOwner: z.string().length(25),
      })
    )
    .query(async ({ ctx, input }) => {
      const ownerId = (
        await mssql.query`
            SELECT id FROM [owner] WHERE base_user_id=${input.prevIdOwner};
        `
      ).recordset[0].id;

      const result = await mssql.query`
            SELECT * FROM market WHERE owner_id=${ownerId};
        `;

      const markets: any[] = result.recordset;
      const result2: any[] = [];
      let menu_id = "",
        menu_name = "";
      for (const market of markets) {
        const menuId =
          await mssql.query`SELECT id, menu_name FROM [menus] WHERE market_id=${market.id}`;
        // console.log(menuId.recordset);
        menu_name = menuId.recordset[0].menu_name;
        menu_id = menuId.recordset[0].id;
        const foodsInMenu =
          await mssql.query`SELECT * FROM [food] WHERE menus_id=${menuId.recordset[0].id}`;
        result2.push(foodsInMenu);
      }
      const menus = result2.map((el) => el.recordset);

      return {
        markets,
        menus: { data: menus, name: menu_name, menuId: menu_id },
      };
    }),
  addMarket: t.procedure
    .input(
      z.object({
        name: z.string(),
        ownerId: z.string().length(25),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const name = input.name;
      const result = await mssql.query`
        SELECT id FROM [owner] WHERE base_user_id=${input.ownerId};
      `;
      const ownerId = result.recordset[0].id;
      const id = cuid();
      await mssql.query`
        INSERT INTO [market] (id, market_name, owner_id) VALUES (${id}, ${name}, ${ownerId});
      `;
      const mid = cuid();
      await mssql.query`
        INSERT INTO menus (id, owner_id, market_id, menu_name) VALUES (${mid}, ${ownerId}, ${id}, ${""});
      `;
    }),
  getMenuByMarketId: t.procedure
    .input(z.object({ mid: z.string().length(25) }))
    .query(async ({ input }) => {
      const res =
        await mssql.query`SELECT * FROM [menus] WHERE market_id=${input.mid}`;
      return { menus: res.recordset };
    }),
  removeMarket: t.procedure
    .input(
      z.object({
        id: z.string().length(25),
      })
    )
    .mutation(async ({ input }) => {
      const marketId = input.id;
      await mssql.query`
        DELETE FROM [market] WHERE id=${marketId};
      `;
    }),
  addFood: t.procedure
    .input(
      z.object({
        food_name: z.string(),
        price: z.number(),
        image_url: z.string(),
        menus_id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const id = cuid();
      await mssql.query`
            INSERT INTO [food] (id, food_name, price, image_url, menus_id, orders_id) VALUES (${id}, ${
        input.food_name
      }, ${input.price}, ${input.image_url}, ${input.menus_id}, ${
        (input as any).orders_id || null
      });
        `;
    }),
  getFood: t.procedure
    .input(
      z.object({
        menuId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const result = await mssql.query`
      SELECT * FROM food WHERE menus_id=${input.menuId}
    `;
      return { food: result.recordset };
    }),
  updateFood: t.procedure
    .input(
      z.object({
        foodId: z.string().length(25),
        food_name: z.string(),
        price: z.number(),
        image_url: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await mssql.query`
        UPDATE food SET food_name=${input.food_name}, price=${input.price}, image_url=${input.image_url} WHERE id=${input.foodId};
      `;
    }),
  deleteFood: t.procedure
    .input(
      z.object({
        id: z.string().length(25),
      })
    )
    .mutation(async ({ input }) => {
      await mssql.query`DELETE FROM food WHERE id=${input.id};`;
    }),
});
