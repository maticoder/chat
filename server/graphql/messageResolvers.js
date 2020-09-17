const User = require("../models/User");
const Message = require("../models/Message");
const { UserInputError, AuthenticationError } = require("apollo-server");

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

                messages.forEach((message) => (message.uuid = message.id));
                return messages;
            } catch (err) {
                console.log(err);
                throw err;
            }
        },
    },

    Mutation: {
        sendMessage: async (parent, { to, content }, { user }) => {
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
                });

                message.uuid = message.id;

                return message;
            } catch (err) {
                console.log(err);
                throw err;
            }
        },
    },
};
