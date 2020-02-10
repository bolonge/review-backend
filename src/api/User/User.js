import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    myReview: ({ id }) => prisma.user({ id }).myReview(),
    myProduct: ({ id }) => prisma.user({ id }).myProduct(),
    myLike: ({ id }) => prisma.user({ id }).myLike(),
    myHate: ({ id }) => prisma.user({ id }).myHate(),
    reviewCount: ({ id }) =>
      prisma
        .reviewsConnection({ where: { user: { id } } })
        .aggregate()
        .count(),
    productCount: ({ id }) =>
      prisma
        .productsConnection({ where: { user: { id } } })
        .aggregate()
        .count(),
    isSelf: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    }
  }
};
