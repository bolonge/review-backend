import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    checkNick: async (_, args, { request }) => {
      const { nickName } = args;
      const { user } = request;
      const myName = await prisma.user({ id: user.id }).nickName();
      if (myName === nickName) {
        return false;
      } else {
        return await prisma.$exists.user({ nickName });
      }
    }
  }
};
