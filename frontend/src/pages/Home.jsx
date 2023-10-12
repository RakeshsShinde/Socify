import { Container } from '@mui/material';
import React, { useEffect } from 'react';
import PostContainer from '../component/Posts/PostContainer';
import LeftSection from '../component/Layout/HomeLayout/LeftSection'
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { clearSuccess } from '../reducers/UserReducers/LoginSlice';
import { clearPostSuccess } from '../reducers/PostReducers/NewPostSlice';
import { clearFollowUserSuccess, clearFollowUserError } from '../reducers/UserReducers/followUserSlice';
import { cleardeleteCommentError, cleardeleteCommentSuccess } from '../reducers/CommentReducers/DeleteCommentSlice';
import { clearReplayError, clearReplaySuccess } from '../reducers/CommentReducers/ReplaySlice';
import { clearReplayLikeSuccess, clearReplayLikeError } from '../reducers/CommentReducers/likeReplaySlice';
import { clearDeleteReplayError, clearDeleteReplaySuccess } from '../reducers/CommentReducers/DeleteReplaySlice';
import { setMessages } from '../reducers/messageReducers/messagesSlice';
import { useSocket } from '../context/SocketProvider';
import RightSection from '../component/Layout/HomeLayout/RightSection';
import { fetchAllchats } from '../actions/chatActions';
import { setnotifications } from '../reducers/notificationReducer/notificationSlice';
import { getAllNotifications, newNotification } from '../actions/notificationActions';
import { getPostOfFollowing } from '../actions/postActions';

const Home = () => {
    const { message, success, user } = useSelector((state) => state.Login);
    const { success: postsuccess, post: { message: postmessage } } = useSelector((state) => state.NewPost);
    const { success: followSuccess, error: followUserError, message: followUserMessage } = useSelector((state) => state.FollowUser);
    const { success: deleteSuccess, error: deleteError, message: deleteMessage } = useSelector((state) => state.DeleteComment);
    const { success: replaySuccess, error: replayError, message: replayMessage } = useSelector((state) => state.ReplayTocomment);
    const { success: replaylikeSuccess, error: replaylikeError, message: replaylikeMeesage } = useSelector((state) => state.LikeReplay);
    const { success: deleteReplaySuccess, error: deleteReplayError, message: deleteReplayMessage } = useSelector((state) => state.DeleteReplay);

    const dispatch = useDispatch();

    const { Socket, setisSocketConnected } = useSocket();
    const { selectedChat } = useSelector((state) => state.Chats);
    const { notifications } = useSelector((state) => state.Notifications);
    const { messages } = useSelector((state) => state.Messages);

    useEffect(() => {
        if (Socket) {
            Socket.emit('setup', user);
            Socket.on('connected', () => setisSocketConnected(true));
        }
    }, [Socket, user])

    useEffect(() => {
        dispatch(getAllNotifications())
    }, [])

    useEffect(() => {
        if (Socket) {
            Socket.on('message received', (newMessageReceived) => {
                if (!selectedChat || selectedChat._id !== newMessageReceived.chat._id) {
                    const hasMatchingNotification = notifications.some((notification) => {
                        return notification.message && notification.message._id.toString() === newMessageReceived._id.toString();
                    });
                    if (!hasMatchingNotification) {
                        giveMessageNotification(newMessageReceived);
                    }
                } else {
                    dispatch(setMessages([...messages, newMessageReceived]))
                }
                dispatch(fetchAllchats());
            })
            Socket.on('post like', (postlikeData) => {
                giveNotification(postlikeData);
            })
            Socket.on('post comment', (commentData) => {
                giveNotification(commentData);
            })
            Socket.on('follow user', (followData) => {
                giveNotification(followData);
            })
            Socket.on('save post', (saveData) => {
                giveNotification(saveData);
            })
            Socket.on('replay comment', (replayData) => {
                giveNotification(replayData);
            })
            Socket.on('comment like', (commentlikeData) => {
                giveNotification(commentlikeData);
            })

            return () => {
                Socket.off('message received');
                Socket.off('post like');
                Socket.off('post comment');
                Socket.off('follow user');
                Socket.off('save post');
                Socket.off('replay comment');
                Socket.off('comment like');
            };
        }
    })

    const giveMessageNotification = async (newMessageReceived) => {
        const { payload } = await dispatch(newNotification({
            sender: newMessageReceived.sender._id,
            type: 'message',
            desc: "new message",
            recipients: JSON.stringify(newMessageReceived?.chat?.users?.map(u => u._id)),
            message: newMessageReceived._id,
        }))
        await setnotifications([payload, ...notifications]);
        await dispatch(getAllNotifications());
    }


    const giveNotification = async (notificationData) => {
        const { payload } = await dispatch(newNotification({
            sender: notificationData.senderId,
            type: notificationData.type,
            desc: notificationData.message,
            recipients: JSON.stringify([notificationData.receiverId]),
            post: notificationData.post,
        }))
        await setnotifications([payload, ...notifications]);
        await dispatch(getAllNotifications());
        await dispatch(getPostOfFollowing());
    }



    useEffect(() => {
        if (success) {
            dispatch(clearSuccess())
            toast.success(message, { toastId: 'loginSuccess', position: 'top-right' })
        }
        if (postsuccess) {
            dispatch(clearPostSuccess());
            toast.success(postmessage, { position: 'top-right' });
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
        if (deleteError) {
            dispatch(cleardeleteCommentError());
            toast.error(deleteError, { position: 'top-right', theme: 'dark' });
        }
        if (deleteSuccess) {
            dispatch(cleardeleteCommentSuccess());
            toast.success(deleteMessage, { position: 'top-right', theme: 'dark' });
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

    }, [message, success, dispatch, postsuccess, deleteError, deleteSuccess, postmessage,
        followSuccess, followUserError, replayError, replaySuccess, replaylikeSuccess,
        replaylikeError, deleteReplaySuccess, deleteReplayError])

    return (
        <Container style={{ padding: '20px 35px', display: 'flex', gap: "0.1rem", }} maxWidth={'xl'}>
            <LeftSection />
            <PostContainer />
            <RightSection />
        </Container>
    );
}

export default Home;
