const User = require("../models/User");
const Message = require("../models/Message");
const bcrypt = require("bcryptjs");
const { UserInputError, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env.json");

module.exports = {
    Query: {
        getUsers: async (_, __, { user }) => {
            try {
                if (!user) {
                    throw new AuthenticationError("unauthenticated");
                }

                let users = await User.find({
                    $nor: [
                        {
                            username: user.username,
                        },
                    ],
                }).select({
                    username: 1,
                    imageUrl: 1,
                    createdAt: 1,
                });

                const allUserMessages = await Message.find({
                    $or: [
                        {
                            from: user.username,
                        },
                        {
                            to: user.username,
                        },
                    ],
                }).sort({
                    createdAt: -1,
                });

                users = users.map((otherUser) => {
                    const latestMessage = allUserMessages.find(
                        (m) =>
                            m.from === otherUser.username ||
                            m.to === otherUser.username
                    );

                    otherUser.latestMessage = latestMessage;
                    return otherUser;
                });

                return users;
            } catch (err) {
                console.log(err);
                throw err;
            }
        },
        login: async (_, args) => {
            const { username, password } = args;
            const errors = {};

            try {
                if (username.trim() === "")
                    errors.username = "username must not be empty";
                if (password === "")
                    errors.password = "password must not be empty";

                if (Object.keys(errors).length > 0) {
                    throw new UserInputError("bad input", { errors });
                }

                const user = await User.findOne({
                    username,
                });

                if (!user) {
                    errors.username = "user not found";
                    throw new UserInputError("user not found", { errors });
                }

                const correctPassword = await bcrypt.compare(
                    password,
                    user.password
                );

                if (!correctPassword) {
                    errors.password = "password is incorrect";
                    throw new UserInputError("password is incorrect", {
                        errors,
                    });
                }

                const token = jwt.sign(
                    {
                        username,
                    },
                    JWT_SECRET,
                    { expiresIn: 60 * 60 }
                );

                return {
                    ...user.toJSON(),
                    createdAt: user.createdAt.toISOString(),
                    token,
                };
            } catch (err) {
                console.log(err);
                throw err;
            }
        },
    },
    Mutation: {
        register: async (_, args) => {
            let { username, email, password, confirmPassword } = args;
            let errors = {};

            try {
                // Validate input data
                if (email.trim() === "")
                    errors.email = "email must not be empty";
                if (username.trim() === "")
                    errors.username = "username must not be empty";
                if (password.trim() === "")
                    errors.password = "password must not be empty";
                if (confirmPassword.trim() === "")
                    errors.confirmPassword =
                        "confirm password must not be empty";

                if (password !== confirmPassword)
                    errors.confirmPassword = "passwords must match";

                // Check if username / email exists
                const userByUsername = await User.findOne({
                    username,
                });
                const userByEmail = await User.findOne({
                    email,
                });

                if (userByUsername) errors.username = "username is taken";
                if (userByEmail) errors.email = "email is taken";

                if (Object.keys(errors).length > 0) {
                    throw errors;
                }

                // Hash password
                password = await bcrypt.hash(password, 6);

                // Create user
                const user = await User.create({
                    username,
                    email,
                    password,
                });

                // Return user
                return user;
            } catch (err) {
                if (err.name === "ValidationError") {
                    errors.general = "Validation problem";
                }
                throw new UserInputError("Bad input", { errors });
            }
        },
    },
};
