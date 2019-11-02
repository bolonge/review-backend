import { generateToken } from "../../../utills";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    login: async (_, args) => {
      const { email, bio } = args;
      const user = await prisma.user({ email });
      if (bio === true) {
        await prisma.updateUser({ where: { id: user.id }, data: { bio } });
        return generateToken(user.id);
      } else {
        throw Error("로그인할수없습니다");
      }
    }
  }
};
