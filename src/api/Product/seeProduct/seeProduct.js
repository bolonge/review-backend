import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeProduct: async (_, args) => {
      const { id } = args;
      return await prisma.product({ id });
    }
  }
};
