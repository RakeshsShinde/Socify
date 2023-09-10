const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    caption: {
        type: String,
        required: true,
    },
    location: {
        type: String,
    },

    tags: [String],
    images: [
        {
            public_id: String,
            secure_url: String,
        }
    ],
    postBy: {
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
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    saveBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    }

})


module.exports = mongoose.model('Post', postSchema);
