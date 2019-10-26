import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addBlackList: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { userId } = args;
      const black = await prisma.user({ id: userId }).email();
      await prisma.createBlackList({ email: black });
      return await prisma.deleteUser({ id: userId });
    }
  }
};
