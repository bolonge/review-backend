import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addReview: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { text, rating, productId, photos } = args;
      const { user } = request;
      const exists = await prisma.$exists.review({ user });
      if (exists) {
        throw Error("리뷰가 이미 있습니다");
      }
      const review = await prisma.createReview({
        user: {
          connect: { id: user.id }
        },
        product: {
          connect: {
            id: productId
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
