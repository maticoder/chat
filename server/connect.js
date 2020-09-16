const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const url =
    "mongodb+srv://mati:Mati9898@mycluster.actrw.mongodb.net/<dbname>?retryWrites=true&w=majority";

const connect = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("db connected");
    } catch (err) {
        console.log("something went wrong");
    }
};

module.exports = connect;
