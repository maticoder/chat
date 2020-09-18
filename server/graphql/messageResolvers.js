const User = require("../models/User");
const Message = require("../models/Message");
const Reaction = require("../models/Reaction");
const {
    UserInputError,
    AuthenticationError,
    ForbiddenError,
    withFilter,
} = require("apollo-server");
const mongoose = require("mongoose");

module.exports = {
    Query: {
        getMessages: async (parent, { from }, { user }) => {
            try {
                if (!user) throw new AuthenticationError("unauthenticated");

                const otherUser = await User.findOne({
                    username: from,
                });

                if (!otherUser) throw new UserInputError("user not found");

                const usernames = [user.username, otherUser.username];

                const messages = await Message.find({
                    from: {
                        $in: usernames,
                    },
                    to: {
                        $in: usernames,
                    },
                }).sort({
                    createdAt: -1,
                });

                // messages.forEach((message) => (message.uuid = message.id));
                const reactions = await Reaction.find({});

                messages.forEach((message) => {
                    message.reactions = [];
                    reactions.forEach((reaction) => {
                        if (reaction.messageId === message.id) {
                            message.reactions.push(reaction);
                        }
                    });
                });

                return messages;
            } catch (err) {
                console.log(err);
                throw err;
            }
        },
    },

    Mutation: {
        sendMessage: async (parent, { to, content }, { user, pubsub }) => {
            try {
                if (!user) {
                    throw new AuthenticationError("unauthenticated");
                }

                const recipient = await User.findOne({
                    username: to,
                });

                if (!recipient) {
                    throw new UserInputError("user not found");
                } else if (recipient.username === user.username) {
                    throw new UserInputError("you cant message yourself");
                }

                if (content.trim() === "") {
                    throw new UserInputError("message is empty");
                }

                const message = await Message.create({
                    from: user.username,
                    to,
                    content,
                    createdAt: Date.now(),
                });

                pubsub.publish("NEW_MESSAGE", {
                    newMessage: message,
                });

                // message.uuid = message.id;

                return message;
            } catch (err) {
                console.log(err);
                throw err;
            }
        },
        reactToMessage: async (_, { uuid, content }, { user, pubsub }) => {
            const reactions = ["💚", "😆", "😯", "😢", "😡", "👍", "👎"];

            try {
                // Validate reaction content
                if (!reactions.includes(content)) {
                    throw new UserInputError("invalid reaction");
                }

                // Get user
                const username = user ? user.username : "";
                user = await User.findOne({ username });
                if (!user) throw new AuthenticationError("unauthenticated");

                // Get message
                const message = await Message.findOne({
                    _id: new mongoose.Types.ObjectId(uuid),
                });
                if (!message) throw new UserInputError("message not found");

                if (
                    message.from !== user.username &&
                    message.to !== user.username
                ) {
                    throw new ForbiddenError("unauthorized");
                }

                let reaction = await Reaction.findOne({
                    messageId: message.id,
                    userId: user.id,
                });

                if (reaction) {
                    // Reaction exists, update it
                    reaction.content = content;
                    await reaction.save();
                } else {
                    // Reaction doesnt exists, create it
                    reaction = await Reaction.create({
                        messageId: message.id,
                        userId: user.id,
                        content,
                        createdAt: Date.now(),
                    });
                }

                // reaction.uuid = reaction.id;

                pubsub.publish("NEW_REACTION", { newReaction: reaction });

                return reaction;
            } catch (err) {
                throw err;
            }
        },
    },
    Subscription: {
        newMessage: {
            subscribe: withFilter(
                (_, __, { pubsub, user }) => {
                    if (!user) throw new AuthenticationError("unauthenticated");
                    return pubsub.asyncIterator("NEW_MESSAGE");
                },
                ({ newMessage }, _, { user }) => {
                    if (
                        newMessage.from === user.username ||
                        newMessage.to === user.username
                    ) {
                        return true;
                    }

                    return false;
                }
            ),
        },
        newReaction: {
            subscribe: withFilter(
                (_, __, { pubsub, user }) => {
                    if (!user) throw new AuthenticationError("unauthenticated");
                    return pubsub.asyncIterator("NEW_REACTION");
                },
                async ({ newReaction }, _, { user }) => {
                    const message = await Message.findOne({
                        _id: mongoose.Types.ObjectId(newReaction.messageId),
                    });
                    if (
                        message.from === user.username ||
                        message.to === user.username
                    ) {
                        return true;
                    }

                    return false;
                }
            ),
        },
    },
};
