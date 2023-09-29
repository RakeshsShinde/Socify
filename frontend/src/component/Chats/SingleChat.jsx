import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack, IconButton, CircularProgress, TextField } from '@mui/material';
import { HiArrowLeft } from 'react-icons/hi';
import { BsFillSendFill, BsInfoCircle } from 'react-icons/bs';
import { unselectChat } from '../../reducers/chatreducers/chatSlice';
import { getSenderInfo } from '../../Helper/ChatLogic';
import { AiFillEye } from 'react-icons/ai';
import { sendMessage, getAllmessages } from '../../actions/messageActions';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../../reducers/messageReducers/messagesSlice';
import { toast } from 'react-toastify';
import Scrollfeed from './Scrollfeed';
import animationData from '../../animations/typing.json';
import { setNotification } from '../../reducers/notificationReducer/notificationReducer';
import { fetchAllchats } from '../../actions/chatActions';
import Lottie from 'react-lottie';
import useStyles from './singleChat.style';
import { useSocket } from '../../context/SocketProvider';
import UpdateGroupModal from '../miscellaneous/modal/UpdateGroupModal';

var selectedChatCmp;
const SingleChat = () => {
    const [openUpdateGroup, setopenUpdateGroup] = useState(false);
    const [newmessage, setnewmessage] = useState('');
    const [typing, settyping] = useState(false);
    const [isTyping, setisTyping] = useState(false);

    const dispatch = useDispatch();
    const classes = useStyles();
    const { Socket, isSocketConnected } = useSocket();
    const { selectedChat } = useSelector((state) => state.Chats);
    const { notification } = useSelector((state) => state.Notification);
    const { user } = useSelector((state) => state.Login);
    const { loading, messages } = useSelector((state) => state.Messages);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    useEffect(() => {
        fetchMessages();
        selectedChatCmp = selectedChat;
    }, [selectedChat])

    useEffect(() => {
        if (Socket) {
            Socket.on('typing', () => setisTyping(true));
            Socket.on('stop typing', () => setisTyping(false));
        }
    }, [])

    useEffect(() => {
        if (Socket) {
            Socket.on('message received', (newMessageReceived) => {
                if (!selectedChatCmp || selectedChatCmp._id !== newMessageReceived.chat._id) {
                    if (!notification.includes(newMessageReceived)) {
                        dispatch(setNotification([newMessageReceived, ...notification]));
                        dispatch(fetchAllchats());
                    }
                } else {
                    dispatch(setMessages([...messages, newMessageReceived]))
                }
            })
            return () => {
                Socket.off('message received');
            };
        }
    })


    const handleClose = () => {
        setopenUpdateGroup(false);
    }

    const fetchMessages = async () => {
        if (!selectedChat) return;
        try {
            await dispatch(getAllmessages({ chatId: selectedChat._id }));
            Socket.emit('join room', selectedChat._id);
        } catch (err) {
            toast.error('somthing went wrong', { position: 'bottom-center', theme: 'dark' })
        }
    }

    const typinghandler = (e) => {
        setnewmessage(e.target.value);
        if (!isSocketConnected) return;
        if (!typing) {
            settyping(true);
            Socket.emit('typing', selectedChat._id);
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;
            if (timeDiff >= timerLength && typing) {
                Socket.emit('stop typing', selectedChat._id);
                settyping(false);
            }
        }, timerLength)
    }

    const sendmessage = async (e) => {
        if (e.key == "Enter" && newmessage) {
            Socket.emit("stop typing", selectedChat._id);
            const { payload } = await dispatch(sendMessage({ chatId: selectedChat._id, content: newmessage }));
            setnewmessage("");
            Socket.emit("new message", payload);
            await dispatch(setMessages([...messages, payload]));
        }
    }

    return (
        <>
            {selectedChat ? (
                <>
                    <Stack direction='row' sx={{ width: '100%', padding: '10px 25px', alignItems: 'center', justifyContent: { sm: 'space-between' } }}>
                        <IconButton sx={{
                            display: { xs: "flex", sm: "flex", md: "none" }
                        }} onClick={() => dispatch(unselectChat())}>
                            <HiArrowLeft size={22} />
                        </IconButton>
                        <Typography variant='h6'>{!selectedChat.isgroupChat ? getSenderInfo(user, selectedChat.users).username : selectedChat.chatName}</Typography>
                        {!selectedChat.isgroupChat ? (
                            <IconButton>
                                <AiFillEye size={22} />
                            </IconButton>
                        )
                            : (
                                <IconButton onClick={() => setopenUpdateGroup(true)}>
                                    <BsInfoCircle size={22} />
                                </IconButton>
                            )}
                    </Stack>
                    <Box className={classes.messageContainer} >
                        {loading ? (<CircularProgress className={classes.loader} />)
                            : (
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    overflowY: 'scroll',
                                    scrollbarWidth: 'none !important',
                                    '&::-webkit-scrollbar': {
                                        display: 'none',
                                    },

                                }}>
                                    <Scrollfeed messages={messages} />
                                    {isTyping ? <div style={{ marginTop: '20px' }}>
                                        <Lottie
                                            options={defaultOptions}
                                            width={70}
                                            style={{ marginLeft: 0, }}

                                        />
                                    </div> : <></>}
                                </Box>
                            )}
                        <Box className={classes.msginputContainer}>
                            <TextField
                                className={classes.msginput}
                                placeholder='send something..'
                                type='text'
                                size='small'
                                onKeyDown={sendmessage}
                                value={newmessage}
                                onChange={typinghandler}
                            />
                            <BsFillSendFill size={25} style={{
                                cursor: newmessage ? "pointer" : "not-allowed",
                                color: newmessage ? "#06d6a0" : "#086375"
                            }} />
                        </Box>
                    </Box>
                </>
            ) : (
                <Box className={classes.heading}>
                    <Typography variant='h5' fontFamily={'"Work Sans", sans-serif !important'}>Click on user to start chating </Typography>
                </Box>
            )}
            <UpdateGroupModal open={openUpdateGroup} onClose={handleClose} fetchMessages={fetchMessages} />
        </>
    );
}

export default SingleChat;
