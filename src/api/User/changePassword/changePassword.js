import { prisma } from "../../../../generated/prisma-client";
import * as bcrypt from "bcryptjs";

export default {
  Mutation: {
    changePassword: async (_, args) => {
      const { email, password } = args;
      const hashedPassword = await bcrypt.hash(password, 10);
      const comfirmCheck = await prisma.user({ email }).loginSecret();
      try {
        if (comfirmCheck === "CONFIRM") {
          return await prisma.updateUser({
            where: { email },
            data: { password: hashedPassword },
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
