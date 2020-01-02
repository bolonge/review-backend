import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeTop: async () => {
      const allKeyword = await prisma.keywords({
        where: { count_gt: 1 },
        orderBy: "count_DESC"
      });
      return allKeyword.splice(0, 10);
    }
  }
};
