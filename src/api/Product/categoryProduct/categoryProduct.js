import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    categoryProduct: async (_, args) => {
      const { categoryName } = args;
      return await prisma.products({
        where: {
          AND: [
            { isPublished: true },
            { category_every: { categoryName: categoryName } },
          ],
        },
      });
    },
  },
};
