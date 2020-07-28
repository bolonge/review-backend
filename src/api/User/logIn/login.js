import { generateToken } from "../../../utills";
import { prisma } from "../../../../generated/prisma-client";
import * as bcrypt from "bcryptjs";

export default {
  Mutation: {
    login: async (_, args) => {
      const { NameOrEmail, password, type } = args;
      let error = "";
      if (type === "EMAIL") {
        const user = await prisma.user({ email: NameOrEmail });
        if (!user) {
          return (error = "이메일이 없습니다");
        } else {
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            return (error = "비밀번호 오류");
          }
        }
        if (error === "이메일이 없습니다" || error === "비밀번호 오류") {
          throw Error("로그인 할 수 없습니다");
        } else {
          if (user.loginSecret === "CONFIRM") {
            return generateToken(user.id);
          } else {
            return (error = "이메일인증을 해야합니다");
          }
        }
      } else if (type === "NICKNAME") {
        const user = await prisma.user({ nickName: NameOrEmail });
        if (!user) {
          return (error = "유저이름이 없습니다");
        } else {
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            return (error = "비밀번호 오류");
          }
        }
        if (error === "유저이름이 없습니다" || error === "비밀번호 오류") {
          throw Error("로그인 할 수 없습니다");
        } else {
          if (user.loginSecret === "CONFIRM") {
            return generateToken(user.id);
          } else {
            return (error = "이메일인증을 해야합니다");
          }
        }
      }
    },
  },
};
