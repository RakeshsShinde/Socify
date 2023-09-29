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
import NotificationDialog from './Notification/NotificationDialog';

const Navbar = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [NotianchorEl, setNotiAnchorEl] = useState(null);
    const notiopen = Boolean(NotianchorEl);
    const open = Boolean(anchorEl);
    const { user: loggedinuser } = useSelector((state) => state?.Login || {})
    const { notification } = useSelector((state) => state.Notification);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const openNotification = (event) => {
        setNotiAnchorEl(event.currentTarget);
    }

    const closeNotification = () => {
        setNotiAnchorEl(null);
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
                            <IconButton onClick={openNotification} >
                                <Badge badgeContent={notification?.length} color='error'>
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
                            <IconButton >
                                <Badge badgeContent={10} color='primary'>
                                    <IoMdNotificationsOutline size={30} color='green' />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <IconButton
                            onClick={handleClick}
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
                    <Menus anchorEl={anchorEl} open={open} handleClose={handleClose} />
                    <NotificationDialog anchorEl={NotianchorEl} open={notiopen} handleClose={closeNotification} />
                </div>
            </AppBar>
            <Divider sx={{
                marginTop: '68px'
            }} />
        </>
    );
}

export default Navbar;
