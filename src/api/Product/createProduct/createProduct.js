import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createProduct: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { productName, productPhoto } = args;
      const product = await prisma.createProduct({
        user: { connect: { id: user.id } },
        productName
      });
      productPhoto = await prisma.createPhoto({
        url: productPhoto,
        product: { connect: { id: product.id } }
      });
      return product;
    }
  }
};
