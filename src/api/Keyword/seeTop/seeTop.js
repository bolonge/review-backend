import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeTop: async () => {
      return await prisma.keywords({
        where: { count_gt: 1 },
        orderBy: "count_DESC"
      });
    }
  }
};
