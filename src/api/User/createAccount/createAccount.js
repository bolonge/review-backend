import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { nickName, phone, email } = args;
      const exists = await prisma.$exists.user({
        OR: [
          {
            nickName
          },
          { email }
        ]
      });
      if (exists) {
        throw Error("This nickName / email is already taken");
      }
      const blackCheck = await prisma.$exists.blackList({ email });
      if (blackCheck) {
        throw Error("블랙리스트 회원");
      }
      await prisma.createUser({
        nickName,
        phone,
        email
      });
      return true;
    }
  }
};
