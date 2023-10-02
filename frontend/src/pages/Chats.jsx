import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import MyChats from '../component/Chats/MyChats';
import ChatBox from '../component/Chats/ChatBox';
import useStyle from './chats.style';
import { useSelector, useDispatch } from 'react-redux';
import { clearFollowUserSuccess, clearFollowUserError } from '../reducers/UserReducers/followUserSlice';
import { toast } from 'react-toastify';

const Chats = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const { success: followSuccess, error: followUserError, message: followUserMessage } = useSelector((state) => state.FollowUser);

    useEffect(() => {
        if (followSuccess) {
            dispatch(clearFollowUserSuccess());
            toast.success(followUserMessage, { position: 'top-right', theme: 'dark' });
        }
        if (followUserError) {
            dispatch(clearFollowUserError());
            toast.success(followUserError, { position: 'top-right', theme: 'dark' });
        }
    }, [followSuccess, followUserError])
    return (
        <div className={classes.container}>
            <Box className={classes.chatsWrapper}>
                <MyChats />
                <ChatBox />
            </Box>
        </div>
    );
}

export default Chats;
