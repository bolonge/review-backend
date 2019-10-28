import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editReview: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { text, rating, reviewId } = args;
      return await prisma.updateReview({
        where: { id: reviewId },
        data: { text, rating }
      });
    }
  }
};
