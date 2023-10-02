import React, { useEffect, useState } from 'react';
import { Box, Modal, Typography, Stack, IconButton, Avatar, Divider, Button } from '@mui/material';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { profileViewModal, useStyles } from './ProfileViewModal.style';
import { useSelector, useDispatch } from 'react-redux';
import { followUser } from '../../../actions/userActions';
import { setUser } from '../../../reducers/UserReducers/LoginSlice';

const ProfileViewModal = ({ open, onClose, user }) => {
    const classes = useStyles();
    const [follow, setfollow] = useState(false);
    const dispatch = useDispatch();
    const { user: loggedinUser } = useSelector((state) => state.Login);

    useEffect(() => {
        setfollow(loggedinUser?.following?.some((u) => u === user?._id))
    }, [loggedinUser?.following, user])

    const handleFollow = async () => {
        setfollow((prev) => !prev)
        const { payload } = await dispatch(followUser({ userId: user?._id }));
        await dispatch(setUser(payload?.user));
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Box sx={profileViewModal}>
                <Stack direction={'row'} className={classes.header}>
                    <Box className={classes.userdetailsWrepper}>
                        <Typography variant='h6' >{user?.username}</Typography>
                        <Typography variant='subtitle2'>{user?.email}</Typography>
                    </Box>
                    <IconButton onClick={onClose}>
                        <IoIosCloseCircleOutline size={28} />
                    </IconButton>
                </Stack>
                <Divider />
                <Avatar src={user?.profilePic?.url}
                    alt={user?.username}
                    sx={{ width: '400px', height: '400px', margin: '10px auto' }} />
                <Divider />
                <Box className={classes.buttonWrpper}>
                    <Button variant='contained' color='primary' onClick={handleFollow} className={classes.followbtn}>
                        {follow ? "unfollow" : "follow"}
                    </Button>
                </Box>
            </Box>

        </Modal>
    );
}

export default ProfileViewModal;
