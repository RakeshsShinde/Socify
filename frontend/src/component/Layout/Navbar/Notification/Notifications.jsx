import React from 'react';
import { Divider, Menu } from '@mui/material';
import useStyle from './notifications.style';
import { useSelector } from 'react-redux';
import SingleActivity from '../../HomeLayout/Activity/SingleActivity';
import notificationIcons from '../Notification/icons';

const Notifications = ({ anchorEl, open, handleClose }) => {
    const classes = useStyle();
    const { notifications } = useSelector((state) => state.Notifications);
    const filteredNotifications = notifications?.filter(n => n.type !== 'message' && !n.isRead)

    return (
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
            {!filteredNotifications?.length ?
                <span className={classes.noMessage}>
                    No New Notifications !
                </span> :
                <>
                    <p className={classes.heading}>Notification <span className={classes.notificationsCount}>({filteredNotifications?.length})</span></p>
                    <Divider className={classes.divider} />
                </>
            }
            {filteredNotifications?.map((noti) => (
                <SingleActivity key={noti._id} notification={noti} Icon={notificationIcons[noti.type] || notificationIcons.default} />
            ))}
        </Menu>
    );
}

export default Notifications;
