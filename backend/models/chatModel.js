const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    chatName: {
        type: String,
        required: true,
    },
    isgroupChat: {
        type: Boolean,
        default: false,
    },
    profilePic: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, { timestamps: true });

module.exports = mongoose.model("Chat", chatSchema);