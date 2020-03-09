import { prisma } from "../../../../generated/prisma-client";

const DELETE = "DELETE";
const EDIT = "EDIT";

export default {
  Mutation: {
    editReview: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { title, text, rating, reviewId, action } = args;
      const { user } = request;
      const review = await prisma.$exists.review({
        id: reviewId,
        user: { id: user.id }
      });
      if (review) {
        if (action === EDIT) {
          return await prisma.updateReview({
            where: { id: reviewId },
            data: { title, text, rating }
          });
        } else if (action === DELETE) {
          return await prisma.deleteReview({ id: reviewId });
        }
      } else {
        throw Error("권한이없습니다");
      }
    }
  }
};
