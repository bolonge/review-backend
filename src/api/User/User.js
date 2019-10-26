import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    reviewCount: ({ id }) =>
      prisma
        .reviewsConnection({ where: { user: { id } } })
        .aggregate()
        .count(),
    isSelf: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    }
  }
};
