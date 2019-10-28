import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editReview: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { text, rating, reviewId } = args;
      const { user } = request;
      const myReview = await prisma.$exists.user({
        id: user.id,
        myReview_some: { id: reviewId }
      });
      if (!myReview) {
        throw Error("나의 리뷰가아니다");
      }

      const myReviewLike = await prisma
        .likesConnection({ where: { review: { id: reviewId } } })
        .aggregate()
        .count();
      if (myReviewLike > 5) {
        throw Error("수정 x");
      }
      return await prisma.updateReview({
        where: { id: reviewId },
        data: { text, rating }
      });
    }
  }
};
