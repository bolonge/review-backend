import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    commentReport: async (_, args) => {
      const { commentId, why } = args;
      try {
        await prisma.createReport({
          why,
          comment: { connect: { id: commentId } },
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
