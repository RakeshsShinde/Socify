const Post = require('../models/postModel');
const errorHandler = require('../utils/errorHandler');
const Comment = require('../models/commentModel');
const Replay = require('../models/replaymodel');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary');
const deleteimages = require('../utils/deleteImage')

const createNewPost = async (req, res, next) => {
    const { user } = req;
    const { caption, location, tags } = req.body;

    try {
        if (!caption) {
            return next(new errorHandler('Enter caption', 400));
        }
        let images = [];

        if (typeof req.body.postimages == "string") {
            images.push(req.body.postimages);
        }
        else {
            images = req.body.postimages;
        }

        let imageLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'Postimages',
            })

            imageLinks.push({
                public_id: (await result).public_id,
                secure_url: (await result).secure_url,
            })
        }

        req.body.postimages = imageLinks;


        const newpost = await Post.create({
            caption,
            location,
            images: req.body.postimages,
            tags,
            postBy: req.user._id
        })

        await newpost.save();
        user.posts.push(newpost._id);
        await user.save();


        return res.status(201).json({
            message: 'post created sucessfully !',
            success: true,
            newpost,
        })
    } catch (err) {
        next(err);
    }

}

//search post using tags
const searchPost = async (req, res, next) => {
    try {
        const { keyword } = req.query;
        const matchingPosts = await Post.find({ tags: { $regex: keyword, $options: 'i' } });

        const tagCounts = {};
        matchingPosts.forEach(post => {
            post.tags.forEach(tag => {
                if (tag.toLowerCase().includes(keyword.toLowerCase())) {
                    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
                }
            });
        });

        const matchingTagsWithCounts = Object.keys(tagCounts).map(tag => ({
            tagName: tag,
            totalPosts: tagCounts[tag]
        }));


        res.status(200).json(matchingTagsWithCounts);
    }
    catch (err) {
        next(err);
    }

}
const getPostofFollowing = async (req, res, next) => {
    const { user } = req;
    try {
        const followingUsersId = user.following.map((user) => user);
        const posts = await Post.find({ postBy: { $in: followingUsersId } })
            .populate('postBy', 'username profilePic ')
            .populate('likes', 'username profilePic email')
            .populate({
                path: 'comments',
                populate: [
                    {
                        path: 'commentBy',
                        select: 'username email profilePic',
                    },
                    {
                        path: 'likes',
                        select: 'username email profilePic',
                    },
                    {
                        path: 'replies',
                        populate: [{
                            path: 'replayBy',
                            select: 'username email profilePic',
                        }, {
                            path: 'likes',
                            select: 'username email profilePic',
                        }]
                    },
                ],
            })
            .sort({ createdAt: -1 })


        return res.status(200).json({
            success: true,
            posts: posts,
        })
    } catch (err) {
        next(err);
    }
}


const UpdatePost = async (req, res, next) => {
    const { postId } = req.params;
    const { caption, location, tags } = req.body;
    try {

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return next(new errorHandler('Invalid post id ', 404));
        }
        const post = await Post.findById(postId);

        if (!post) {
            return next(new errorHandler('Post not found', 404));
        }

        post.caption = caption;
        post.location = location;
        post.tags = tags;

        await post.save();

        return res.status(200).json({
            success: true,
            message: 'post updated successfully !',
            post
        })

    } catch (err) {
        next(err)
    }

}

const deletePost = async (req, res, next) => {
    const { postId } = req.params;
    const { user } = req;
    try {
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return next(new errorHandler('Invalid post id ', 404));
        }

        const post = await Post.findById(postId);

        //check the post belonging to loggedin user
        if (post.postBy.toString() !== user._id.toString()) {
            return next(new errorHandler(`you can't delete the post..`))
        }
        //delete the images uploaded to cloudinary for that post
        if (post.images && post.images.length > 0) {
            await deleteimages(post.images.map((img) => img.public_id));
        }

        //also delete the posts from logged user posts array
        user.posts.pull(postId);
        await user.save();

        await post.deleteOne();

        return res.status(200).json({
            success: true,
            message: 'post delete successfully !',
        })

    } catch (err) {
        next(err);
    }
}

