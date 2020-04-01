import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    delRecent: async (_, args, { request }) => {
      const { id } = args;
      const { user } = request;
      try {
        await prisma.updateUser({
          where: { id: user.id },
          data: { keyword: { disconnect: { id } } }
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
