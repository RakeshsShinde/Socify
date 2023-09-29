import { Avatar, Box, Button, Divider, ListItemIcon, Menu, MenuItem, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { BiLogOut } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { HiMiniUserGroup } from 'react-icons/hi2';
import { IoCreateOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux'
import { logout, deleteUser } from '../../../actions/userActions';
import CreateNewPost from '../../Posts/CreateNewPost';
import { AiOutlineDelete } from 'react-icons/ai';
import EditProfileModal from '../EditProfileModal';
import { Link } from 'react-router-dom';
import { unselectChat } from '../../../reducers/chatreducers/chatSlice';
import { clearMessages } from '../../../reducers/messageReducers/messagesSlice';
import useStyles from './menus.styles';

const Menus = ({ anchorEl, handleClose, open }) => {
    const classes = useStyles();
    const [openpostmodel, setopenpostmodel] = useState(false);
    const [openEditModal, setopenEditModal] = useState(false);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.Login);

    const deleteAccount = async () => {
        await dispatch(deleteUser());
        await dispatch(logout());
    }

    const handleLogout = async () => {
        await dispatch(logout());
        await dispatch(unselectChat());
        await dispatch(clearMessages());
    }

    return (
        <>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    className: classes.paperprops,
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Box className={classes.userProfile} >
                    <Avatar src={user?.profilePic?.url} alt={user?.username} />
                    <Stack direction={'column'} lineHeight={'1.2'}>
                        <Typography variant='h6' >{user?.username}</Typography>
                        <Link to={`/profile/${user?._id}`}>
                            <Button variant='outlined' className={classes.button} >view profile</Button>
                        </Link>
                    </Stack>

                </Box>
                <Divider />
                <MenuItem
                    className={classes.menuItem}
                    onClick={() => setopenpostmodel(true)}>
                    <ListItemIcon>
                        <IoCreateOutline size={20} />
                    </ListItemIcon>
                    Create New Post
                </MenuItem>
                <MenuItem
                    className={classes.menuItem}
                    onClick={() => setopenEditModal(true)}>
                    <ListItemIcon>
                        <CgProfile size={20} />
                    </ListItemIcon>
                    Edit Profile
                </MenuItem>
                <MenuItem
                    className={classes.menuItem}
                    onClick={handleClose}>
                    <ListItemIcon>
                        <HiMiniUserGroup size={20} />
                    </ListItemIcon>
                    Create New Community
                </MenuItem>
                <MenuItem
                    className={classes.menuItem}
                    onClick={deleteAccount}>
                    <ListItemIcon>
                        <AiOutlineDelete size={20} />
                    </ListItemIcon>
                    Delete Account
                </MenuItem>

                <MenuItem
                    className={classes.menuItem}
                    onClick={handleLogout}>
                    <ListItemIcon >
                        <BiLogOut color={'crimson'} size={22} />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
            <CreateNewPost open={openpostmodel} setopen={setopenpostmodel} />
            <EditProfileModal open={openEditModal} setopen={setopenEditModal} />
        </>
    );
}

export default Menus;
