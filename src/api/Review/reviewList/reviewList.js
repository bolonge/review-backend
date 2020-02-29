import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    reviewList: async (_, args) => {
      const { productName } = args;
      return await prisma.reviews({ where: { product: { productName } } });
    }
  }
};
