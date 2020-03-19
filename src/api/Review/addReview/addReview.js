import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addReview: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { title, text, rating, productId, photos } = args;
      const { user } = request;

      const review = await prisma.createReview({
        title,
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
      if (photos) {
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
      }

      return review;
    }
  }
};
