import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    publishProduct: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id } = args;
      const { user } = request;
      const admin = await prisma.user({ id: user.id }).admin();
      try {
        if (admin) {
          await prisma.updateProduct({
            where: { id },
            data: { isPublished: false }
          });
          return true;
        } else {
          await prisma.updateProduct({
            where: { id },
            data: { isPublished: true }
          });
          return true;
        }
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  }
};
