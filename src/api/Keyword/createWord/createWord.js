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
          const keyword = await prisma.keyword({ search });
          await prisma.updateKeyword({
            where: { search },
            data: { count: keyword.count + 1 }
          });
          await prisma.updateUser({
            where: { id: user.id },
            data: { keyword: { connect: { search } } }
          });
          return true;
        }
      } catch (error) {
        return false;
      }
    }
  }
};
