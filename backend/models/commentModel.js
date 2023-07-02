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
    replies: [
        {
            type: String,
            ref: "User",
        }
    ],
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },


}, { timestamps: true })

module.exports = mongoose.model('Comment', commentSchema);



