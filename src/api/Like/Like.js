import { prisma } from "../../../generated/prisma-client";

export default {
  Hate: {
    user: ({ id }) => prisma.like({ id }).user(),
    review: ({ id }) => prisma.like({ id }).review()
  }
};
