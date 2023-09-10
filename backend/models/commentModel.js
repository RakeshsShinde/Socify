const mongoose = require('mongoose');
const { Schema } = mongoose;


const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    commentBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],

    replies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Replay",
        }
    ],
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },


}, { timestamps: true })

module.exports = mongoose.model('Comment', commentSchema);



