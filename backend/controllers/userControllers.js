const User = require('../models/Usermodel');
const sendcookie = require('../utils/sendcookie')
const errorHandler = require('../utils/errorHandler')
const sendEmail = require('../utils/sendEmail');
const cloudinary = require('cloudinary')
const crypto = require('crypto');
const Post = require('../models/postModel');
const Replay = require('../models/replaymodel');
const Comment = require('../models/commentModel');
const deleteimages = require('../utils/deleteImage');
const bcrypt = require('bcrypt');

const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    const user = await User.findOne({
        $or: [{ email }, { username }]
    });

    if (user) {
        if (user.username == username) {
            return next(new errorHandler('username already taken !', 400))
        }
        return next(new errorHandler('Email already taken !', 400))
    }

    if (!req.body.profilepic) {
        return next(new errorHandler('upload the image !', 400))
    }

    try {

        var mycloud = await cloudinary.v2.uploader.upload(req.body.profilepic, {
            folder: 'avatars',
            width: 150,
            crop: 'scale',
            allowed_formats: ['jpg', 'png']
        })

        let newUser = await User.create({
            username,
            email,
            password,
            profilePic: {
                public_id: mycloud.public_id,
                url: mycloud.secure_url,
            }
        });

        await newUser.save();
        newUser = await User.findById(newUser._id).select('-password');

        res.status(200).json({
            sucess: true,
            message: 'sucessfully register !',
            newUser,
        })
    } catch (err) {
        //if in case image upload but user is not created sucessfully ..
        if (mycloud && mycloud.public_id) {
            try {
                await cloudinary.v2.uploader.destroy(mycloud.public_id);
            } catch (err) {
                console.error('Error deleting image :', err);
            }
        }
        next(err)
    }

}


const login = async (req, res, next) => {
    try {
        const { userId, password } = req.body;
        const user = await User.findOne({
            $or: [{ email: userId }, { username: userId }]
        });

        if (!user) {
            return next(new errorHandler('user not found !', 404))
        }

        let passwordMatch = await user.comparePassword(password);

        if (!passwordMatch) {
            return next(new errorHandler('Wrong password !', 400))
        }
        sendcookie(user, res, 200);

    } catch (err) {
        next(err)
    }
}

//search users 

const searchUsers = async (req, res, next) => {
    try {
        const { query } = req.query;
        if (!query) {
            return;
        }
        const regex = new RegExp(`^${query}|.*${query}.*`, 'i');
        const keyword = query ? {
            $or: [{ username: regex }, { email: regex }],
        } : {}
        const users = await User.find(keyword).find({ _id: { $ne: req.user._id } })
            .select('username profilePic email')
        return res.status(200).json(users)
    } catch (err) {
        next(err);
    }


}

const deleteUser = async (req, res, next) => {
    const { _id: userId } = req.user;
    try {

        if (!userId) {
            return next(new errorhandler('user not found ', 404));
        }
        const user = await User.findById(userId)
            .populate({
                path: 'posts', select: 'images ', populate: {
                    path: 'comments', select: '_id', populate: {
                        path: 'replies',
                        select: '_id',
                    }
                }
            })

        var imgPublicIds = [];
        for (const post of user.posts) {
            for (const postimg of post.images) {
                imgPublicIds.push(postimg?.public_id);
            }
            try {
                await deleteimages(imgPublicIds);
            }
            catch (err) {
                next(err);
                return;
            }

            for (const comment of post.comments) {
                await Replay.deleteMany({ comment: comment._id });
                await Comment.findByIdAndDelete(comment._id);
            }

            await Post.findByIdAndDelete(post._id);
        }

        await user.deleteOne();

        return res.status(200).json({
            message: 'Account deleted successfully !',
            success: "true"
        })
    } catch (err) {
        next(err)
    }
}


const updatePassword = async (req, res, next) => {
    try {
        const { oldpassword, newpassword } = req.body;

        const loggedinUser = await User.findById(req.user._id);
        passwordMatch = await loggedinUser.comparePassword(oldpassword);

        if (!passwordMatch) {
            return next(new errorHandler('please enter the correct password !', 404));
        }

        loggedinUser.password = newpassword;

        await loggedinUser.save();


        return res.status(200).json({
            sucess: true,
            message: 'update password successFully !',
        })

    } catch (err) {
        next(err)
    }
}

const resetpassword = async (req, res, next) => {
    const { token, password } = req.body;

    try {
        const resetPasswordToken = crypto.createHash('sha256').update(token).digest("hex");
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpiry: {
                $gt: Date.now(),
            }
        })

        if (!user) {
            return next(new errorHandler(`invalid token or token expire !`, 404));
        }

        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiry = undefined;
        await user.save();


        return res.status(200).json({
            sucess: true,
            message: "reset password Successfully,please login !"
        })

    } catch (err) {
        next(err)
    }
}


const forgotpassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return next(new errorHandler('user does not exists !'));
        }

        const resetToken = await user.generateResetToken();

        await user.save();

        const reseturl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

        const message = `reset your password using link below :\n\n ${reseturl}`;

        try {
            await sendEmail({
                email: user.email,
                subject: "Password recovery",
                message,
            })

            return res.status(200).json({
                success: true,
                message: `Email sent to ${user.email} sucessfully !`

            })
        } catch (err) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpiry = undefined;

            await user.save();

            return next(new errorHandler('Unable to Send Email', 404));
        }

    } catch (err) {
        next(err);
    }


}


