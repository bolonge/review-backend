import { secretThings, sendSecretMail } from "../../../utills";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    requestSecret: async (_, args) => {
      const { email } = args;
      const exist = await prisma.$exists.user({ email });
      const loginSecret = secretThings();
      try {
        if (exist) {
          await sendSecretMail(email, loginSecret);
          await prisma.updateUser({
            data: { loginSecret: loginSecret },
            where: { email },
          });
          return true;
        } else {
          return false;
        }
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
