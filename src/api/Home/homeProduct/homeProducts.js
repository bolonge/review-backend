import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    homeProducts: async (_, __) => {
      return await prisma.products({ orderBy: "createdAt_DESC", first: 20 });
    },
  },
};
