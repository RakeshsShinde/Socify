import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack, IconButton, CircularProgress, TextField, Button, Tooltip } from '@mui/material';
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
import ProfileViewModal from '../miscellaneous/modal/ProfileViewModal';

var selectedChatCmp;
const SingleChat = () => {
    const [openUpdateGroup, setopenUpdateGroup] = useState(false);
    const [newmessage, setnewmessage] = useState('');
    const [typing, settyping] = useState(false);
    const [isTyping, setisTyping] = useState(false);
    const [openProfileModal, setopenProfileModal] = useState(false);

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
                dispatch(fetchAllchats());
            })
            return () => {
                Socket.off('message received');
            };
        }
    })


    const handleClose = () => {
        setopenUpdateGroup(false);
    }

    const handleProfileModalClose = () => {
        setopenProfileModal(false);
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
        if ((!e || e.key === "Enter") && newmessage) {
            Socket.emit("stop typing", selectedChat._id);
            const { payload } = await dispatch(sendMessage({ chatId: selectedChat._id, content: newmessage }));
            setnewmessage("");
            Socket.emit("new message", payload);
            await dispatch(setMessages([...messages, payload]));
            dispatch(fetchAllchats());
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
                            <Tooltip title={'view profile'} placement='bottom'>
                                <IconButton onClick={() => setopenProfileModal(true)}>
                                    <AiFillEye size={22} />
                                </IconButton>
                            </Tooltip>
                        )
                            : (
                                <Tooltip title={'group info'} placement='bottom'>
                                    <IconButton onClick={() => setopenUpdateGroup(true)}>
                                        <BsInfoCircle size={22} />
                                    </IconButton>
                                </Tooltip>
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
                                onKeyDown={(e) => sendmessage(e)}
                                value={newmessage}
                                onChange={typinghandler}
                            />
                            <Button onClick={sendmessage} sx={{
                                cursor: newmessage ? "pointer" : "not-allowed",
                                color: "white",
                                textAlign: 'center',
                                backgroundColor: '#06d6a0',
                                "&:hover": {
                                    backgroundColor: '#06d6a0',

                                }
                            }} endIcon={<BsFillSendFill size={18} />}>
                                Send
                            </Button>
                        </Box>
                    </Box>
                </>
            ) : (
                <Box className={classes.heading}>
                    <Typography variant='h5' fontFamily={'"Work Sans", sans-serif !important'}>Click on user to start chating </Typography>
                </Box>
            )}
            <UpdateGroupModal open={openUpdateGroup} onClose={handleClose} fetchMessages={fetchMessages} />
            <ProfileViewModal open={openProfileModal} onClose={handleProfileModalClose} user={getSenderInfo(user, selectedChat?.users)} />
        </>
    );
}

export default SingleChat;
