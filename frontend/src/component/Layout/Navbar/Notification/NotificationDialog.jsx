import React from 'react';
import { Menu } from '@mui/material';
import { useSelector } from 'react-redux';
import NotificationItem from './NotificationItem';
import useStyles from './notificaionDialog.style';

const NotificationDialog = ({ anchorEl, handleClose, open }) => {
    const classes = useStyles();
    const { notification } = useSelector((state) => state.Notification);
    const { user } = useSelector((state) => state.Login);

    return (
        <>
            <Menu
                anchorEl={anchorEl}
                id="notification"
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
                {!notification.length && "no new messages !"}
                {notification?.map((noti) => (
                    <NotificationItem key={noti._id} user={user} notification={noti} />
                ))}
            </Menu>
        </>
    );
}

export default NotificationDialog;