const followAndunfollowuser = async (req, res, next) => {
    const { userId } = req.params;
    const { user } = req;

    try {
        const usertoFollow = await User.findById(userId);
        const loggedinUser = await User.findById(user._id);

        if (usertoFollow._id.toString() === user._id.toString()) {
            return next(new errorHandler('unable to follow !', 400))
        }

        if (loggedinUser.following.includes(userId)) {
            loggedinUser.following.pull(userId);
            usertoFollow.followers.pull(loggedinUser._id);

            await usertoFollow.save();
            await loggedinUser.save();

            return res.status(200).json({
                message: `unfollow ${usertoFollow.username}`,
                user: loggedinUser,
            })

        } else {
            usertoFollow.followers.push(loggedinUser._id);
            loggedinUser.following.push(userId);

            await usertoFollow.save();
            await loggedinUser.save();

            return res.status(200).json({
                message: `follow ${usertoFollow.username}`,
                user: loggedinUser,
            })
        }

    } catch (err) {
        next(err)
    }

}

const editProfile = async (req, res, next) => {
    const { _id: userId } = req.user;
    try {
        const { username, email, password, profilePic, Bio } = req.body;
        const profileData = {};
        const loggedInUser = await User.findById(userId);

        if (username) profileData.username = username;
        if (email) profileData.email = email;

        if (password) {
            const hashpassword = await bcrypt.hash(password, 10);
            profileData.password = hashpassword;
        }
        if (Bio) profileData.Bio = Bio;

        if (profilePic) {
            if (loggedInUser.profilePic && loggedInUser.profilePic.public_id) {
                try {
                    await cloudinary.v2.uploader.destroy(loggedInUser.profilePic.public_id);
                } catch (err) {
                    throw new Error('unable to delete image ..');
                }
            }

            const updatedprofilePic = await cloudinary.v2.uploader.upload(profilePic, {
                folder: 'avatars',
                allowed_formats: ['jpg', 'png'],
                width: 150,
                crop: 'scale',
            })

            profileData.profilePic = {
                public_id: updatedprofilePic.public_id,
                url: updatedprofilePic.secure_url,
            }
        }

        const updateduser = await User.findByIdAndUpdate(userId, profileData, {
            new: true,
            runValidators: true,
            select: '-password',
        })

        if (!updateduser) {
            return next(new errorHandler('user not found !', 404));
        }


        return res.status(200).json({
            success: true,
            message: 'Update Profile Successfully !',
            updateduser
        })

    } catch (err) {
        next(err);
    }
}

const getsuggestedUsers = async (req, res, next) => {
    try {
        const logInUser = await User.findById(req.user._id).populate('following');
        const usersnotFollowed = await User.find({ _id: { $nin: [...logInUser.following, req.user._id] } });

        return res.status(200).json({
            logInUser,
            usersnotFollowed
        })
    } catch (err) {
        next(err);
    }
}

const getUser = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId).
            populate('followers', 'username email profilePic')
            .populate('following', 'username email profilePic')
            .populate('posts');

        return res.status(200).json({
            user
        })
    } catch (err) {
        next(err)
    }
}


const getPostsByTab = async (req, res, next) => {
    const { userId } = req.params;
    const { tab } = req.query;
    try {
        let user;
        if (tab == 'posts') {
            user = await User.findById(userId)
                .populate({
                    path: 'posts',
                    populate: {
                        path: 'postBy',
                        select: 'username email profilePic'
                    }
                })
                .populate({
                    path: 'posts',
                    populate: {
                        path: 'likes',
                        select: 'username email profilePic'
                    }
                })
                .populate({
                    path: 'posts',
                    populate: {
                        path: 'comments',
                        select: 'content'
                    }
                })
                .populate({
                    path: 'posts',
                    populate: {
                        path: 'comments',
                        populate: {
                            path: 'commentBy',
                            select: 'username email profilePic'
                        }
                    }
                })
                .populate({
                    path: 'posts',
                    populate: {
                        path: 'comments',
                        populate: {
                            path: 'likes',
                            select: 'username email profilePic'
                        }
                    }
                })
                .populate({
                    path: 'posts',
                    populate: {
                        path: 'comments',
                        populate: {
                            path: 'replies',
                            populate: {
                                path: 'replayBy',
                                select: 'username email profilePic'
                            }
                        }
                    }
                })
        } else if (tab == 'saved') {
            user = await User.findById(userId).populate({
                path: 'saved',
                populate: {
                    path: 'postBy',
                    select: 'username email profilePic'
                }
            })
                .populate({
                    path: 'saved',
                    populate: {
                        path: 'likes',
                        select: 'username email profilePic'
                    }
                })
                .populate({
                    path: 'saved',
                    populate: {
                        path: 'comments',
                        select: 'content'
                    }
                })
                .populate({
                    path: 'saved',
                    populate: {
                        path: 'comments',
                        populate: {
                            path: 'commentBy',
                            select: 'username email profilePic'
                        }
                    }
                })
                .populate({
                    path: 'saved',
                    populate: {
                        path: 'comments',
                        populate: {
                            path: 'likes',
                            select: 'username email profilePic'
                        }
                    }
                })
                .populate({
                    path: 'saved',
                    populate: {
                        path: 'comments',
                        populate: {
                            path: 'replies',
                            populate: {
                                path: 'replayBy',
                                select: 'username email profilePic'
                            }
                        }
                    }
                })
        }

        if (!user) {
            return next(new errorHandler('user not found !', 404));
        }

        const posts = tab == "posts" ? user.posts : user.saved;
        return res.status(200).json({
            posts
        })
    } catch (err) {
        next(err);
    }
}

const logout = async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })

    res.status(200).json('logout !')
}




module.exports =
{
    signup, login, logout,
    followAndunfollowuser, searchUsers, getUser,
    updatePassword, forgotpassword, getsuggestedUsers,
    resetpassword, deleteUser, editProfile, getPostsByTab
};