import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createProduct: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { productName, categoryId } = args;
      const exists = await prisma
        .user({ id: user.id })
        .myProduct({ where: { isPublished: false } });
      if (exists.length === 0) {
        const product = await prisma.createProduct({
          user: { connect: { id: user.id } },
          productName,
          category: { connect: { id: categoryId } },
        });
        return product;
      } else {
        return null;
      }
    },
  },
};
