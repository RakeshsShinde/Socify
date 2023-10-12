import React from 'react';
import { Divider, Menu } from '@mui/material';
import { useSelector } from 'react-redux';
import MessageItem from './Mesaagetem';
import useStyles from './messagenotification.style';

const MessageNotification = ({ anchorEl, handleClose, open }) => {
    const classes = useStyles();
    const { notifications } = useSelector((state) => state.Notifications);
    const { user } = useSelector((state) => state.Login);

    const messageNotifications = notifications.filter((n) => n.type === 'message' && !n.isRead);

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

                {!messageNotifications?.length ?
                    <span className={classes.noMessage}>
                        No New Messages !
                    </span> :
                    <>
                        <p className={classes.heading}>Messages <span className={classes.notificationsCount}>({messageNotifications?.length})</span></p>
                        <Divider className={classes.divider} />
                    </>
                }
                {messageNotifications?.map((noti) => (
                    <MessageItem key={noti._id} user={user} notification={noti} />
                ))}
            </Menu>
        </>
    );
}

export default MessageNotification;
