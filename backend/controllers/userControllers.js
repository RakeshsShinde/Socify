const User = require('../models/Usermodel');
const sendcookie = require('../utils/sendcookie')
const errorHandler = require('../utils/errorHandler')


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

    try {
        const newUser = await User.create({
            username,
            email,
            password,
        });

        await newUser.save();

        sendcookie(newUser, res, 200);
    } catch (err) {
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
            return next(new errorHandler('Password do not match !', 400))
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
        const users = await User.find({ $or: [{ username: regex }, { name: regex }] });
        return res.status(200).json({
            sucess: true,
            users,
        })
    } catch (err) {
        next(err);
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

        res.cookie('token', null, {              //logout user after password updated !
            expires: new Date(Date.now()),
            httpOnly: true,
        })

        return res.status(200).json({
            sucess: true,
            message: 'update password successFully !'
        })

    } catch (err) {
        next(err)
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

            return res.status(200).json('sucessfully unfollowed !')

        } else {
            usertoFollow.followers.push(loggedinUser._id);
            loggedinUser.following.push(userId);

            await usertoFollow.save();
            await loggedinUser.save();

            return res.status(200).json('sucessfully followed !')
        }

    } catch (err) {
        next(err)
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
    followAndunfollowuser, searchUsers,
    updatePassword,
};