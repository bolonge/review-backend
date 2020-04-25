import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    homeUserProducts: async (_, __, { request }) => {
      const { user } = request;
      const recentData = await prisma.user({ id: user.id }).keyword();
      const mapRecentData = recentData.map((d) => d.search);
      const products = await prisma.products({
        where: {
          AND: [
            { isPublished: true },
            { OR: [{ productName_contains: mapRecentData[0] }] },
          ],
        },
        first: 20,
      });

      if (products.length < 20) {
        const secondProduct = await prisma.products({
          where: {
            AND: [
              { isPublished: true },
              { OR: [{ productName_contains: mapRecentData[1] }] },
            ],
          },
          first: 20,
        });
        return [...products, ...secondProduct];
      }
    },
  },
};
