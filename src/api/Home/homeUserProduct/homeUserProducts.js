import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    homeUserProducts: async (_, __, { request }) => {
      const { user } = request;
      const recentData = await prisma
        .user({ id: user.id })
        .keyword({ orderBy: "updatedAt_DESC" });
      const mapRecentData = recentData.map((d) => d.search);
      const products = await prisma.products({
        where: {
          AND: [
            { isPublished: true },
            {
              OR: [
                { productName_contains: mapRecentData[0] },
                { category: { categoryName_contains: mapRecentData[0] } },
              ],
            },
          ],
        },
        first: 20,
      });

      if (products.length < 20) {
        const secondProducts = await prisma.products({
          where: {
            AND: [
              { isPublished: true },
              { OR: [{ productName_contains: mapRecentData[1] }] },
              { category: { categoryName_contains: mapRecentData[1] } },
            ],
          },
          first: 20,
        });

        const mergeProducts = [...products, ...secondProducts];
        const filterMergeProducts = mergeProducts.filter(
          (item, index, self) =>
            self.map((i) => i.id).indexOf(item.id) === index
        ); //배열안에 오브젝트 중복제거

        if (filterMergeProducts.length === 0) {
          return await prisma.products({
            where: { AND: [{ isPublished: true }] },
            orderBy: "createdAt_DESC",
            first: 20,
          });
        } else {
          return filterMergeProducts;
        }
      }
    },
  },
};
