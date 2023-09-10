const authenticate = require('../middleware/Authenticate');
const postRoute = require('express').Router();
const { createNewPost, savepost, getTrendingPosts, UpdatePost, getPost } = require('../controllers/postControllers')
const { searchPost, deletePost, LikeAndUnlikePost, getPostofFollowing } = require('../controllers/postControllers')

postRoute.route('/newpost').post(authenticate, createNewPost);
postRoute.route('/likepost/:postId').post(authenticate, LikeAndUnlikePost);
postRoute.route('/savepost/:postId').post(authenticate, savepost);
postRoute.route('/getPostofFollowing').get(authenticate, getPostofFollowing);
postRoute.route('/trending').get(authenticate, getTrendingPosts);
postRoute.route('/search').get(authenticate, searchPost);
postRoute.route('/:postId').get(authenticate, getPost);
postRoute.route('/update/:postId').patch(authenticate, UpdatePost);
postRoute.route('/delete/:postId').delete(authenticate, deletePost);

module.exports = postRoute;


