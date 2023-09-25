const messageRoute = require('express').Router();
const authenticate = require('../middleware/Authenticate');
const { sendMessage, getAllmessages } = require('../controllers/messageController');

messageRoute.route('/send').post(authenticate, sendMessage);
messageRoute.route('/getMessages/:chatId').get(authenticate, getAllmessages);

module.exports = messageRoute;