import { router } from "../lib/trpc";
import { bookRouter } from "./bookRouter";

export const appRouter = router({
  books: bookRouter,
});

export type AppRouter = typeof appRouter;
