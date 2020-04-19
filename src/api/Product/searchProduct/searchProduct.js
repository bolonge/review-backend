import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchProduct: async (_, args) =>
      await prisma.products({
        where: {
          AND: [
            { isPublished: true },
            { productName_contains: args.term },
            { productName_starts_with: args.term },
            {
              category: {
                categoryName_contains: args.term
              }
            }
          ]
        }
      })
  }
};
