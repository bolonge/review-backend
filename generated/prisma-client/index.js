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
    name: "Brand",
    embedded: false
  },
  {
    name: "Keyword",
    embedded: false
  },
  {
    name: "Review",
    embedded: false
  },
  {
    name: "Comment",
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
  },
  {
    name: "Category",
    embedded: false
  },
  {
    name: "SuperCategory",
    embedded: false
  },
  {
    name: "Report",
    embedded: false
  },
  {
    name: "Suggestion",
    embedded: false
  },
  {
    name: "BlackList",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `${process.env["PRISMA__ENDPOINT"]}`
});
exports.prisma = new exports.Prisma();
