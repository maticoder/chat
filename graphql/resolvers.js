const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { UserInputError } = require("apollo-server");

module.exports = {
    Query: {
        getUsers: async () => {
            try {
                const users = await User.find({});
                return users;
            } catch (err) {
                console.log(err);
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
