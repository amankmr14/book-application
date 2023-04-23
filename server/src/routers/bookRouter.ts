import { prisma } from "../lib/prismaClient";
import { router, procedure } from "../lib/trpc";
import { z } from "zod";

export const bookRouter = router({
  allBooks: procedure.query(async () => {
    const books = await prisma.books.findMany();
    return books;
  }),
  bookDetails: procedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .query(async ({ input }) => {
      console.log(input)
      const bookDetail = await prisma.books.findFirst({
        where: { id: input.id }
      })
      return bookDetail;
  }),
  addBook: procedure
    .input(
      z.object({
        title: z.string(),
        author: z.string(),
        description: z.string(),
        content: z.string(),
        readTime: z.number(),
        thumbnail: z.string(),
      })
    )
    .mutation(({ input }) => {
      return prisma.books.create({
        data: {
            ...input
        },
      });
    }),
});
