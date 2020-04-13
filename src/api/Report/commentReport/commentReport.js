import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    commentReport: async (_, args, { request }) => {
      const { commentId, why } = args;
      const { user } = request;
      const exists = await prisma.$exists.comment({ id: commentId });
      try {
        if (exists) {
          await prisma.createReport({
            why,
            user: { connect: { id: user.id } },
            comment: { connect: { id: commentId } },
          });
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
