import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeReview: async (_, args) => {
      const { id } = args;
      return await prisma.review({ id });
    }
  }
};
