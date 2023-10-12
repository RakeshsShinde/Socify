
import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles'
import SinglePost from './SinglePost';
import { Box } from '@mui/material';
import { clearPostsError } from '../../reducers/PostReducers/PostsSlice'
import { getPostOfFollowing } from '../../actions/postActions';
import { useSelector, useDispatch } from 'react-redux';
import { clearPostLikeError, clearPostLikeSucess } from '../../reducers/PostReducers/LikePostSlice'
import { clearEditPostError, clearEditPostSuccess } from '../../reducers/PostReducers/EditpostSlice'
import { clearDeletePostError, clearDeletePostSuccess } from '../../reducers/PostReducers/DeletePostSlice';
import { clearCommentError, clearCommentSuccess } from '../../reducers/CommentReducers/newCommentSlice';
import { clearlikeCommentSuccess, clearlikeCommentError } from '../../reducers/CommentReducers/CommentLikeSlice';
import { clearSavePostError, clearSavePostSuccess } from '../../reducers/PostReducers/SavePostSlice';
import { toast } from 'react-toastify';


const useStyles = makeStyles((theme) => ({
    mainContainer: {
        backgroundColor: 'transparent',
        padding: '10px 5px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '50px',
        maxWidth: '62%',
        overflow: 'hidden',
    },
}))


const PostContainer = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { posts, error } = useSelector((state) => state.Posts);
    const { success: likeSuccess, message: likeMessage, error: likeError } = useSelector((state) => state.LikePost);
    const { success: editPostSuccess, message: editPostMessage, error: editPostError } = useSelector((state) => state.EditPost);
    const { success: deleteSuccess, message: deleteMessage, error: deleteError } = useSelector((state) => state.DeletePost);
    const { success: commentSuccess, error: commentError, message: commentMessage } = useSelector((state) => state.NewComment);
    const { success: likecommentSuccess, error: likecommentError, message: likecommentMessage } = useSelector((state) => state.LikeComment);
    const { success: savePostSuccess, error: savePostError, message: savePostMessage } = useSelector((state) => state.SavePost);

    useEffect(() => {
        if (error) {
            dispatch(clearPostsError())
            toast.error(error, { position: 'top-right' });
        }
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
        dispatch(getPostOfFollowing())
    }, [dispatch, error, likeError, likeSuccess, editPostError, editPostSuccess, likecommentSuccess,
        likecommentError, deleteError, deleteSuccess, commentSuccess, commentError, savePostSuccess, savePostError])


    return (
        <Box className={classes.mainContainer}  >
            {posts?.map((p, i) => (
                <SinglePost post={p} key={p._id} />
            ))}
        </Box >
    );
}

export default PostContainer;
