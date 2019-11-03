import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    adminCheck: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { id, admin } = args;
      const adminUser = await prisma.user({ id: user.id }).admin();
      if (adminUser) {
        return await prisma.updateUser({ where: { id }, data: { admin } });
      } else {
        throw Error("권한이 없습니다");
      }
    }
  }
};
