import * as bcrypt from "bcryptjs";

export default {
  Mutation: {
    checkPassword: async (_, args, { request }) => {
      const { password } = args;
      const { user } = request;
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        return true;
      } else {
        return false;
      }
    }
  }
};
