import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchProduct: async (_, args) => {
      const products = await prisma.products({
        where: {
          AND: [
            { isPublished: true },
            {
              OR: [
                {
                  productName_contains: args.term,
                },
                {
                  category_every: {
                    categoryName_contains: args.term,
                  },
                },
                {
                  category_every: {
                    superCategory: { superCategoryName_contains: args.term },
                  },
                },
              ],
            },
          ],
        },
      });
      if (products) {
        return products;
      } else {
        return await prisma.products({
          where: {
            AND: [
              { isPublished: true },
              {
                OR: [
                  { productName_starts_with: args.term },
                  {
                    category_every: {
                      categoryName_contains: args.term,
                    },
                  },
                  {
                    category_every: {
                      superCategory: { superCategoryName_contains: args.term },
                    },
                  },
                ],
              },
            ],
          },
        });
      }
    },
  },
};
