import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createProduct: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { productName, productPhotos, categoryId } = args;
      const product = await prisma.createProduct({
        user: { connect: { id: user.id } },
        productName,
        category: { connect: { id: categoryId } }
      });

      productPhotos.forEach(async photo => {
        await prisma.createPhoto({
          url: photo,
          product: { connect: { id: product.id } }
        });
      });
      return product;
    }
  }
};
