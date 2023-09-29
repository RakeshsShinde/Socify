import React from 'react';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SingleChat from './SingleChat';

const ChatBox = () => {
    const dispatch = useDispatch();
    const { selectedChat } = useSelector((state) => state.Chats);

    return (
        <Box
            sx={{
                display: { xs: selectedChat ? 'flex' : 'none', sm: selectedChat ? "flex" : "none", md: "flex" },
                alignItems: 'center',
                flexDirection: 'column',
                padding: '3px !important',
                backgroundColor: 'white !important',
                borderRadius: '8px',
                width: { xs: "100%", sm: "100%", md: "68%" },
            }}>
            <SingleChat />
        </Box>
    );
}

export default ChatBox;
