import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addComment: async (_, args, { request }) => {
      isAuthenticated(request);
      const { reviewId, text } = args;
      const { user } = request;
      return await prisma.createComment({
        user: { connect: { id: user.id } },
        review: { connect: { id: reviewId } },
        text
      });
    }
  }
};
