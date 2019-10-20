import { prisma } from "../../../generated/prisma-client";

export default {
  Review: {
    likeCount: parent =>
      prisma
        .likesConnection({ where: { review: { id: parent.id } } })
        .aggregate()
        .count(),
    hateCount: parent =>
      prisma
        .hatesConnection({ where: { review: { id: parent.id } } })
        .aggregate()
        .count()
  }
};
