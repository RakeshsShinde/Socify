const Post = require('../models/postModel');
const errorHandler = require('../utils/errorHandler');
const Comment = require('../models/commentModel');
const Replay = require('../models/replaymodel');
// const User = require('../models/Usermodel');

const createNewPost = async (req, res, next) => {
    const { caption, location, image, tags } = req.body;
    const { user } = req;
    try {
        const newpost = await Post.create({
            caption,
            location,
            image,
            tags,
            postBy: req.user._id
        })

        await newpost.save();
        user.posts.push(newpost._id);
        await user.save();
        return res.status(200).json({
            success: true,
            newpost
        })

    } catch (error) {
        next(error)
    }
}

//search post using tags
const searchPost = async (req, res, next) => {
    try {
        const { tag } = req.query;
        const regex = new RegExp(`^${tag}|.*${tag}.*`, 'i');
        const posts = await Post.find({ tags: { $in: [regex] } });
        return res.status(200).json({
            sucess: true,
            posts
        })
    }
    catch (err) {
        next(err);
    }

}

const postLikeAndUnlike = async (req, res, next) => {
    const { postId } = req.params;
    try {
        const post = await Post.findById({ _id: postId });

        if (!post) {
            return next(new errorHandler('post not found', 400))
        }

        if (post.likes.includes(req.user._id)) {     //if user already like the post unlike it 
            const index = post.likes.indexOf(req.user._id);
            post.likes.splice(index, 1);
            totalLikes = post.likes.length;
            await post.save();

            return res.status(200).json({
                sucess: true,
                totalLikes,
                message: 'post unliked  !'
            })
        } else {
            post.likes.push(req.user._id);
            totalLikes = post.likes.length;
            await post.save();

            return res.status(200).json({
                sucess: true,
                totalLikes,
                message: "post liked "
            })
        }
    } catch (err) {
        next(err)
    }

}


//get posts of following 

const getPostofFollowing = async (req, res, next) => {
    try {
        const { user } = req;
        if (!user) {
            return next(new errorHandler('please login !', 404));
        }

        const followingIds = user.following;       //userid to which user following 
        const allposts = await Post.find({ postBy: { $in: followingIds } })
        return res.status(200).json({
            sucess: true,
            allposts
        })

    } catch (err) {
        next(err);
    }


}



const createNewComment = async (req, res, next) => {
    const { content, postId } = req.body;

    const post = await Post.findById(postId);

    if (!post) {
        return next(new errorHandler('post not found !', 400));
    }

    try {
        const newcomment = await Comment.create({
            content,
            post: postId,
            commentBy: req.user._id,
        })

        await newcomment.save();
        post.comments.push(newcomment._id);
        await post.save();

        return res.status(200).json({
            success: true,
            newcomment,
        })
    }
    catch (err) {
        next(err);
    }

}

const savepost = async (req, res, next) => {
    const { postId } = req.params;
    const { user } = req;          //loggedin user
    try {
        const post = await Post.findById(postId);

        if (!post) {
            return next(new errorHandler('post not found !', 400));
        }

        post.saveBy.push(user._id);
        user.saved.push(post._id);

        await post.save();
        await user.save();

        return res.status(200).json('post saved !')

    } catch (error) {
        next(err);
    }

}

const deleteComment = async (req, res, next) => {
    const { commentId } = req.params;

    try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return next(new errorHandler('comment is not found !', 404))
        }

        //check comment is belong to the logged in user
        if (comment.commentBy.toString() !== req.user._id.toString()) {
            return next(new errorHandler('you cant delete the comment !', 400));
        }

        await comment.deleteOne();

        //also delete comment from post.comments 
        const post = await Post.findOne({ _id: comment.post });

        if (post) {
            post.comments.pull(commentId);
            await post.save();
        }

        return res.status(200).json({
            success: true,
            messsage: "deleted successfully !"
        })
    } catch (err) {
        next(err)
    }

}


const createNewReplay = async (req, res, next) => {
    const { commentId } = req.params;
    const { content } = req.body;

    try {
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return next(new errorHandler('comment not found !', 400));
        }

        const replay = await Replay.create({
            content,
            replayBy: req.user._id,
            comment: comment._id
        })

        await replay.save();

        comment.replies.push(replay._id);
        await comment.save();

        return res.status(200).json('comment added successfully !!');
    } catch (err) {
        next(err)
    }
}




module.exports = {
    createNewPost, postLikeAndUnlike,
    createNewComment, deleteComment,
    savepost, createNewReplay, getPostofFollowing,
    searchPost,

};