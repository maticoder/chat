const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const { URL } = require("./config/env.json");

const connect = async () => {
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("db connected");
    } catch (err) {
        console.log("something went wrong");
    }
};

module.exports = connect;
