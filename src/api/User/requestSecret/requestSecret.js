import { secretThings, sendSecretMail } from "../../../utills";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    requestSecret: async (_, args) => {
      const { email } = args;
      const loginSecret = secretThings();
      try {
        await sendSecretMail(email, loginSecret);
        await prisma.updateUser({
          data: { loginSecret: loginSecret },
          where: { email }
        });
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  }
};
