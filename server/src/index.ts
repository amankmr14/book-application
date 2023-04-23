import express, { Application, Request, Response, NextFunction } from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import { appRouter } from "./routers";

const app: Application = express();
const PORT = 8080;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use(
  "/",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
);

app.listen(PORT, (): void => {
  console.log(`Connected successfully on port ${PORT}`);
});

export * from "./routers";
