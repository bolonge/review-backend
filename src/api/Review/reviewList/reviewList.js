import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    reviewList: async (_, args) => {
      const { id } = args;
      return await prisma.reviews({ where: { id } });
    }
  }
};
