import { generateToken } from "../../../utills";

export default {
  Mutation: {
    adminLogin: async (_, args) => {
      const { password } = args;
      if (password === process.env.ADMIN_PASSWORD) {
        return generateToken(password);
      } else {
        throw Error("비밀번호 오류");
      }
    }
  }
};
