import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeUnPublish: async (_, __) =>
      await prisma.products({
        where: { isPublished: true },
        orderBy: "productName_DESC"
      })
  }
};
