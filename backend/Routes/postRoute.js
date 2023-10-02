const authenticate = require('../middleware/Authenticate');
const postRoute = require('express').Router();
const { createNewPost, savepost, getTrendingPosts, UpdatePost, getPost, getuserPosts, searchPostsByLocation } = require('../controllers/postControllers')
const { searchPostsByTags, deletePost, LikeAndUnlikePost, getPostofFollowing, getPostsByTagAndLocation } = require('../controllers/postControllers')

postRoute.route('/newpost').post(authenticate, createNewPost);
postRoute.route('/likepost/:postId').post(authenticate, LikeAndUnlikePost);
postRoute.route('/savepost/:postId').post(authenticate, savepost);
postRoute.route('/getPostofFollowing').get(authenticate, getPostofFollowing);
postRoute.route('/trending').get(authenticate, getTrendingPosts);
postRoute.route('/tags/search').get(authenticate, searchPostsByTags);
postRoute.route('/location/search').get(authenticate, searchPostsByLocation);
postRoute.route('/posts').get(authenticate, getPostsByTagAndLocation);
postRoute.route('/profile/:userId/posts').get(authenticate, getuserPosts);
postRoute.route('/:postId').get(authenticate, getPost);
postRoute.route('/update/:postId').patch(authenticate, UpdatePost);
postRoute.route('/delete/:postId').delete(authenticate, deletePost);

module.exports = postRoute;


