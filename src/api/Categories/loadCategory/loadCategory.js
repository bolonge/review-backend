import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    loadCategory: async (_, args) => {
      const { sCategoryId } = args;
      return await prisma.categories({
        where: { superCategory: { id: sCategoryId } },
        orderBy: "categoryName_ASC"
      });
    }
  }
};
