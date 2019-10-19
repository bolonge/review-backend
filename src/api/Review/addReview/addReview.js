import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addReview: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { text, rating, reviewId } = args;
      const { user } = request;
      const review = await prisma.createReview({
        user: {
          connect: { id: user.id }
        },
        product: {
          connect: {
            id: reviewId
          }
        },
        rating,
        text
      });
      return review;
    }
  }
};
