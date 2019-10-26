import { prisma } from "../../../generated/prisma-client";

export default {
  Category: {
    product: ({ id }) => prisma.category({ id }).product(),
    superCategory: ({ id }) => prisma.category({ id }).superCategory()
  },
  SuperCategory: {
    category: ({ id }) => prisma.superCategory({ id }).category()
  }
};
