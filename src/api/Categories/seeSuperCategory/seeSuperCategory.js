import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeSuperCategory: async (_, __) => {
      return await prisma.superCategories({ orderBy: "superCategoryName_ASC" });
    }
  }
};
