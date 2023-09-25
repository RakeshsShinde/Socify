const Chat = require('../models/chatModel');
const User = require('../models/Usermodel');
const errorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");

//access the chat or create new one on one chat 
const accessChat = async (req, res, next) => {
    const { userId } = req.body;

    if (!userId) {
        return next(new errorHandler('userid is not provided !', 404));
    }

    var isChat = await Chat.find({
        isgroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } }
        ],
    }).populate('users', '-password').populate('latestMessage')

    isChat = await User.populate(isChat, {
        path: 'latestMessage.sender',
        select: 'name profilePic email'
    })

    if (isChat.length > 0) {
        return res.status(200).send(isChat[0]);
    } else {
        var newChatData = {
            chatName: "sender",
            isgroupChat: false,
            users: [req.user._id, userId],
        }
        try {
            const newCreatedChat = await Chat.create(newChatData);
            const fullChat = await Chat.findOne({ _id: newCreatedChat._id })
                .populate("users", "-password");
            return res.status(200).send(fullChat);
        } catch (err) {
            return next(new errorHandler('unable to create the chat !', 404));
        }
    }

}

//get all chats of loggedin user
const fetchAllChats = async (req, res, next) => {
    try {
        const allchats = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate({
                path: "latestMessage",
                populate: {
                    path: 'sender',
                    select: 'username email profilePic'
                }
            }).sort({ updatedAt: -1 })
        return res.status(200).json(allchats);
    } catch (err) {
        next(err);
    }
}


//create new groupChat 
const createNewGroup = async (req, res, next) => {
    const { groupName, users, profilepic } = req.body;

    if (!groupName || !users || !profilepic) {
        return next(new errorHandler('please fill all fields !', 404));
    }

    const groupUsers = JSON.parse(users);

    if (users.length < 2) {
        return next(new errorHandler('atleast 2 users required to create group chat!', 404));
    }

    groupUsers.push(req.user);

    try {
        try {
            var mycloud = await cloudinary.v2.uploader.upload(req.body.profilepic, {
                folder: 'avatars',
                width: 150,
                crop: 'scale',
                allowed_formats: ['jpg', 'png']
            })
        } catch (err) {
            return next('unable to upload image !', 404);
        }

        const groupChat = await Chat.create({
            chatName: groupName,
            isgroupChat: true,
            users: groupUsers,
            groupAdmin: req.user,
            profilePic: {
                public_id: mycloud.public_id,
                url: mycloud.secure_url,
            }
        })

        const createGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate('users', '-password')
            .populate('groupAdmin', '-password')

        return res.status(200).json({
            createGroupChat
        })
    } catch (err) {
        return next(new errorhandler('unable to create group ! ', 404));
    }


}

//add users to existing group
const addUsersToGroup = async (req, res, next) => {
    const { userId, groupId } = req.body;
    try {
        var group = await Chat.findById(groupId);

        if (!group) {
            return next(new errorHandler("group is not found !", 404));
        }

        if (group.groupAdmin.toString() !== req.user._id.toString()) {
            return next(new errorHandler('only admin can add users to group !', 404));
        }

        //get user which have to added in group
        const usertoAdd = await User.findById(userId);

        if (!usertoAdd) {
            return next(new errorHandler("user not found !", 404));
        }

        group.users.push(usertoAdd._id);
        await group.save();

        const fullgroupInfo = await Chat.findById(groupId).populate('users', '-password')
            .populate('groupAdmin', '-password')

        return res.status(200).json({
            success: true,
            data: fullgroupInfo,
            message: 'user added successfully !'
        })

    } catch (err) {
        next(err);
    }
}

//removed user from existing group
const removeUser = async (req, res, next) => {
    const { userId, groupId } = req.body;
    try {
        const group = await Chat.findById(groupId);

        if (!group) {
            return next(new errorHandler("group not found !", 404));
        }

        const index = group.users.indexOf(userId);
        if (index !== -1) {
            group.users.splice(index, 1);
            await group.save();
        }

        const fullgroup = await Chat.findById(groupId)
            .populate('users', '-password')
            .populate('groupAdmin', '-password')

        return res.status(200).json({
            success: true,
            data: fullgroup,
            message: "user removed successfully !"
        })
    } catch (err) {
        next(err)
    }
}

//rename the group
const renameGroup = async (req, res, next) => {
    const { groupId } = req.params;
    const { groupName } = req.body;
    try {
        const updatedGroup = await Chat.findByIdAndUpdate(
            groupId,
            {
                chatName: groupName,
            },
            {
                new: true,
            }
        )

        if (!updatedGroup) {
            return next(new errorHandler("group  not found !", 404));
        }

        return res.status(200).json('renamed group successfully!');

    } catch (err) {
        next(err);
    }

}

//edit profilepic of group

const editprofilePic = async (req, res, next) => {
    const { groupId } = req.params;
    const { profilepic } = req.body;
    try {
        const group = await Chat.findById(groupId);

        if (!group) {
            return next(new errorHandler('group not found !', 404));
        }

        //before upload new profilepic delete last one 
        if (group.profilePic && group.profilePic.public_id) {
            try {
                await cloudinary.v2.uploader.destroy(group.profilePic.public_id);
            } catch (err) {
                return next(new errorHandler('something went wrong !', 404));
            }
        }
        try {
            var updatedAtProfilePic = await cloudinary.v2.uploader.upload(profilepic, {
                folder: 'avatars',
                allowed_formats: ['jpg', 'png'],
                width: 150,
                crop: 'scale',
            })
        } catch (err) {
            return next(new errorHandler('failed to upload profilepic!', 404));
        }

        const updatedGroup = await Chat.findByIdAndUpdate(
            groupId,
            { profilePic: updatedAtProfilePic },
            { new: true }
        )

        return res.status(200).json({
            message: 'profilePic updated successfully !',
            updatedGroup,
        })

    } catch (err) {
        next(err)
    }
}


module.exports = { accessChat, fetchAllChats, createNewGroup, addUsersToGroup, removeUser, renameGroup, editprofilePic }