const LikeAndUnlikePost = async (req, res, next) => {
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

const getTrendingPosts = (async (req, res, next) => {
    try {
        const trendingTags = await Post.aggregate([
            {
                $unwind: '$tags',
            },
            {
                $group: {
                    _id: { tag: '$tags', postId: '$_id' },
                },
            },
            {
                $group: {
                    _id: '$_id.tag',
                    totalPosts: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    tagName: '$_id',
                    totalPosts: 1,
                }
            },
            {
                $sort: { totalPosts: -1 }
            },
            {
                $limit: 7
            },

        ])

        return res.status(200).json({
            success: true,
            trendingTags,
        })

    } catch (err) {
        next(err)
    }

})


//get single post

const getPost = async (req, res, next) => {
    const { postId } = req.params;
    try {

        const post = await Post.findById(postId).populate('postBy', 'username profilePic ')
            .populate('likes', 'username profilepic email')
            .populate({
                path: 'comments',
                populate: [
                    {
                        path: 'commentBy',
                        select: 'username email profilePic',
                    },
                    {
                        path: 'likes',
                        select: 'username email profilePic',
                    },
                    {
                        path: 'replies',
                        populate: {
                            path: 'replayBy',
                            select: 'username email profilePic',
                        },
                    },
                ],
                options: {
                    sort: { createdAt: -1 }
                },
            });
        return res.status(200).json({
            post
        })
    } catch (err) {
        next(err)
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
            message: 'comment post successfully !'
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

        const savedByUser = post.saveBy.includes(user._id.toString());

        if (savedByUser) {
            post.saveBy.pull(user._id);
            user.saved.pull(post._id);

            await post.save();
            await user.save();

            return res.status(200).json({
                message: 'post unsaved !',
                user
            })
        } else {
            post.saveBy.push(user._id);
            user.saved.push(post._id);

            await post.save();
            await user.save();

            return res.status(200).json({
                message: 'post saved !',
                user
            })
        }

    } catch (error) {
        next(error);
    }

}


const LikeandUnlikeComment = async (req, res, next) => {

    const { commentId } = req.params;
    const { user } = req;
    try {

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return next(new errorHandler('comment does not exists !', 404));
        }

        const likebyUser = comment.likes.includes(user._id.toString());

        if (likebyUser) {
            comment.likes.pull(user._id);
            await comment.save();
            return res.status(200).json({
                message: "unlike comment sucessfully !",
                totallikes: comment.likes.length,
                comment
            })
        } else {
            comment.likes.push(user._id);
            await comment.save();
            return res.status(200).json({
                message: "like comment sucessfully !",
                totallikes: comment.likes.length,
                comment
            })
        }

    } catch (err) {
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

        await Replay.deleteMany({ comment: commentId });

        await comment.deleteOne();

        //also delete comment from post.comments 
        const post = await Post.findOne({ _id: comment.post });

        if (post) {
            post.comments.pull(commentId);
            await post.save();
        }

        return res.status(200).json({
            success: true,
            message: "comment deleted successfully !"
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

        return res.status(200).json('replay added successfully !!');
    } catch (err) {
        next(err)
    }
}

const likeAndunlikeReplay = async (req, res, next) => {
    const { replayId } = req.params;
    const { user } = req;
    try {
        const replay = await Replay.findById(replayId);

        if (!replay) {
            return next(new errorHandler('replay not exits !', 404));
        }

        const likebyUser = replay.likes.includes(user._id.toString());
        if (likebyUser) {
            replay.likes.pull(user._id);
            await replay.save();
            return res.status(200).json({
                success: true,
                message: 'replay unlike successfully !',

            })
        } else {
            replay.likes.push(user._id);
            await replay.save();
            return res.status(200).json({
                success: true,
                message: 'replay like successfully !',
            })

        }
    }
    catch (err) {
        next(err)
    }
}


const deleteReplay = async (req, res, next) => {
    const { replayId } = req.params;
    try {
        const replay = await Replay.findById(replayId);

        if (!replay) {
            return next(new errorHandler('replay not found !', 404));
        }

        if (replay.replayBy.toString() !== req.user._id.toString()) {
            return next(new errorHandler('you cant delete !', 403))
        }
        await replay.deleteOne();
        return res.status(200).json({
            success: true,
            message: 'replay deleted successfully !'
        })
    } catch (err) {
        next(err)
    }
}

const getPostsByTagAndLocation = async (req, res, next) => {
    try {
        const { tag, location } = req.query;
        let query = {};

        if (tag) {
            query.tags = { $in: [tag] };
        }

        if (location) {
            query.location = location;
        }

        const posts = await Post.find(query).sort({ createdAt: -1 });
        const coverImage = posts.length > 0 ? posts[0].images[0] : null;
        const title = location || tag;

        res.json({
            title,
            posts,
            coverImage,
            totalPosts: posts?.length
        });
    } catch (err) {
        next(err);
    }
}


const getuserPosts = async (req, res, next) => {
    const { userId } = req.params;
    const { tab } = req.query;
    try {
        if (tab === "posts") {
            var postsByUser = await Post.find({ postBy: userId })
                .populate('postBy', 'username profilePic ')
                .populate('likes', 'username profilepic email')
                .populate({
                    path: 'comments',
                    populate: [
                        {
                            path: 'commentBy',
                            select: 'username email profilePic',
                        },
                        {
                            path: 'likes',
                            select: 'username email profilePic',
                        },
                        {
                            path: 'replies',
                            populate: {
                                path: 'replayBy',
                                select: 'username email profilePic',
                            },
                        },
                    ],
                }).sort({ createdAt: -1 });
        } else if (tab === "saved") {
            var savedPostsByUser = await Post.find({ saveBy: userId })
                .populate('postBy', 'username profilePic ')
                .populate('likes', 'username profilepic email')
                .populate({
                    path: 'comments',
                    populate: [
                        {
                            path: 'commentBy',
                            select: 'username email profilePic',
                        },
                        {
                            path: 'likes',
                            select: 'username email profilePic',
                        },
                        {
                            path: 'replies',
                            populate: {
                                path: 'replayBy',
                                select: 'username email profilePic',
                            },
                        },
                    ],
                }).sort({ createdAt: -1 });
        }
        const posts = tab === "posts" ? postsByUser : savedPostsByUser;
        return res.status(200).json({ posts });
    } catch (err) {
        next(err)
    }
}



module.exports = {
    createNewPost, LikeAndUnlikePost, UpdatePost, deletePost,
    getPostofFollowing, getTrendingPosts, getPost, searchPost,
    createNewComment, LikeandUnlikeComment, deleteComment, savepost, getuserPosts,
    createNewReplay, likeAndunlikeReplay, deleteReplay, getPostsByTagAndLocation
};