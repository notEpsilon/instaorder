import express from "express";
import mssql from "mssql";
import { join } from "path";
import { SQLConfig } from "./config/sql.config";
import { corsMiddleware } from "./middlewares/cors.middleware";
import { helmetMiddleware } from "./middlewares/helmet.middleware";
import { sessionMiddleware } from "./middlewares/session.middleware";
import { trpcMiddleware } from "./middlewares/trpc.middleware";
import { autoMigrate } from "./utils/auto-migrate.utils";

(async () => {
  /**
   * Express application instance.
   */
  const app = express();

  /**
   * Register middlewares
   *
   * `helmet` header security
   * `cors` enable cross-origin-resource-sharing for front-end
   * `json` parse request body as json
   */
  app.use(helmetMiddleware);
  app.use(corsMiddleware);
  app.use(sessionMiddleware);
  app.use(express.json());
  app.use("/trpc", trpcMiddleware);

  await mssql.connect(SQLConfig);

  await autoMigrate(join(__dirname, "sql", "sql-queries.sql"));

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`listening on port ${PORT}...`));
})();
