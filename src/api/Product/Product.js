import { prisma } from "../../../generated/prisma-client";

export default {
  Product: {
    user: ({ id }) => prisma.product({ id }).user(),
    productPhoto: ({ id }) => prisma.product({ id }).productPhoto(),
    reviews: ({ id }) => prisma.product({ id }).reviews(),
    category: ({ id }) => prisma.product({ id }).category(),
    reviewCount: (parent) =>
      prisma
        .reviewsConnection({ where: { product: { id: parent.id } } })
        .aggregate()
        .count(),
  },
};
