const userResolvers = require("./userResolvers");
const messageResolvers = require("./messageResolvers");
const { mergeSchemas } = require("apollo-server");

module.exports = {
    Message: {
        createdAt: (parent) => parent.createdAt.toISOString(),
        uuid: (parent) => parent.id,
    },
    Query: {
        ...userResolvers.Query,
        ...messageResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...messageResolvers.Mutation,
    },
};
