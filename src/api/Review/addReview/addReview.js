import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addReview: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { text, rating, reviewId, photos } = args;
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
      photos.forEach(
        async photo =>
          await prisma.createPhoto({
            url: photo,
            review: {
              connect: {
                id: review.id
              }
            }
          })
      );
      return review;
    }
  }
};
