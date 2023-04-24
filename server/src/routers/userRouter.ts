import { prisma } from "../lib/prismaClient";
import { router, procedure } from "../lib/trpc";
import { z } from "zod";
import bcrypt from "bcrypt";

export const userRouter = router({
  createUser: procedure
    .input(
      z.object({
        fullName: z.string(),
        userName: z.string(),
        password: z.string(),
      })
    )
    .mutation(({ input }) => {
      return prisma.users.create({
        data: {
          ...input,
        },
      });
    }),
  login: procedure
    .input(
      z.object({
        username: z.string(),
      })
    )
    .query(async ({ input }) => {
      const userDetails = await prisma.users.findFirst({
        where: { userName: input.username },
      });
      return userDetails;
    }),
});
