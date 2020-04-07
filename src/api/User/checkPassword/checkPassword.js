import * as bcrypt from "bcryptjs";

export default {
  Mutation: {
    checkPassword: async (_, args, { request }) => {
      const { password } = args;
      const { user } = request;
      return await bcrypt.compare(password, user.password);
    }
  }
};
