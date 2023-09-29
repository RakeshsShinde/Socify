import { Avatar, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        cursor: 'pointer',
        backgroundColor: '#E8E8E8',
        "&:hover": {
            backgroundColor: '#38B2AC',
            color: 'white',
        },
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        color: 'black',
        padding: '5px 2px',
        marginBottom: '4px',
        borderRadius: '5px',
        gap: '0.5rem'
    }
}))

const UserListItem = ({ user, handleFunction }) => {
    const classes = useStyles();
    return (
        <Box onClick={handleFunction} className={classes.mainContainer} >
            <Avatar sx={{ marginRight: '4px', cursor: 'pointer' }}  src={user.profilePic?.url} alt={user.username} />
            <Stack direction={'column'} sx={{ gap: '-8px' }}   >
                <Typography variant='subtitle1'>{user.username}</Typography>
                <Typography variant='subtitle2'>{user.email}</Typography>
            </Stack>
        </Box>
    );
}

export default UserListItem;
