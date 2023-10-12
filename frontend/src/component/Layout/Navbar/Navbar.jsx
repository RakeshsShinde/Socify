import React, { useState } from 'react';
import { AppBar, Avatar, Badge, Divider, IconButton, Tooltip, Typography } from '@mui/material'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { GoChevronDown } from 'react-icons/go'
import { BiMessage } from 'react-icons/bi'
import Zoom from '@mui/material/Zoom'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Searchbar from './Searchbar'
import Menus from '../../user/profileMenu/Menus'
import useStyles from './navbar.style'
import MessageNotification from './Notification/MessageNotification';
import Notifications from './Notification/Notifications';

const Navbar = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [NotianchorEl, setNotiAnchorEl] = useState(null);
    const [activityAnchorEl, setactivityAnchorEl] = useState(null);
    const messageOpen = Boolean(NotianchorEl);
    const activityOpen = Boolean(activityAnchorEl);
    const openMenu = Boolean(anchorEl);
    const { user: loggedinuser } = useSelector((state) => state?.Login || {});
    const { notifications } = useSelector((state) => state.Notifications);

    const messageNotifications = notifications?.filter((n) => n.type === 'message' && !n.isRead);
    const otherNotifications = notifications?.filter((n) => n.type !== 'message' && !n.isRead);

    const openUserMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const closeUserMenu = () => {
        setAnchorEl(null);
    };

    const openMessageNotification = (event) => {
        setNotiAnchorEl(event.currentTarget);
    }

    const closeMessageNotification = () => {
        setNotiAnchorEl(null);
    }

    const openActivity = (event) => {
        setactivityAnchorEl(event.currentTarget);
    }

    const closeAcitivity = () => {
        setactivityAnchorEl(null);
    }


    return (
        <>
            <AppBar className={classes.navbar}>
                <div className='flex justify-between h-full items-center '>
                    <div className='mx-24 text-red-400'>
                        <Link to={'/home'}>
                            <Typography
                                className={classes.logo}
                                variant='h4'
                            >Socify</Typography>
                        </Link>
                    </div>
                    <Searchbar />
                    <div className=' w-[15%] mr-8 flex justify-between  items-center'>
                        <Tooltip
                            TransitionProps={{ timeout: 200 }}
                            TransitionComponent={Zoom}
                            title='message'
                            draggable={'true'}
                            placement='bottom'>
                            <IconButton onClick={openMessageNotification} >
                                <Badge badgeContent={messageNotifications?.length} color='error'>
                                    <BiMessage size={28} color='gray' />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            TransitionProps={{ timeout: 200 }}
                            TransitionComponent={Zoom}
                            title='notification'
                            draggable={'true'}
                            placement='bottom-end'>
                            <IconButton onClick={openActivity} >
                                <Badge badgeContent={otherNotifications?.length} color='primary'>
                                    <IoMdNotificationsOutline size={30} color='green' />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <IconButton
                            onClick={openUserMenu}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            disableRipple
                            className={classes.userProfile}  >
                            <Avatar variant='circular'
                                end="True"
                                sx={{ width: 39, height: 39 }}
                                src={loggedinuser?.profilePic?.url}
                                alt={loggedinuser?.username} />
                            <GoChevronDown size={20} color='green' />
                        </IconButton>
                    </div>
                    <Menus anchorEl={anchorEl} open={openMenu} handleClose={closeUserMenu} />
                    <MessageNotification anchorEl={NotianchorEl} open={messageOpen} handleClose={closeMessageNotification} />
                    <Notifications anchorEl={activityAnchorEl} open={activityOpen} handleClose={closeAcitivity} />
                </div>
            </AppBar>
            <Divider sx={{
                marginTop: '68px'
            }} />
        </>
    );
}

export default Navbar;
