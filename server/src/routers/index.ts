import { router } from "../lib/trpc";
import { bookRouter } from "./bookRouter";
import { userRouter } from "./userRouter";

export const appRouter = router({
  books: bookRouter,
  users: userRouter
});

export type AppRouter = typeof appRouter;
