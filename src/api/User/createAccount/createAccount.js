import { prisma } from "../../../../generated/prisma-client";
import * as bcrypt from "bcryptjs";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { nickName, phone, email, password } = args;
      const hashedPassword = await bcrypt.hash(password, 10);
      const emailExists = await prisma.$exists.user({ email });
      const nickExists = await prisma.$exists.user({ nickName });
      const blackCheck = await prisma.$exists.blackList({ email });
      if (emailExists) {
        return "emailExists";
      }
      if (nickName) {
        return "nickName";
      }
      if (blackCheck) {
        return "blackList";
      }
      await prisma.createUser({
        nickName,
        phone,
        email,
        password: hashedPassword
      });
      return true;
    }
  }
};
