import { prisma } from "../../../../generated/prisma-client";
import * as bcrypt from "bcryptjs";

export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { nickName, email } = args;
      const { user } = request;
      return prisma.updateUser({
        where: { id: user.id },
        data: { nickName, email }
      });
    }
  }
};
