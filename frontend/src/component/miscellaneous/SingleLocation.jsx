import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import useStyles from './singlelocation.style';
import { MdLocationPin } from 'react-icons/md'
import Logo from '../Layout/HomeLayout/TrendingHashtags/Logo';

const SingleLocation = ({ loc }) => {
    const classes = useStyles();
    return (
        <Box className={classes.resultsContainer}>
            <Stack position={'relative'} gap={'0.5rem'} direction='row'>
                <Logo Icon={MdLocationPin} />
                <Stack direction='column' >
                    <Link to={`/posts?location=${loc.location}`}>
                        <Typography className={classes.locationName} variant='subtitle1'>
                            {loc.location}
                        </Typography></Link>
                    <Typography className={classes.totalPosts} >
                        {loc.totalPosts}
                    </Typography>
                </Stack>
            </Stack>
        </Box>
    );
}

export default SingleLocation;
