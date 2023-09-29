import { Avatar, MenuItem, Stack, Typography } from '@mui/material';
import React from 'react';
import { getSenderInfo } from '../../../../Helper/ChatLogic';
import { setselectedChat } from '../../../../reducers/chatreducers/chatSlice';
import { setNotification } from '../../../../reducers/notificationReducer/notificationReducer';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'


const NotificationItem = ({ user, notification }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { notification: allnotification } = useSelector((state) => state.Notification);
    const senderInfo = notification.chat?.isgroupChat
        ? {
            username: getSenderInfo(user, notification.chat.users).username,
            chatName: notification.chat?.chatName,
            profilePic: notification.chat?.profilePic?.url
        }
        : {
            username: getSenderInfo(user, notification.chat.users).username,
            profilePic: getSenderInfo(user, notification.chat.users).profilePic.url
        };

    const handleClick = async () => {
        await dispatch(setselectedChat(notification.chat));
        await dispatch(setNotification(allnotification.filter((n) => n !== notification)))
        await navigate('/chats');
    }
    
    return (
        <MenuItem onClick={handleClick}
            sx={{ padding: '8px 15px', display: 'flex', gap: '1.2rem' }} >
            <Avatar style={{ width: '40px', height: '40px' }} src={senderInfo.profilePic} />
            <Stack direction='column' sx={{}}>
                <Typography variant='subtitle1'>
                    {notification.chat.isgroupChat ? senderInfo.chatName : senderInfo.username}
                    {" "}
                    <span style={{ fontSize: '14px', color: 'gray' }}>
                        Send Message
                    </span>
                </Typography>
                <Typography variant='subtitle1' sx={{ marginTop: '-8px !important' }}>
                    {senderInfo.username}:
                    {" "}
                    <span style={{ fontSize: '14px', color: 'gray' }}>
                        {notification.content}
                    </span>
                </Typography>
            </Stack>
        </MenuItem>
    );
}

export default NotificationItem;
