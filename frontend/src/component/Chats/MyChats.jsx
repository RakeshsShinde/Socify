import React, { useState, useEffect } from 'react';
import { Box, Stack, IconButton, Tooltip, Typography, Avatar } from '@mui/material';
import { MdGroupAdd } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { searchUser } from '../../actions/userActions';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar/Sidebar';
import { fetchAllchats } from '../../actions/chatActions';
import { setselectedChat } from '../../reducers/chatreducers/chatSlice';
import { formatLatestMessage, getSenderInfo } from '../../Helper/ChatLogic';
import { clearError, clearSuccess } from '../../reducers/chatreducers/updateProfileSlice'
import { clearAddNRemoveError, clearAddNRemoveSuccess } from '../../reducers/chatreducers/addNRemoveUsersSlice'
import GroupModal from '../miscellaneous/modal/CreatGroupModal';
import useStyles from './mychats.style';
import { formatDateinChat } from '../../Helper/FormatDate';

const MyChats = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [openSidebar, setopenSidebar] = useState(false);
    const [search, setsearch] = useState('');
    const [openGroupModal, setopenGroupModal] = useState(false);

    const { user } = useSelector((state) => state.Login);
    const { chats, selectedChat } = useSelector((state) => state.Chats);
    const { renameMessage, renameSuccess, picloadSuccess, picuploadmessage, error: updateError } = useSelector((state) => state.UpdateGroup);
    const { addsuccess, adderror, addMessage } = useSelector((state) => state.AddNRemoveUsers);
    const { removesuccess, removeError, removeMessage } = useSelector((state) => state.AddNRemoveUsers);

    useEffect(() => {
        if (renameSuccess) {
            toast.success(renameMessage, { position: 'bottom-center', theme: 'dark' })
            dispatch(clearSuccess());
        }
        if (picloadSuccess) {
            toast.success(picuploadmessage, { position: 'bottom-center', theme: 'dark' })
            dispatch(clearSuccess());
        }
        if (updateError) {
            toast.error(error, { position: 'bottom-center', theme: 'dark' })
            dispatch(clearError());
        }
        if (addsuccess) {
            toast.success(addMessage, { position: 'bottom-center', theme: 'dark' })
            dispatch(clearAddNRemoveSuccess());
        }

        if (adderror) {
            toast.error(adderror, { position: 'bottom-center', theme: 'dark' })
            dispatch(clearAddNRemoveError());
        }
        if (removesuccess) {
            toast.success(removeMessage, { position: 'bottom-center', theme: 'dark' })
            dispatch(clearAddNRemoveSuccess());
        }

        if (removeError) {
            toast.error(removeError, { position: 'bottom-center', theme: 'dark' })
            dispatch(clearAddNRemoveError());
        }

        dispatch(fetchAllchats())
    }, [dispatch, renameSuccess, picloadSuccess, updateError, addsuccess, adderror, removesuccess, removeError])

    const toggleSidebar = () => {
        setopenSidebar(!openSidebar)
    }

    const handleClose = () => {
        setopenGroupModal(false);
    }

    const handleSearch = async () => {
        if (search.length == 0) {
            toast.error('Enter something to search !', { position: 'top-right' });
        } else {
            await dispatch(searchUser(search))
            setsearch('');
        }
    }

    return (
        <Box className={classes.container} sx={{ display: { sm: selectedChat ? "none" : "flex", md: "flex" } }}>
            <Box className={classes.chatBox}>
                Messages
                <Tooltip title='create new group'>
                    <IconButton onClick={() => setopenGroupModal(true)} >
                        <MdGroupAdd size={28} color={'#006d77'} />
                    </IconButton>
                </Tooltip>
            </Box>
            <Box className={classes.searchToChat} onClick={toggleSidebar}>
                <Typography variant='subtitle2'>Search users to Chat</Typography>
                <FaSearch size={20} />
            </Box>
            <Box className={classes.chatlist}>
                <Stack direction='column' className={classes.chatWrppper}>
                    {chats?.map((c, i) => (
                        <Stack direction='row'
                            key={c?._id}
                            onClick={() => dispatch(setselectedChat(c))}
                            className={classes.singleChat}
                            sx={{
                                backgroundColor: selectedChat === c ? "#38B2AC" : "#E8E8E8",
                                color: selectedChat === c ? "white" : "black",
                            }}
                        >
                            <Avatar src={c ? (!c.isgroupChat ? getSenderInfo(user, c.users).profilePic.url : c.profilePic?.url) : ''} alt={'profilePic'} sx={{ width: '40px', height: '40px' }} />
                            <Box className={classes.chatInfoWrapper}  >
                                <Typography variant='subtitle1' className={classes.chatName} >
                                    {c ? (!c.isgroupChat ? getSenderInfo(user, c.users).username : c.chatName) : ''}
                                </Typography>
                                {c.latestMessage && (
                                    <Typography variant='subtitle1' >
                                        {c.latestMessage?.sender?.username}:{" "}
                                        <span >{formatLatestMessage(c.latestMessage?.content)}</span>
                                    </Typography>

                                )}
                            </Box>
                            {c.latestMessage && (
                                <Typography variant='subtitle2'>{formatDateinChat(c.latestMessage?.createdAt)}</Typography>
                            )}
                        </Stack>
                    ))}
                </Stack>
            </Box>
            <Sidebar open={openSidebar} onClose={toggleSidebar} search={search} setsearch={setsearch} handleSearch={handleSearch} />
            <GroupModal open={openGroupModal} onClose={handleClose} />
        </Box >

    );
}

export default MyChats;
