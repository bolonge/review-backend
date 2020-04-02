import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeRecent: async (_, __, { request }) => {
      const { user } = request;
      const keywords = await prisma
        .user({ id: user.id })
        .keyword({ orderBy: "updatedAt_DESC" });
      return keywords.splice(0, 10);
    }
  }
};
