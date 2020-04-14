import { prisma } from "../../../../generated/prisma-client";
import * as bcrypt from "bcryptjs";

export default {
  Mutation: {
    editPassword: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { password } = args;
      const { user } = request;
      const hashedPassword = await bcrypt.hash(password, 10);
      try {
        await prisma.updateUser({
          where: { id: user.id },
          data: { password: hashedPassword },
        });
        return true;
      } catch (error) {
        return false;
      }
    },
  },
};
