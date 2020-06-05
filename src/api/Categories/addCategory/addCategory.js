import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addCategory: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { scId, categoryName } = args;
      try {
        await prisma.createCategory({
          categoryName,
          superCategory: { connect: { id: scId } },
        });
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
