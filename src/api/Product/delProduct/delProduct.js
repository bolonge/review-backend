import { prisma } from "../../../../generated/prisma-client";


export default {
    Mutation: {
        delProduct: async (_, args) => {
        const { postId } = args;
        await prisma.deleteProduct({
          id:postId
        });
        return true;
      }
    }
  };