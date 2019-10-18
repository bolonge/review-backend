import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";

export default {
  Mutation: {
    deleteAccount: async (_, args, { request }) => {
      isAuthenticated(request);
      const { email, nickName } = args;

      await prisma.deleteUser({});
    }
  }
};
