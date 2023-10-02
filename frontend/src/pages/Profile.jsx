import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Avatar, Box, Button, Stack, Tab, Tabs, Typography } from '@mui/material';
import SinglePost from '../component/Posts/SinglePost';
import Likemodel from '../component/miscellaneous/modal/Likemodel';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile } from '../actions/userActions';
import { fetchUserPosts } from '../actions/postActions';
import EditProfile from '../component/user/EditProfileModal';
import { clearFollowUserError, clearFollowUserSuccess } from '../reducers/UserReducers/followUserSlice';
import { clearPostLikeError, clearPostLikeSucess } from '../reducers/PostReducers/LikePostSlice';
import { clearEditPostError, clearEditPostSuccess } from '../reducers/PostReducers/EditpostSlice';
import { clearDeletePostError, clearDeletePostSuccess } from '../reducers/PostReducers/DeletePostSlice';
import { clearlikeCommentError, clearlikeCommentSuccess } from '../reducers/CommentReducers/CommentLikeSlice';
import { clearCommentError, clearCommentSuccess } from '../reducers/CommentReducers/newCommentSlice';
import { cleardeleteCommentError, cleardeleteCommentSuccess } from '../reducers/CommentReducers/DeleteCommentSlice';
import { clearReplayError, clearReplaySuccess } from '../reducers/CommentReducers/ReplaySlice';
import { clearReplayLikeSuccess, clearReplayLikeError } from '../reducers/CommentReducers/likeReplaySlice';
import { clearDeleteReplayError, clearDeleteReplaySuccess } from '../reducers/CommentReducers/DeleteReplaySlice';
import { clearEditUserSuccess, clearEditUserError } from '../reducers/UserReducers/editProfileSlice';
import { clearSavePostError, clearSavePostSuccess } from '../reducers/PostReducers/SavePostSlice';
import { setUser } from '../reducers/UserReducers/LoginSlice';
import { followUser } from '../actions/userActions';
import { toast } from 'react-toastify';
import useStyles from './profile.style';
import { accessChat } from '../actions/chatActions';

