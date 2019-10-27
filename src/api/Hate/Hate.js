import { prisma } from "../../../generated/prisma-client";

export default {
  Hate: {
    user: ({ id }) => prisma.hate({ id }).user(),
    review: ({ id }) => prisma.hate({ id }).review()
  }
};
