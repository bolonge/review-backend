import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";
import * as bcrypt from "bcryptjs";

export default {
  Mutation: {
    changeAvatar: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { email, password } = args;
      const hashedPassword = await bcrypt.hash(password, 10);
      const comfirmCheck = await prisma.user({ email }).loginSecret();
      try {
        if (comfirmCheck === "CONFIRM") {
          await prisma.updateUser({
            where: { email },
            data: { password: hashedPassword },
          });
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
