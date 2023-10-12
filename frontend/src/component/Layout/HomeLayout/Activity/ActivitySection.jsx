import React, { useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import useStyles from './Activity.style';
import SingleActivity from './SingleActivity';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotifications } from '../../../../actions/notificationActions';
import notificationIcons from '../../Navbar/Notification/icons';

const ActivitySection = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { notifications } = useSelector((state) => state.Notifications);

    useEffect(() => {
        dispatch(getAllNotifications());
    }, [dispatch])

    const filteredNotifications = notifications.filter(noti => noti.type !== 'message' && !noti.isRead);
    return (
        <Box className={classes.activityContainer}>
            <Stack className={classes.header} direction="row">
                <Typography variant='subtitle1' className={classes.title}>New Activity</Typography>
                <Box className={classes.badgeItem}>
                    <span>{filteredNotifications?.length}</span>
                </Box>
            </Stack>
            {!filteredNotifications.length && (<Box className={classes.noActivity}>
                <span>No New Activity</span>
            </Box>)}
            <Box className={classes.activitywrapper}>
                {filteredNotifications?.map((noti) => (
                    <SingleActivity key={noti._id} notification={noti} Icon={notificationIcons[noti.type] || notificationIcons.default} />
                ))}
            </Box>
        </Box>
    );
}

export default ActivitySection;
