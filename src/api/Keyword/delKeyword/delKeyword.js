import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    delKeyword: async (_, args) => {
      const { id } = args;
      return await prisma.deleteKeyword({ id });
    }
  }
};
