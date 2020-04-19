import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchProduct: async (_, args) => {
      const products = await prisma.products({
        where: {
          AND: [{ isPublished: true }, { productName_contains: args.term }]
        }
      });
      if (products) {
        return (
          products,
          await prisma.products({
            where: {
              OR: [
                { productName_starts_with: args.term },
                {
                  category: {
                    categoryName_contains: args.term
                  }
                },
                {
                  category: {
                    superCategory: { superCategoryName_contains: args.term }
                  }
                }
              ]
            }
          })
        );
      } else {
        await prisma.products({
          where: {
            OR: [
              { productName_starts_with: args.term },
              {
                category: {
                  categoryName_contains: args.term
                }
              },
              {
                category: {
                  superCategory: { superCategoryName_contains: args.term }
                }
              }
            ]
          }
        });
      }
    }
  }
};
