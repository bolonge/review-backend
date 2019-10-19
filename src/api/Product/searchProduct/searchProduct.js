import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchProduct: async (_, args) =>
      await prisma.products({
        where: {
          OR: [
            { productName_contains: args.term },
            { reviews_every: { text_contains: args.term } }
          ]
        }
      })
  }
};
