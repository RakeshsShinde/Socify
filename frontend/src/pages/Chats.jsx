import React from 'react';
import { Box } from '@mui/material';
import MyChats from '../component/Chats/MyChats';
import ChatBox from '../component/Chats/ChatBox';
import useStyle from './chats.style';

const Chats = () => {
    const classes = useStyle();
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
