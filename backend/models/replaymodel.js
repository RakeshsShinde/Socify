const mongoose = require('mongoose');
const { Schema } = mongoose;


const replaySchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    replayBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,

    },
    comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        required: true,
    },

}, { timestamps: true })


module.exports = mongoose.model('Replay', replaySchema)