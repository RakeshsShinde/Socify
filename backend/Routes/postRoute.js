const authenticate = require('../middleware/Authenticate');
const {
    createNewPost,
    postLikeAndUnlike,
    createNewComment,
    deleteComment,
    savepost,
    createNewReplay,
    getPostofFollowing,
    searchPost
}
    = require('../controllers/postControllers')
const postRoute = require('express').Router();


postRoute.route('/newpost').post(authenticate, createNewPost);
postRoute.route('/likepost/:postId').get(authenticate, postLikeAndUnlike);
postRoute.route('/search').get(authenticate, searchPost);
postRoute.route('/savepost/:postId').get(authenticate, savepost);
postRoute.route('/newcomment').post(authenticate, createNewComment);
postRoute.route('/getPostOfFollowing').get(authenticate, getPostofFollowing);
postRoute.route('/comment/:commentId/newreplay').post(authenticate, createNewReplay);
postRoute.route('/deletecomment/:commentId').delete(authenticate, deleteComment);



module.exports = postRoute;


