import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    reviewReport: async (_, args, { request }) => {
      const { reviewId, why } = args;
      const { user } = request;
      const exists = await prisma.$exists.review({ id: reviewId });
      try {
        if (exists) {
          await prisma.createReport({
            why,
            user: { connect: { id: user.id } },
            review: { connect: { id: reviewId } },
          });
          return true;
        } else {
          console.log("존재하지않습니다");
          return false;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
