const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'please eneter username '],
        minlength: [6, 'should be more than 6 character'],
        maxlength: [12, 'should less than 12 characters '],
    },
    email: {
        type: String,
        required: [true, 'please eneter email '],
        unique: [true, 'Email already exists '],
        validate: {
            validator: function (value) {
                const regexEmail = /^\S+@\S+\.\S+$/;
                return regexEmail.test(value);
            },
            message: 'please enter valid email',

        }
    },
    password: {
        type: String,
        required: [true, 'please eneter password '],

    },

    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],

    Bio: {
        type: String,
        default: 'hi ,welcome to my Profile'
    },

    saved: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],

    profilePic: {
        public_id: String,
        secure_url: String,
    },

    followers: [
        {
            type: String,
            ref: "User",
        }
    ],
    following: [
        {
            type: String,
            ref: "User",
        }
    ],

    resetPasswordToken: String,
    resetPasswordExpiry: Date,


}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})


userSchema.methods.comparePassword = async function (enterpassword) {
    return await bcrypt.compare(enterpassword, this.password);
}

userSchema.methods.generateToken = async function () {
    return await jwt.sign({ id: this._id }, process.env.SECRET_KEY, { expiresIn: '2d' })
}

userSchema.methods.generateResetToken = function () {
    const resetToken = crypto.randomBytes(16).toString("hex");
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest("hex");
    this.resetPasswordExpiry = Date.now() + 10 * 60 * 1000;
    return resetToken;
}

module.exports = mongoose.model('User', userSchema);