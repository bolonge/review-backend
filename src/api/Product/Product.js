import { prisma } from "../../../generated/prisma-client";

export default {
  Product: {
    reviews: ({ id }) => prisma.product({ id }).reviews(),
    category: ({ id }) => prisma.product({ id }).category()
  }
};
