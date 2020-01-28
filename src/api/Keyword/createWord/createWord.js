import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createWord: async (_, args) => {
      const { search } = args;
      const exists = await prisma.$exists.keyword({ search });
      try {
        if (!exists) {
          await prisma.createKeyword({ search });
          return true;
        } else {
          const keyword = await prisma.keyword({ search });
          await prisma.updateKeyword({
            where: { search },
            data: { count: keyword.count + 1 }
          });
          return true;
        }
      } catch (error) {
        return false;
      }
    }
  }
};
