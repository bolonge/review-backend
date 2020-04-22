import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    homeUserReviews: async (_, __) => {
      return await prisma.reviews({ orderBy: "updatedAt_ASC", last: 15 });
    },
  },
};
