import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createWord: async (_, args) => {
      const { search } = args;
      const exists = await prisma.$exists.keyword({ search });
      if (!exists) {
        return await prisma.createKeyword({ search });
      } else {
        const keyword = await prisma.keyword({ search });
        return await prisma.updateKeyword({
          where: { search },
          data: { count: keyword.count + 1 }
        });
      }
    }
  }
};
