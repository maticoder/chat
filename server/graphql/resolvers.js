const userResolvers = require("./userResolvers");
const messageResolvers = require("./messageResolvers");
const { mergeSchemas } = require("apollo-server");

const User = require("../models/User");
const Message = require("../models/Message");

const mongoose = require("mongoose");

module.exports = {
    Message: {
        createdAt: (parent) => parent.createdAt.toISOString(),
        uuid: (parent) => parent.id,
    },
    User: {
        createdAt: (parent) => parent.createdAt.toISOString(),
    },
    Reaction: {
        uuid: (parent) => parent.id,
        createdAt: (parent) => parent.createdAt.toISOString(),
        message: async (parent) =>
            await Message.findOne({
                _id: mongoose.Types.ObjectId(parent.messageId),
            }),
        user: async (parent) =>
            await User.findOne({
                _id: mongoose.Types.ObjectId(parent.userId),
            }).select({
                username: 1,
                imageUrl: 1,
                createdAt: 1,
            }),
    },
    Query: {
        ...userResolvers.Query,
        ...messageResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...messageResolvers.Mutation,
    },
    Subscription: {
        ...messageResolvers.Subscription,
    },
};
