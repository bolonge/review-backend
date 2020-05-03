import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    homeProducts: async (_, __) => {
      return await prisma.products({
        where: { AND: [{ isPublished: true }] },
        orderBy: "createdAt_DESC",
        first: 20,
      });
    },
  },
};
