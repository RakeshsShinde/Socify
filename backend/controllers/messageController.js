const Message = require('../models/messageModel');
const Chat = require('../models/chatModel');
const errorHandler = require('../utils/errorHandler');

const sendMessage = async (req, res, next) => {
    const { chatId, content } = req.body;

    if (!content || !chatId) {
        return next(new errorHandler('data not pass with request !', 404));
    }

    var newMessage = {
        content,
        chat: chatId,
        sender: req.user._id,

    }
    try {
        let message = await Message.create(newMessage);

        await message.populate("sender", "username profilePic email");
        await message.populate("chat");
        await message.populate({
            path: "chat.users",
            select: "username profilePic email"
        })

        await Chat.findByIdAndUpdate(chatId, {
            latestMessage: message
        })


        res.status(200).json(message);
    } catch (err) {
        next(err);
    }
}

const getAllmessages = async (req, res, next) => {
    const { chatId } = req.params;
    try {
        const messages = await Message.find({ chat: chatId })
            .populate('sender', 'username profilePic email')
            .populate({
                path: 'chat',
                populate: {
                    path: 'users',
                    select: 'username profilePic email'
                }
            })
        return res.status(200).json(messages);
    } catch (err) {
        next(err);
    }
}



module.exports = { sendMessage, getAllmessages }