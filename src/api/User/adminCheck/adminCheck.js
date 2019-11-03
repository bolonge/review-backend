import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    adminCheck: async (_, args) => {
      const { id, admin } = args;
      return await prisma.updateUser({ where: { id }, data: { admin } });
    }
  }
};
