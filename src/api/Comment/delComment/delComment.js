import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    delComment: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id } = args;
      const { user } = request;
      const commentUser = await prisma.comment({ id }).user();
      try {
        if (commentUser.id === user.id) {
          await prisma.deleteComment({ id });
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
