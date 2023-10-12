const Notification = require('../models/NotificationModel');
const User = require('../models/Usermodel');
const Chat = require('../models/chatModel');
const errorHandler = require('../utils/errorHandler');

const createNotification = async (req, res, next) => {
    const { type, desc, recipients, message, sender, post } = req.body;
    console.log(req.body);
    try {
        const recipientsIds = JSON.parse(recipients);

        const allRecipients = await User.find({ _id: { $in: recipientsIds } });
        if (allRecipients.length !== recipientsIds.length) {
            return next(new errorHandler('recipients not found', 404));
        }

        const notification = new Notification({
            type,
            sender,
            recipients: recipientsIds,
            desc,
            message,
            post
        })

        await notification.save();

        return res.status(200).json(notification);

    } catch (err) {
        next(err);
    }
}

const getAllNotification = async (req, res, next) => {
    try {
        var notifications = await Notification.find({
            recipients: req.user._id,
            sender: { $ne: req.user._id }
        }).populate('sender', 'username profilePic')
            .populate({
                path: 'recipients',
                select: 'username profilePic',
            })
            .populate({
                path: 'message',
                select: 'content',
            }).populate({
                path: 'message',
                select: 'content chat',
                populate: {
                    path: 'chat',
                    select: 'chatName users isgroupChat groupAdmin profilePic',
                    populate: {
                        path: 'users',
                        select: 'username profilePic email',
                    }
                }
            });

        return res.status(200).json(notifications);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

const markNotificationAsRead = async (req, res, next) => {
    const { notificationId } = req.params;
    try {
        const notification = await Notification.findByIdAndUpdate(notificationId,
            {
                isRead: true,
            },
            { new: true }
        )

        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        }

        return res.status(200).json('notification mark as read !')

    } catch (err) {
        next(err);
    }
}




module.exports = { createNotification, getAllNotification,markNotificationAsRead }
