const userResolvers = require("./userResolvers");
const messageResolvers = require("./messageResolvers");
const { mergeSchemas } = require("apollo-server");

module.exports = {
    Query: {
        ...userResolvers.Query,
        ...messageResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...messageResolvers.Mutation,
    },
};
