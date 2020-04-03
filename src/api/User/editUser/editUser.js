import { prisma } from "../../../../generated/prisma-client";
import * as bcrypt from "bcryptjs";

export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { nickName, phone } = args;
      const { user } = request;
      const hashedPassword = await bcrypt.hash(password, 10);
      return prisma.updateUser({
        where: { id: user.id },
        data: { nickName, phone, password: hashedPassword }
      });
    }
  }
};
