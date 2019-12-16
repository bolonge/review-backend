import { prisma } from "../../../../generated/prisma-client";     

export default {
  Query: {
    seeUnPublish: async (_, __) =>
      await prisma.products({
        where: { isPublished: false },
        orderBy: "createdAt_DESC"
      })
  }
};
