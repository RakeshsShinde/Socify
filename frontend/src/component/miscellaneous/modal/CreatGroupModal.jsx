import React, { useState, useEffect, useRef } from 'react';
import { Avatar, Box, Button, CircularProgress, Divider, IconButton, LinearProgress, Modal, Stack, TextField, Typography } from '@mui/material'
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { searchUser } from '../../../actions/userActions';
import { createNewGroup } from '../../../actions/chatActions';
import { toast } from 'react-toastify';
import { setChats } from '../../../reducers/chatreducers/chatSlice';
import UserListItem from '../../Chats/UserListItem';
import UserChipItem from '../../Chats/UserChipItem';
import { useStyles, modalContainer } from './creategroup.style'


const CreatGroupModal = ({ open, onClose }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const fileinputRef = useRef(null);
    const [profilepic, setprofilepic] = useState('');
    const [groupName, setgroupName] = useState('');
    const [selectedUsers, setselectedUsers] = useState([]);
    const [search, setsearch] = useState('');

    const { searchUsers, loading: searchLoading } = useSelector((state) => state.SearchUser);
    const { chats } = useSelector((state) => state.Chats);
    const { loading: groupLoading } = useSelector((state) => state.NewGroup);

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

    const addtoGroup = (user) => {
        if (selectedUsers.includes(user)) {
            toast.success('user already added !', { position: 'bottom-center' });
            return;
        }
        setselectedUsers([...selectedUsers, user]);
    }

    const handleDelete = (user) => {
        setselectedUsers(selectedUsers.filter((s) => s._id !== user._id));
    }

    const resetForm = () => {
        setgroupName('');
        setselectedUsers([]);
        setsearch('');
        setprofilepic('');
    }

    const handleSubmit = async () => {
        if (!groupName || !selectedUsers || !profilepic) {
            toast.error('please fill all the fields!', { position: 'bottom-center', theme: 'dark' });
            return;
        }
        try {
            const { payload } = await dispatch(createNewGroup({ groupName, users: JSON.stringify(selectedUsers.map(s => s._id)), profilepic }))
            await dispatch(setChats([payload.createGroupChat, ...chats]));
            resetForm();
            toast.success('group created Successfully !', { position: 'bottom-center' });
            onClose();

        } catch (err) {
            toast.error('unable to create group!', { position: 'bottom-center' })
        }

    }

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Box sx={modalContainer} >
                {groupLoading && <LinearProgress />}
                <Stack direction={'row'} className={classes.header} >
                    <Typography variant='h5'>Create New Group</Typography>
                    <IconButton onClick={onClose}>
                        <IoIosCloseCircleOutline size={28} />
                    </IconButton>
                </Stack>
                <Divider className={classes.divider} />
                <Stack className={classes.groupProfileContainer} direction={"row"}>
                    <Box>
                        < Avatar sx={{ width: '150px', height: '150px' }} src={profilepic} alt={profilepic} />
                        <input
                            name='profilepic'
                            accept='image/*'
                            onChange={(event) => profilepicChange(event)}
                            style={{ display: 'none' }}
                            type={'file'}
                            ref={fileinputRef} />
                        <Button className={classes.uploadbtn} onClick={() => fileinputRef.current.click()} variant='contained'>Upload </Button>
                    </Box>
                </Stack>
                <Stack direction='column' className={classes.formWrapper}>
                    <TextField
                        value={groupName}
                        label='Group name'
                        placeholder='Enter group name..'
                        type='text'
                        size='small'
                        onChange={(e) => setgroupName(e.target.value)}
                    ></TextField>
                    <TextField
                        label='Group member'
                        placeholder='Add users e.g rakesh,ashutosh,abhi'
                        type='text'
                        size='small'
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                    ></TextField>
                    <Box>
                        {selectedUsers.map((u) => (
                            <UserChipItem key={u._id} user={u} handleFunction={() => handleDelete(u)} />
                        ))}
                    </Box>
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
                <Box className={classes.buttonsContainer}>
                    <Stack direction='row' className={classes.buttonsWrapper} >
                        <Button color={'error'} variant='outlined' size='small' onClick={resetForm}>Reset</Button>
                        <Button variant='contained' size='small' className={classes.submitBtn} onClick={handleSubmit}>Create</Button>
                    </Stack>
                </Box>
            </Box >
        </Modal >
    );
}

export default CreatGroupModal;
