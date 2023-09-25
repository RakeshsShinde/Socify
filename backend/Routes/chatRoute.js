const chatRoute = require('express').Router();
const { accessChat, fetchAllChats, createNewGroup, addUsersToGroup } = require('../controllers/chatControllers');
const { removeUser, renameGroup, editprofilePic } = require('../controllers/chatControllers');
const authenticate = require('../middleware/Authenticate');

chatRoute.route('/accessChat').post(authenticate, accessChat);
chatRoute.route('/fetchChats').get(authenticate, fetchAllChats);
chatRoute.route('/new/group').post(authenticate, createNewGroup);
chatRoute.route('/group/adduser').put(authenticate, addUsersToGroup);
chatRoute.route('/group/removeuser').put(authenticate, removeUser);
chatRoute.route('/group/:groupId/renamegroup').put(authenticate, renameGroup);
chatRoute.route('/group/edit/profilepic/:groupId').put(authenticate, editprofilePic);


module.exports = chatRoute;