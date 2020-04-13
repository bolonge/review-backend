import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    changeAvatar: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { avatar } = args;
      const { user } = request;
      try {
        await prisma.updateUser({ where: { id: user.id }, data: { avatar } });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
