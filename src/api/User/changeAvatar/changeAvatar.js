import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    changeAvatar: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { avatar } = args;
      const { user } = request;
      return await prisma.updateUser({
        where: { id: user.id },
        data: { avatar },
      });
    },
  },
};
