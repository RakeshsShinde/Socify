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
import { setNotification } from '../reducers/notificationReducer/notificationReducer';
import { useSocket } from '../context/SocketProvider';
import { fetchAllchats } from '../actions/chatActions';
import RightSection from '../component/Layout/HomeLayout/RightSection';

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
    const { messages } = useSelector((state) => state.Messages);
    const { notification } = useSelector((state) => state.Notification);

    useEffect(() => {
        if (Socket) {
            Socket.emit('setup', user);
            Socket.on('connected', () => setisSocketConnected(true));
        }
    }, [Socket, user])

    useEffect(() => {
        if (Socket) {
            Socket.on('message received', (newMessageReceived) => {
                if (!selectedChat || selectedChat?._id !== newMessageReceived?.chat?._id) {
                    if (!notification.includes(newMessageReceived)) {
                        dispatch(setNotification([newMessageReceived, ...notification]));
                        dispatch(fetchAllchats());
                    }
                } else {
                    dispatch(setMessages([...messages, newMessageReceived]))
                }
            })
            Socket.on('new like', (post) => {
                console.log('user like your post !', post._id);
            })

            return () => {
                Socket.off('message received');
                Socket.off('new like');
            };
        }

    })


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
        <Container style={{  padding: '20px 80px', display: 'flex', gap: "0.2rem",}} maxWidth={'xl'}>
            <LeftSection />
            <PostContainer />
            <RightSection />
        </Container>
    );
}

export default Home;
