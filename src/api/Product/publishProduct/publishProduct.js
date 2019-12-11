import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    publishProduct: async (_, args) => {
      const { postId } = args;
      await prisma.updateProduct({
        where: { id: postId },
        data: { isPublished: true }
      });
      return true;
    }
  }
};
