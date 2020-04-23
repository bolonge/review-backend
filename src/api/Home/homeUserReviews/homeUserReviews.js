import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    homeUserReviews: async (_, __, { request }) => {
      const { user } = request;
      const recentData = await prisma
        .user({ id: user.id })
        .keyword({ first: 1 });
      console.log(recentData);
      return await prisma.reviews({
        where: { OR: [{}] },
        orderBy: "createdAt_DESC",
        first: 20,
      });
    },
  },
};
