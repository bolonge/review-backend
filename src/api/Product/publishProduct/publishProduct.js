import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    publishProduct: async (_, args) => {
      const { id } = args;
      await prisma.updateProduct({
        where: { id },
        data: { isPublished: true }
      });
      return true;
    }
  }
};
