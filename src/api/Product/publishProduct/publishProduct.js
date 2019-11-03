import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    publishProduct: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id } = args;
      const { user } = request;
      const admin = await prisma.user({ id: user.id }).admin();
      const publishCheck = await prisma.products({
        where: {
          AND: [{ id }, { OR: [{ isPublished: false }, { isPublished: true }] }]
        }
      });
      if (admin) {
        if (publishCheck[0].isPublished === false) {
          await prisma.updateProduct({
            where: { id },
            data: { isPublished: true }
          });
        } else {
          await prisma.updateProduct({
            where: { id },
            data: { isPublished: false }
          });
        }
        return true;
      } else {
        return false;
      }
    }
  }
};
