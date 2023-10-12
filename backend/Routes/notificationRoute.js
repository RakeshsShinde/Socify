const notificationRoute = require('express').Router();
const authenticate = require('../middleware/Authenticate');
const { createNotification, getAllNotification, markNotificationAsRead } = require('../controllers/notificationController');

notificationRoute.route('/').get(authenticate, getAllNotification);
notificationRoute.route('/create').post(authenticate, createNotification);
notificationRoute.route('/read/:notificationId').put(authenticate, markNotificationAsRead);

module.exports = notificationRoute;