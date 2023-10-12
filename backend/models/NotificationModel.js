const mongoose = require('mongoose');
const { Schema } = mongoose;

const notificationSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    recipients: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    desc: {
        type: String,
        required: true,
    },
    message: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    isRead: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true })

module.exports = mongoose.model('Notification', notificationSchema);