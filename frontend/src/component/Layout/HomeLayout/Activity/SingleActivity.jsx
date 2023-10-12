import React from 'react';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import useStyles from './singleActivity.style';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllNotifications, markNotificationAsRead } from '../../../../actions/notificationActions';
import { formatDateinNotification } from '../../../../Helper/FormatDate'

const SingleActivity = ({ notification, Icon }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const link = notification?.type !== 'followuser' ? `/view/singlePost/${notification?.post}` : `/profile/${notification?.sender?._id}`


    const readActivity = async () => {
        await dispatch(markNotificationAsRead({ notificationId: notification?._id }));
        await dispatch(getAllNotifications())
    }
    return (
        <Box className={classes.conatainer}>
            <Link to={`/profile/${notification.sender?._id}`}>
                <Avatar
                    sx={{ width: '45px', height: '45px', cursor: 'pointer' }}
                    src={notification.sender?.profilePic?.url}
                    alt={'profilepic'} />
            </Link>

            <Stack direction={'row'} className={classes.activityDetail} onClick={readActivity}>
                <Link to={link}>
                    <p className={classes.message}>
                        <span className={classes.username}>{notification.sender?.username}</span>
                        {" "}
                        {notification.desc}
                        {" "}
                        <span >{formatDateinNotification(notification?.createdAt)}</span>
                    </p>
                </Link>
            </Stack>
            <Box className={classes.logoContainer} >
                {Icon}
            </Box>
        </Box>
    );
}

export default SingleActivity;
