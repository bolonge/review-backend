import { prisma } from "../../../generated/prisma-client";

export default {
  Review: {
    user: ({ id }) => prisma.review({ id }).user(),
    likes: ({ id }) => prisma.review({ id }).likes(),
    hates: ({ id }) => prisma.review({ id }).hates(),
    reviewPhotos: ({ id }) => prisma.review({ id }).reviewPhotos(),
    product: ({ id }) => prisma.review({ id }).product(),
    comments: ({ id }) => prisma.review({ id }).comments(),
    likeCount: parent =>
      prisma
        .likesConnection({ where: { review: { id: parent.id } } })
        .aggregate()
        .count(),
    hateCount: parent =>
      prisma
        .hatesConnection({ where: { review: { id: parent.id } } })
        .aggregate()
        .count(),
    commentCount: parent =>
      prisma
        .commentsConnection({ where: { review: { id: parent.id } } })
        .aggregate()
        .count()
  }
};
