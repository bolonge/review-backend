import { prisma } from "../../../../generated/prisma-client";
import * as bcrypt from "bcryptjs";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { nickName, phone, email, password } = args;
      const hashedPassword = await bcrypt.hash(password, 10);
      const exists = await prisma.$exists.user({
        OR: [
          {
            nickName
          },
          { email }
        ]
      });
      const blackCheck = await prisma.$exists.blackList({ email });
      if (exists) {
        throw Error("This nickName / email is already taken");
      }
      if (blackCheck) {
        throw Error("블랙리스트 회원");
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
