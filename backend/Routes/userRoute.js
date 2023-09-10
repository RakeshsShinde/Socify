const Router = require('express').Router();
const { signup, login, logout, getsuggestedUsers, getUser } = require('../controllers/userControllers');
const { followAndunfollowuser, searchUsers, deleteUser, getPostsByTab } = require('../controllers/userControllers');
const { updatePassword, forgotpassword, resetpassword, editProfile } = require('../controllers/userControllers');
const authenticate = require('../middleware/Authenticate')

Router.route('/signup').post(signup);
Router.route('/login').post(login);
Router.route('/logout').get(logout);
Router.route('/delete').delete(authenticate, deleteUser);
Router.route('/forgotpassword').post(forgotpassword);
Router.route('/resetpassword').put(resetpassword);
Router.route('/search').get(authenticate, searchUsers);
Router.route('/profile/:userId').get(authenticate, getUser);
Router.route('/profile/:userId/posts').get(authenticate, getPostsByTab);
Router.route('/updatePassword').put(authenticate, updatePassword);
Router.route('/edit/Profile').put(authenticate, editProfile);
Router.route('/follow/:userId').post(authenticate, followAndunfollowuser);
Router.route('/suggestion').get(authenticate, getsuggestedUsers);


module.exports = Router;
