import { generateToken } from "../../../utills";
import { prisma } from "../../../../generated/prisma-client";
import * as bcrypt from "bcryptjs";

export default {
  Mutation: {
    login: async (_, args) => {
      const { NameOrEmail, password, type } = args;
      if (type === "EMAIL") {
        const user = await prisma.user({ email: NameOrEmail });
        if (!user) {
          throw Error("이메일이 없습니다");
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          throw Error("비밀번호 오류");
        }
        return generateToken(user.id);
      } else if (type === "NICKNAME") {
        const user = await prisma.user({ nickName: NameOrEmail });
        if (!user) {
          throw Error("이메일이 없습니다");
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          throw Error("비밀번호 오류");
        }
        return generateToken(user.id);
      }
    }
  }
};
