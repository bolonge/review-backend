import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    homeUserReviews: async (_, __, { request }) => {
      const { user } = request;
      const recentData = await prisma.user({ id: user.id }).keyword();
      const mapRecentData = recentData.map((d) => d.search);
      const reviews = await prisma.reviews({
        where: {
          OR: [
            { title_contains: mapRecentData[0] },
            { text_contains: mapRecentData[0] },
          ],
        },
        first: 20,
      });
      if (reviews.length < 20) {
        const secondReviews = await prisma.reviews({
          where: {
            OR: [
              { title_contains: mapRecentData[1] },
              { text_contains: mapRecentData[1] },
            ],
          },
          first: 20,
        });
        return [...reviews, ...secondReviews];
      }
    },
  },
};
