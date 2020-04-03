import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    checkNick: async (_, args) => {
      const { nickName } = args;
      return await prisma.$exists.user({ nickName });
    }
  }
};
