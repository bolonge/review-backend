import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeRecent: async (_, __, { request }) => {
      const { user } = request;
      return await prisma.user({ id: user.id }).keyword();
    }
  }
};
