import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Box, Button, CircularProgress, Divider, IconButton, LinearProgress, Modal, Stack, TextField, Typography } from '@mui/material';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import { updateModalWrapper, useStyles } from './updategroup.style';
import UserChipItem from '../../Chats/UserChipItem';
import { searchUser } from '../../../actions/userActions';
import { renameGroup, editprofilePic, addUserToGroup, removeUserFromGroup } from '../../../actions/chatActions';
import { setselectedChat, unselectChat } from '../../../reducers/chatreducers/chatSlice'
import UserListItem from '../../Chats/UserListItem';
import { toast } from 'react-toastify';

const UpdateGroupModal = ({ open, onClose, fetchMessages }) => {
    const classes = useStyles();
    const fileinputRef = useRef(null);
    const dispatch = useDispatch();
    const [profilepic, setprofilepic] = useState('');
    const [groupName, setgroupName] = useState('');
    const [search, setsearch] = useState('');

    const { selectedChat } = useSelector((state) => state.Chats);
    const { searchUsers, loading: searchLoading } = useSelector((state) => state.SearchUser);
    const { picloading, renameloading } = useSelector((state) => state.UpdateGroup);
    const { user } = useSelector((state) => state.Login);

    useEffect(() => {
        if (search.trim() != '') {
            dispatch(searchUser(search));
        }
    }, [search, dispatch])

    const handleSearch = (query) => {
        setsearch(query);
    }

    const profilepicChange = (event) => {
        if (event.target.name == 'profilepic') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setprofilepic(reader.result);
                }
            }
            reader.readAsDataURL(event.target.files[0]);
        }

    }

    const addtoGroup = async (usertoAdd) => {
        if (selectedChat.users.find((user) => user._id === usertoAdd._id)) {
            toast.error('user already added ..', { position: 'bottom-center', theme: 'dark' });
            return;
        }
        try {
            const { payload } = await dispatch(addUserToGroup({ userId: usertoAdd._id, groupId: selectedChat._id }));
            await dispatch(setselectedChat(payload.data));
            resetForm();
        } catch (err) {

        }

    }

    const handleRemove = async (userToRemove) => {

        if (selectedChat.groupAdmin._id !== user._id && userToRemove._id !== user._id) {
            toast.error('only admin can remove someone!', { position: 'bottom-center', theme: 'dark' });
            return;
        }

        try {
            const { payload } = await dispatch(removeUserFromGroup({ userId: userToRemove._id, groupId: selectedChat._id }));
            if (userToRemove._id === user._id) {
                await dispatch(unselectChat());
            } else {
                await dispatch(setselectedChat(payload.data));
            }
            fetchMessages();
        } catch (err) {
            await onClose();
            console.log(err);
        }
    }

    const handleRename = async () => {
        if (!groupName) return;
        try {
            await dispatch(renameGroup({ groupName, groupId: selectedChat._id }));
            resetForm();
            onClose();
        } catch (err) {
            toast.error('failed to rename group !', { position: 'bottom-center' })
        }
    }

    const handleleaveGroup = async () => {
        await handleRemove(user);
        await onClose();
    }

    const resetForm = () => {
        setprofilepic('');
        setgroupName('');
    }

    const handleProfileUpdate = async () => {
        try {
            await dispatch(editprofilePic({ groupId: selectedChat._id, profilepic }));
            resetForm();
            onClose();
        } catch (err) {
            toast.error('failed to update profilepic', { position: 'bottom-center' });
        }
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Box sx={updateModalWrapper} >
                {picloading || renameloading && (<LinearProgress />)}
                <Stack direction={'row'} className={classes.header} >
                    <Typography variant='h5'>{selectedChat?.chatName}</Typography>
                    <IconButton onClick={onClose}>
                        <IoIosCloseCircleOutline size={28} />
                    </IconButton>
                </Stack>
                <Divider className={classes.divider} />
                <Stack className={classes.groupProfileContainer} direction={"row"}>
                    <Box>
                        < Avatar sx={{ width: '150px', height: '150px', marginLeft: '60px' }} src={profilepic} alt={profilepic} />
                        <input
                            name='profilepic'
                            accept='image/*'
                            onChange={(event) => profilepicChange(event)}
                            style={{ display: 'none' }}
                            type={'file'}
                            ref={fileinputRef} />
                        <Stack direction='row'>
                            <Button className={classes.uploadbtn} onClick={() => fileinputRef.current.click()} variant='contained'>Upload </Button>
                            <Button
                                onClick={handleProfileUpdate}
                                className={classes.profileupdatebtn}
                                disabled={!profilepic}
                                color={'success'}
                                variant='contained'>
                                update
                            </Button>
                            {/* <CircularProgress /> */}
                        </Stack>
                    </Box>
                </Stack>
                <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', padding: '10px 25px' }}>
                    {selectedChat?.users?.map((u) => (
                        <UserChipItem key={u._id} user={u} handleFunction={() => handleRemove(u)} />
                    ))}
                </Box>
                <Stack direction='column' className={classes.formWrapper}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <TextField
                            sx={{ flexGrow: 1 }}
                            label='Group name'
                            placeholder='Enter group name..'
                            type='text'
                            size='small'
                            value={groupName}
                            onChange={(e) => setgroupName(e.target.value)}
                        />
                        <Button
                            className={classes.profileupdatebtn}
                            onClick={handleRename}
                            variant='contained'
                            color={'success'}>
                            update
                        </Button>
                    </Box>
                    <TextField
                        label='Group members'
                        placeholder='Add users e.g rakesh,john,abhi'
                        type='text'
                        size='small'
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    {searchLoading ?
                        <CircularProgress sx={{ width: '5px', height: '5px' }} />
                        : (
                            searchUsers?.slice(0, 2).map((u) => (
                                <UserListItem
                                    key={u._id}
                                    user={u}
                                    handleFunction={() => addtoGroup(u)}
                                />
                            ))
                        )}
                </Stack>
                <Divider className={classes.divider} />
                <Box sx={{ padding: '10px 20px', width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant='outlined' color={'error'} onClick={handleleaveGroup} >Leave group</Button>
                </Box>
            </Box>
        </Modal >
    );
}

export default UpdateGroupModal;
