import { Avatar, Tooltip } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import ScrollFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender, isSameUser, messageMargin } from '../../Helper/ChatLogic';

const Scrollfeed = ({ messages }) => {
    const { user } = useSelector((state) => state.Login);
    return (
        <ScrollFeed>
            {messages && messages?.map((m, i) => (
                <div style={{ display: 'flex' }} key={m?._id}>
                    {(isSameSender(messages, m, i, user?._id)
                        || isLastMessage(messages, i, user?._id)
                    ) && (
                            <Tooltip title={m.sender?.username} placement='top-start'>
                                <Avatar sx={{
                                    marginTop: '7px',
                                    marginRight: '1px',
                                    cursor: 'pointer',
                                    width: '35px',
                                    height: '35px'

                                }} src={m.sender?.profilePic?.url} alt={m.sender?.username} />
                            </Tooltip>
                        )}
                    <span
                        style={{
                            backgroundColor: m.sender?._id === user?._id ? "#BEE3F8" : "#B9F5D0",
                            borderRadius: '20px',
                            padding: '5px 15px',
                            maxWidth: '75%',
                            marginLeft: messageMargin(messages, m, i, user?._id),
                            marginTop: isSameUser(messages, m, i) ? '5px' : "10px",
                        }}
                    >
                        {m.content}
                    </span>
                </div>
            ))
            }
        </ScrollFeed >
    );
}

export default Scrollfeed;
