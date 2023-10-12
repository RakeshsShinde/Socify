import React from 'react';
import { Avatar, MenuItem, Stack, Typography } from '@mui/material';
import { formatLatestMessage, getSenderInfo } from '../../../../Helper/ChatLogic';
import { setselectedChat } from '../../../../reducers/chatreducers/chatSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { getAllNotifications, markNotificationAsRead } from '../../../../actions/notificationActions';


const MessageItem = ({ user, notification }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const senderInfo = notification.message?.chat?.isgroupChat
        ? {
            username: getSenderInfo(user, notification?.recipients).username,
            chatName: notification.message?.chat?.chatName,
            profilePic: notification.message?.chat?.profilePic?.url
        }
        : {
            username: getSenderInfo(user, notification?.recipients).username,
            profilePic: getSenderInfo(user, notification?.recipients).profilePic?.url
        };

    const handleClick = async () => {
        await dispatch(setselectedChat(notification?.message?.chat));
        await dispatch(markNotificationAsRead({ notificationId: notification?._id }))
        await navigate('/chats');
        await dispatch(getAllNotifications())
    }

    return (
        <MenuItem onClick={handleClick}
            sx={{ padding: '8px 15px', display: 'flex', gap: '1.2rem' }} >
            <Avatar style={{ width: '40px', height: '40px' }} src={senderInfo.profilePic} />
            <Stack direction='column' >
                <Typography variant='subtitle1'>
                    {notification.message?.chat?.isgroupChat ? senderInfo.chatName : senderInfo.username}
                    {" "}
                    <span style={{ fontSize: '14px', color: 'gray' }}>
                        Send Message
                    </span>
                </Typography>
                <Typography variant='subtitle1' sx={{ marginTop: '-8px !important' }}>
                    {senderInfo.username}:
                    {" "}
                    <span style={{ fontSize: '14px', color: 'gray' }}>
                        {formatLatestMessage(notification?.message?.content)}
                    </span>
                </Typography>
            </Stack>
        </MenuItem>
    );
}

export default MessageItem;