import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    homeUserReviews: async (_, __) => {
      return await prisma.reviews({ orderBy: "createdAt_DESC", first: 20 });
    },
  },
};
