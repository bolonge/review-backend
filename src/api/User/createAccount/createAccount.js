import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { nickName, phone, email, bio } = args;
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
      await prisma.createUser({
        nickName,
        phone,
        email,
        bio
      });
      return true;
    }
  }
};
