"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "Product",
    embedded: false
  },
  {
    name: "Review",
    embedded: false
  },
  {
    name: "Like",
    embedded: false
  },
  {
    name: "Hate",
    embedded: false
  },
  {
    name: "Photo",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://us1.prisma.sh/kooham/review-backend/dev`
});
exports.prisma = new exports.Prisma();
