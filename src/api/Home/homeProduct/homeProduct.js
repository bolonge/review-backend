import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    homeProduct: async (_, __) => {
      return await prisma.products({ orderBy: "createdAt_ASC", last: 2 });
    },
  },
};
