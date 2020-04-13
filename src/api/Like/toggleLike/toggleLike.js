import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    toggleLike: async (_, args, { request, isAuthenticated }) => {
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
        const existingLike = await prisma.$exists.like(filterOptions);
        const existingHate = await prisma.$exists.hate(filterOptions);
        if (existingLike) {
          await prisma.deleteManyLikes(filterOptions);
        } else if (!existingHate) {
          await prisma.createLike({
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
