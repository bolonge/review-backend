import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    homeUserProduct: async (_, __) => {
      return await prisma.products({ orderBy: "updatedAt_ASC", last: 15 });
    },
  },
};
