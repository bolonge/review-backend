import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    changeAvatar: async (_, args, { request }) => {
      const { avatar } = args;
      const { user } = request;
      try {
        return await prisma.updateUser({
          where: { id: user.id },
          data: { avatar },
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
