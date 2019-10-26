import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeUser: async (_, args) => {
      const { nickName } = args;
      return await prisma.user({ nickName });
    }
  }
};
