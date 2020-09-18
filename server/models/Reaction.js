const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    messageId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model("Reaction", reactionSchema);
