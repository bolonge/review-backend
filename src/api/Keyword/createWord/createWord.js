import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createWord: async (_, args, { request }) => {
      const { search } = args;
      const { user } = request;
      const exists = await prisma.$exists.keyword({ search });
      try {
        if (!exists) {
          await prisma.createKeyword({ search });
          await prisma.updateUser({
            where: { id: user.id },
            data: { keyword: { connect: { search } } }
          });
          return true;
        } else {
          const pKeyword = await prisma.keyword({ search });
          await prisma.updateUser({
            where: { id: user.id },
            data: { keyword: { connect: { search } } }
          });
          await prisma.updateKeyword({
            where: { search },
            data: { count: pKeyword.count + 1 }
          });
          return true;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
