import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    deleteAccount: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      try {
        await prisma.deleteUser({ id: user.id });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
