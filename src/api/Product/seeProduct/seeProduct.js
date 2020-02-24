import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeProduct: async (_, args) => {
      const { productName } = args;
      return await prisma.product({ productName });
    }
  }
};
