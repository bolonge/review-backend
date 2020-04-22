import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    homeUserProduct: async (_, __, { request }) => {
      const { user } = request;
      const recentData = await prisma
        .user({ id: user.id })
        .keyword({ first: 1 });
      console.log(recentData);
      return await prisma.products({ orderBy: "createdAt_DESC", first: 15 });
    },
  },
};
