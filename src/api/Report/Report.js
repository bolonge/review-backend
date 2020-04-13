import { prisma } from "../../../generated/prisma-client";

export default {
  Report: {
    user: ({ id }) => prisma.report({ id }).user(),
    comment: ({ id }) => prisma.report({ id }).comment(),
    review: ({ id }) => prisma.report({ id }).review(),
  },
};
