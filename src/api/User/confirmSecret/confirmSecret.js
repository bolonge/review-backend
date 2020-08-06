import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    confirmSecret: async (_, args) => {
      const { email, secret } = args;
      const user = await prisma.user({ email });
      if (user.loginSecret === secret) {
        await prisma.updateUser({
          where: { id: user.id },
          data: { loginSecret: "CONFIRM" },
        });
        return true;
      } else {
        throw Error("Wrong email/secret");
      }
    },
  },
};
