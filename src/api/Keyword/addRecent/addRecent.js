import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addRecent: async (_, args, { request }) => {
      const { search } = args;
      const { user } = request;
      try {
        await prisma.updateUser({
          where: { id: user.id },
          data: { keyword: { connect: { search } } }
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
