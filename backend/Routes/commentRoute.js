const commentRoute = require('express').Router();
const authenticate = require('../middleware/Authenticate');
const { createNewComment, LikeandUnlikeComment, createNewReplay, deleteComment } = require('../controllers/postControllers')
const { likeAndunlikeReplay, deleteReplay } = require('../controllers/postControllers')

commentRoute.route('/newcomment').post(authenticate, createNewComment);
commentRoute.route('/like/:commentId').post(authenticate, LikeandUnlikeComment);
commentRoute.route('/deletecomment/:commentId').delete(authenticate, deleteComment);
commentRoute.route('/:commentId/newreplay').post(authenticate, createNewReplay);
commentRoute.route('/replay/:replayId').post(authenticate, likeAndunlikeReplay);
commentRoute.route('/replay/:replayId').delete(authenticate, deleteReplay);

module.exports = commentRoute;
