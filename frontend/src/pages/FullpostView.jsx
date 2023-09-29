import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import SinglePost from '../component/Posts/SinglePost';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { getSinglePost } from '../actions/postActions';
import PostSkeleton from '../component/miscellaneous/PostSkeleton';
import { clearPostLikeError, clearPostLikeSucess } from '../reducers/PostReducers/LikePostSlice'
import { clearEditPostError, clearEditPostSuccess } from '../reducers/PostReducers/EditpostSlice'
import { clearDeletePostError, clearDeletePostSuccess } from '../reducers/PostReducers/DeletePostSlice';
import { clearCommentError, clearCommentSuccess } from '../reducers/CommentReducers/newCommentSlice';
import { clearlikeCommentSuccess, clearlikeCommentError } from '../reducers/CommentReducers/CommentLikeSlice';
import { clearSavePostError, clearSavePostSuccess } from '../reducers/PostReducers/SavePostSlice';
import { clearFollowUserSuccess, clearFollowUserError } from '../reducers/UserReducers/followUserSlice';
import { clearReplayError, clearReplaySuccess } from '../reducers/CommentReducers/ReplaySlice';
import { cleardeleteCommentError, cleardeleteCommentSuccess } from '../reducers/CommentReducers/DeleteCommentSlice';
import { clearReplayLikeSuccess, clearReplayLikeError } from '../reducers/CommentReducers/likeReplaySlice';
import { clearDeleteReplayError, clearDeleteReplaySuccess } from '../reducers/CommentReducers/DeleteReplaySlice';
import { useNavigate } from 'react-router-dom';
import useStyles from './fullpostview.style';

const FullpostView = () => {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const postref = useRef(null);
    const navigate = useNavigate();
    const classes = useStyles();

    const { post, loading } = useSelector((state) => state.SinglePost)
    const { success: likeSuccess, message: likeMessage, error: likeError } = useSelector((state) => state.LikePost);
    const { success: editPostSuccess, message: editPostMessage, error: editPostError } = useSelector((state) => state.EditPost);
    const { success: deleteSuccess, message: deleteMessage, error: deleteError } = useSelector((state) => state.DeletePost);
    const { success: commentSuccess, error: commentError, message: commentMessage } = useSelector((state) => state.NewComment);
    const { success: likecommentSuccess, error: likecommentError, message: likecommentMessage } = useSelector((state) => state.LikeComment);
    const { success: savePostSuccess, error: savePostError, message: savePostMessage } = useSelector((state) => state.SavePost);
    const { success: followSuccess, error: followUserError, message: followUserMessage } = useSelector((state) => state.FollowUser);
    const { success: replaySuccess, error: replayError, message: replayMessage } = useSelector((state) => state.ReplayTocomment);
    const { success: deleteCommentSuccess, error: deleteCommentError, message: deleteCommentMessage } = useSelector((state) => state.DeleteComment);
    const { success: replaylikeSuccess, error: replaylikeError, message: replaylikeMeesage } = useSelector((state) => state.LikeReplay);
    const { success: deleteReplaySuccess, error: deleteReplayError, message: deleteReplayMessage } = useSelector((state) => state.DeleteReplay);


    useEffect(() => {
        if (editPostSuccess) {
            toast.success(editPostMessage, { position: 'top-right' });
            dispatch(clearEditPostSuccess());
        }
        if (editPostError) {
            toast.success(editPostError, { position: 'top-right' });
            dispatch((clearEditPostError()));
        }
        if (deleteError) {
            toast.success(deleteError, { position: 'top-right' })
            dispatch(clearDeletePostError())
        }
        if (deleteSuccess) {
            toast.success(deleteMessage, { position: 'top-right' })
            navigate('/home')
            dispatch(clearDeletePostSuccess())
        }
        if (likeSuccess) {
            toast.success(likeMessage, { position: 'top-right' });
            dispatch(clearPostLikeSucess());
        }
        if (likeError) {
            toast.success(likeError, { position: 'top-right' });
            dispatch(clearPostLikeError());
        }
        if (commentSuccess) {
            toast.success(commentMessage, { position: 'top-right' })
            dispatch(clearCommentSuccess())
        }
        if (commentError) {
            toast.success(commentError, { position: 'top-right' })
            dispatch(clearCommentError())
        }
        if (likecommentSuccess) {
            toast.success(likecommentMessage, { position: 'top-right', theme: 'dark' })
            dispatch(clearlikeCommentSuccess());
        }
        if (likecommentError) {
            toast.error(likecommentError, { position: 'top-right', theme: 'dark' })
            dispatch(clearlikeCommentError());
        }
        if (savePostSuccess) {
            toast.success(savePostMessage, { position: 'top-right', theme: 'dark' })
            dispatch(clearSavePostSuccess());
        }
        if (savePostError) {
            toast.error(savePostError, { position: 'top-right', theme: 'dark' })
            dispatch(clearSavePostError());
        }
        if (followSuccess) {
            dispatch(clearFollowUserSuccess());
            toast.success(followUserMessage, { position: 'top-right', theme: 'dark' });
        }
        if (followUserError) {
            dispatch(clearFollowUserError());
            toast.success(followUserError, { position: 'top-right', theme: 'dark' });
        }
        if (replayError) {
            dispatch(clearReplayError());
            toast.error(replayError, { position: 'top-right', theme: 'dark' });
        }
        if (replaySuccess) {
            dispatch(clearReplaySuccess());
            toast.success(replayMessage, { position: 'top-right', theme: 'dark' });
        }
        if (deleteCommentError) {
            dispatch(cleardeleteCommentError());
            toast.error(deleteError, { position: 'top-right', theme: 'dark' });
        }
        if (deleteCommentSuccess) {
            dispatch(cleardeleteCommentSuccess());
            toast.success(deleteCommentMessage, { position: 'top-right', theme: 'dark' });
        }
        if (replaylikeError) {
            dispatch((clearReplayLikeError()));
            toast.error(replaylikeError, { position: 'top-right', theme: 'dark' });
        }
        if (replaylikeSuccess) {
            dispatch(clearReplayLikeSuccess());
            toast.success(replaylikeMeesage, { position: 'top-right', theme: 'dark' });
        }
        if (deleteReplayError) {
            dispatch(clearDeleteReplayError());
            toast.error(deleteReplayError, { position: 'top-right', theme: 'dark' });
        }
        if (deleteReplaySuccess) {
            dispatch(clearDeleteReplaySuccess());
            toast.success(deleteReplayMessage, { position: 'top-right', theme: 'dark' });
        }
        dispatch(getSinglePost(postId));
    }, [dispatch, postId, editPostSuccess, editPostError, deleteError, deleteSuccess, likeSuccess, likeError, commentSuccess, commentError,
        likecommentSuccess, likecommentError, savePostSuccess, savePostError, deleteCommentError, deleteCommentSuccess,
        replaySuccess, replayError, replaylikeError, replaylikeSuccess, deleteReplayError, deleteReplaySuccess]);

    useEffect(() => {
        scrollToPosts();
    }, [postId])


    const scrollToPosts = () => {
        if (postref.current) {
            postref.current.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <>
            <Box ref={postref} sx={{ display: 'hidden', position: 'absolute', top: 0 }}></Box>
            <Box className={classes.postcontainer}>
                <Box className={classes.postwrapper}>
                    {loading ? <PostSkeleton /> : <SinglePost fullpostview post={post} key={post?._id} />}
                </Box>
            </Box>
        </>

    );
}

export default FullpostView;
