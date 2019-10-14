import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { nickName, phone, email, bio } = args;
      const user = await prisma.createUser({
        nickName,
        phone,
        email,
        bio
      });
      return user;
    }
  }
};
