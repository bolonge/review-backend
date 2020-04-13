import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeReported: async (_, __) => {
      return await prisma.reports({ orderBy: "createdAt_DESC" });
    },
  },
};
