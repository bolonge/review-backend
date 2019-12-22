import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchProduct: async (_, args) =>
      await prisma.products({
        where: { productName_contains: args.term }
      })
  }
};
