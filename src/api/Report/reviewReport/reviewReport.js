import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    commentReport: async (_, args) => {
      const { reviewId, why } = args;
      try {
        await prisma.createReport({
          why,
          review: { connect: { id: reviewId } },
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
