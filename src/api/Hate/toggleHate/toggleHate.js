import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    toggleHate: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { reviewId } = args;
      const { user } = request;
      const filterOptions = {
        AND: [
          {
            user: {
              id: user.id,
            },
          },
          {
            review: {
              id: reviewId,
            },
          },
        ],
      };
      try {
        const existingHate = await prisma.$exists.hate(filterOptions);
        const existingLike = await prisma.$exists.like(filterOptions);
        if (existingHate) {
          await prisma.deleteManyHates(filterOptions);
        } else if (!existingLike) {
          await prisma.createHate({
            user: {
              connect: {
                id: user.id,
              },
            },
            review: {
              connect: {
                id: reviewId,
              },
            },
          });
        }
        return true;
      } catch (e) {
        return false;
      }
    },
  },
};
