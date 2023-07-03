const Router = require('express').Router();
const { signup, login, logout,
    followAndunfollowuser, searchUsers,
    updatePassword, forgotpassword, resetpassword }
    = require('../controllers/userControllers');
const authenticate = require('../middleware/Authenticate')

Router.route('/signup').post(signup)
Router.route('/login').post(login)
Router.route('/logout').get(logout)
Router.route('/forgotpassword').put(forgotpassword);
Router.route('/resetpassword').put(resetpassword);
Router.route('/search').get(searchUsers)
Router.route('/updatePassword').put(authenticate, updatePassword);
Router.route('/follow/:userId').post(authenticate, followAndunfollowuser);


module.exports = Router;
