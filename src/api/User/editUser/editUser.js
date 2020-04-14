import { prisma } from "../../../../generated/prisma-client";
import * as bcrypt from "bcryptjs";

export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      const { nickName, email } = args;
      const { user } = request;
      const exists = await prisma.user({ email });
      if (exists) {
        return email;
      }
      return prisma.updateUser({
        where: { id: user.id },
        data: { nickName, email },
      });
    },
  },
};
