import { prisma } from "../../../../generated/prisma-client";
import * as bcrypt from "bcryptjs";

export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { nickName, email } = args;
      const { user } = request;
      const exists = await prisma.user({ email });
      if (exists) {
        return Error("이메일중복");
      }
      return await prisma.updateUser({
        where: { id: user.id },
        data: { nickName, email },
      });
    },
  },
};
