import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";
import * as bcrypt from "bcryptjs";

export default {
  Mutation: {
    changeAvatar: async (_, args) => {
      isAuthenticated(request);
      const { email, password } = args;
      const { user } = request;
      const hashedPassword = await bcrypt.hash(password, 10);
      const comfirmCheck = await prisma.user({ email }).loginSecret();
      try {
        await prisma.updateUser({
          where: { id: user.id },
          data: { password: hashedPassword }
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