const Profile = () => {
    const { userId } = useParams();
    const [FollowingDialog, setFollowingDialog] = useState(false);
    const [FollowerDialog, setFollowerDialog] = useState(false);
    const [EditModalOpen, setEditModalOpen] = useState(false);
    const [selectTab, setselectTab] = useState('posts');
    const [follow, setfollow] = useState(false);
    const postsRef = useRef(null);
    const profileRef = useRef(null);
    const { user: authuser } = useSelector((state) => state.Login);
    const dispatch = useDispatch();
    const classes = useStyles();
    const { user, posts, saved } = useSelector((state) => state.UserProfile);
    const { success: followSuccess, error: followError, message: followMessage } = useSelector((state) => state.FollowUser);
    const { success: likeSuccess, message: likeMessage, error: likeError } = useSelector((state) => state.LikePost);
    const { success: editPostSuccess, message: editPostMessage, error: editPostError } = useSelector((state) => state.EditPost);
    const { success: deleteSuccess, message: deleteMessage, error: deleteError } = useSelector((state) => state.DeletePost);
    const { success: commentSuccess, error: commentError, message: commentMessage } = useSelector((state) => state.NewComment);
    const { success: likecommentSuccess, error: likecommentError, message: likecommentMessage } = useSelector((state) => state.LikeComment);
    const { success: savePostSuccess, error: savePostError, message: savePostMessage } = useSelector((state) => state.SavePost);
    const { success: deleteCommentSuccess, error: deleteCommentError, message: deleteCommentMessage } = useSelector((state) => state.DeleteComment);
    const { success: edituserSuccess, error: edituserError, message: edituserMessage, loading: edituserloading } = useSelector((state) => state.Edituser);
    const { success: replaySuccess, error: replayError, message: replayMessage } = useSelector((state) => state.ReplayTocomment);
    const { success: replaylikeSuccess, error: replaylikeError, message: replaylikeMeesage } = useSelector((state) => state.LikeReplay);
    const { success: deleteReplaySuccess, error: deleteReplayError, message: deleteReplayMessage } = useSelector((state) => state.DeleteReplay);
    const loggedinUser = authuser._id === userId;
    const navigate = useNavigate();

    useEffect(() => {
        setfollow(authuser.following?.some((u) => u === user._id))
    }, [authuser?.following])

    useEffect(() => {
        scrollToProfile();
    }, [])


    const scrollToProfile = () => {
        if (profileRef.current) {
            profileRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }

    useEffect(() => {
        if (followSuccess) {
            toast.success(followMessage, { position: 'top-right', theme: 'dark' })
            dispatch(clearFollowUserSuccess());
        }
        if (followError) {
            toast.success(followError, { position: 'top-right', theme: 'dark' })
            dispatch(clearFollowUserError());
        }
        dispatch(fetchUserProfile(userId))
    }, [userId, dispatch, followSuccess, followError, edituserSuccess, edituserError])

    useEffect(() => {
        if (likeSuccess) {
            toast.success(likeMessage, { position: 'top-right', theme: 'dark' })
            dispatch(clearPostLikeSucess());
        }
        if (likeError) {
            toast.error(likeError, { position: 'top-right', theme: 'dark' })
            dispatch(clearPostLikeError());
        }
        if (editPostSuccess) {
            toast.success(editPostMessage, { position: 'top-right' });
            dispatch(clearEditPostSuccess());
        }
        if (editPostError) {
            toast.error(editPostError, { position: 'top-right' });
            dispatch((clearEditPostError()));
        }
        if (deleteError) {
            toast.error(deleteError, { position: 'top-right' });
            dispatch((clearDeletePostError()));
        }
        if (deleteSuccess) {
            toast.success(deleteMessage, { position: 'top-right' });
            dispatch((clearDeletePostSuccess()));
        }
        if (deleteCommentSuccess) {
            toast.success(deleteCommentMessage, { position: 'top-right' });
            dispatch((cleardeleteCommentSuccess()));
        }
        if (deleteCommentError) {
            toast.error(deleteCommentError, { position: 'top-right' });
            dispatch((cleardeleteCommentError()));
        }
        if (commentError) {
            toast.error(commentError, { position: 'top-right' });
            dispatch(clearCommentError());
        }
        if (commentSuccess) {
            toast.success(commentMessage, { position: 'top-right' });
            dispatch(clearCommentSuccess());
        }
        if (likecommentSuccess) {
            toast.success(likecommentMessage, { position: 'top-right' });
            dispatch((clearlikeCommentSuccess()));
        }
        if (likecommentError) {
            toast.error(likecommentError, { position: 'top-right' });
            dispatch(clearlikeCommentError());
        }
        if (savePostError) {
            toast.error(savePostError, { position: 'top-right' });
            dispatch((clearSavePostError()));
        }
        if (savePostSuccess) {
            toast.success(savePostMessage, { position: 'top-right' });
            dispatch(clearSavePostSuccess());
        }
        if (replaySuccess) {
            toast.success(replayMessage, { position: 'top-right' });
            dispatch(clearReplaySuccess());
        }
        if (replayError) {
            toast.error(replayError, { position: 'top-right' });
            dispatch(clearReplayError());
        }
        if (replaylikeSuccess) {
            toast.success(replaylikeMeesage, { position: 'top-right' });
            dispatch(clearReplayLikeSuccess());
        }
        if (replaylikeError) {
            toast.error(replaylikeError, { position: 'top-right' });
            dispatch(clearReplayError());
        }
        if (deleteReplaySuccess) {
            toast.success(deleteReplayMessage, { position: 'top-right' });
            dispatch(clearDeleteReplaySuccess());
        }
        if (deleteReplayError) {
            toast.error(deleteReplayError, { position: 'top-right' });
            dispatch(clearDeleteReplayError());
        }

        dispatch(fetchUserPosts({ userId, selectTab }))

    }, [userId, selectTab, likeSuccess, likeError, editPostSuccess, editPostError, deleteError, deleteSuccess,
        commentError, commentSuccess, savePostError, savePostSuccess, likecommentSuccess, likecommentError,
        deleteCommentSuccess, deleteCommentError, replaySuccess, replayError, replaylikeSuccess, replaylikeError,
        deleteReplaySuccess, deleteReplayError
    ]);

    const handleChange = (event, newValue) => {
        setselectTab(newValue);
    };

    const handleFollow = async () => {
        setfollow((prev) => !prev)
        const { payload } = await dispatch(followUser({ userId: userId }));
        await dispatch(setUser(payload?.user));
    }
    const openFollowingDialog = () => {
        setFollowingDialog(true);
    }

    const scrollToPosts = () => {
        if (postsRef.current) {
            postsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }
    const closeFollowingDialog = () => {
        setFollowingDialog(false);
    }
    const openFollowerDialog = () => {
        setFollowerDialog(true);
    }

    const closeFollowerDialog = () => {
        setFollowerDialog(false);
    }
    const handleAccessChat = async (userId) => {
        try {
            await dispatch(accessChat({ userId }));
            await navigate('/chats');
        } catch (err) {
            console.log(err);
            toast.error('unable to create chat !', 404);
        }
    }

    return (
        <Box className={classes.container} ref={profileRef}>
            <Box className={classes.userProfileWrappper} >
                <Box className={classes.userinfoWrapper}>
                    <Stack direction={'row'} className={classes.userinfoHeader}>
                        <Avatar src={user.profilePic?.url} alt={user.username} sx={{ width: '100px', height: '100px' }} />
                        <Box className={classes.usermetaDataWrapper}>
                            <Stack direction={'column'} className={classes.usermetaData} onClick={scrollToPosts} >
                                <Typography variant='h6'>{user?.posts?.length}</Typography>
                                <Typography variant='subtitle1'>posts</Typography>
                            </Stack>
                            <Stack direction={'column'} onClick={openFollowerDialog} className={classes.usermetaData}>
                                <Typography variant='h6'>{user.followers?.length}</Typography>
                                <Typography variant='subtitle1'>followers</Typography>
                            </Stack>
                            <Stack direction={'column'} onClick={openFollowingDialog} className={classes.usermetaData}>
                                <Typography variant='h6'>{user.following?.length}</Typography>
                                <Typography variant='subtitle1'>following</Typography>
                            </Stack>
                        </Box>
                    </Stack>
                    <Box className={classes.userDetails}>
                        <Typography variant='subtitle1' className={classes.username}>{user.username}</Typography>
                        <Typography variant='subtitle2' className={classes.userbio}>{user.Bio}</Typography>
                        <Typography variant='subtitle2' className={classes.contactMe}>Contact Me:{" "}
                            <Link to={`mailto:${user.email}`}>
                                <span className={classes.userEmail}>{user.email}</span>
                            </Link>
                        </Typography>
                    </Box>
                    {
                        loggedinUser ?
                            <Button variant='outlined' onClick={() => setEditModalOpen(true)} className={classes.editProfile}>Edit Profile</Button>
                            : <Box className={classes.buttonsWrapper} >
                                <Button
                                    variant='outlined'
                                    className={classes.followbtn}
                                    onClick={handleFollow}>
                                    {follow ? "following" : "follow"}
                                </Button>
                                <button onClick={() => handleAccessChat(userId)} className={classes.messagebtn} >message</button>
                            </Box>
                    }
                </Box>
                <Box className={classes.postsContainer}>
                    <Box className={classes.divider}>
                        <Tabs value={selectTab} onChange={handleChange} centered>
                            <Tab sx={{ width: loggedinUser ? '50%' : '100%' }} label="Posts" value={'posts'} />
                            {loggedinUser && (
                                <Tab sx={{ width: '50%' }} label="Saved" value={'saved'} />
                            )}
                        </Tabs>
                    </Box>
                    <Box className={classes.postsWrapper} ref={postsRef}>
                        {selectTab === 'posts' ? (
                            posts?.length > 0 ? (
                                posts.map((p) => (
                                    <SinglePost post={p} key={p._id}></SinglePost>
                                ))
                            ) : (
                                <Typography variant="h6" className={classes.noPosts}>No posts yet.</Typography>
                            )
                        ) : (
                            saved?.length > 0 ? (
                                saved.map((p) => (
                                    <SinglePost post={p} key={p._id}></SinglePost>
                                ))
                            ) : (
                                <Typography variant="h6" className={classes.noPosts} >No saved posts yet.</Typography>
                            )
                        )}
                    </Box>
                </Box>
            </Box>
            <Likemodel heading={'Following'} open={FollowingDialog} handleClose={closeFollowingDialog} users={user.following} />
            <Likemodel heading={'Followers'} open={FollowerDialog} handleClose={closeFollowerDialog} users={user.followers} />
            <EditProfile open={EditModalOpen} setopen={setEditModalOpen} />
        </Box>
    );
}

export default Profile;
