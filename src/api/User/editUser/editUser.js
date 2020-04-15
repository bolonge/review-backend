import { prisma } from "../../../../generated/prisma-client";
import * as bcrypt from "bcryptjs";

export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { nickName, email } = args;
      const { user } = request;
      if (email === user.email && nickName !== user.nickName) {
        return await prisma.updateUser({
          where: { id: user.id },
          data: { nickName },
        });
      } else if (email !== user.email && nickName === user.nickName) {
        return await prisma.updateUser({
          where: { id: user.id },
          data: { email },
        });
      } else if (email !== user.email && nickName !== user.nickName) {
        return await prisma.updateUser({
          where: { id: user.id },
          data: { email, nickName },
        });
      } else {
        return await prisma.user({ id: user.id });
      }
    },
  },
};
