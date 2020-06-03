import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addSuggestion: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { text } = args;
      const { user } = request;
      try {
        await prisma.createSuggestion({
          text,
          user: { connect: { id: user.id } },
        });
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
