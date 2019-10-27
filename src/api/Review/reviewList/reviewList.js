import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    reviewList: async (_, __) => await prisma.reviews({})
  }
};
