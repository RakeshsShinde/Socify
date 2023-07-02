const Router = require('express').Router();
const { signup, login, logout,
    followAndunfollowuser, searchUsers, updatePassword }
    = require('../controllers/userControllers');
const authenticate = require('../middleware/Authenticate')

Router.route('/signup').post(signup)
Router.route('/login').post(login)
Router.route('/logout').get(logout)
Router.route('/search').get(searchUsers)
Router.route('/updatePassword').put(authenticate, updatePassword);
Router.route('/follow/:userId').post(authenticate, followAndunfollowuser);


module.exports = Router;
