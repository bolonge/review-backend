import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchCategory: async (_, args) => {
      const { term } = args;
      await prisma.categories({
        where: {
          categoryName_contains: term
        }
      });
    }
  }
};
