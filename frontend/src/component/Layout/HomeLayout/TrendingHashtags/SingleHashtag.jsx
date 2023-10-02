import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import useStyles from './hashtag.style';
import Logo from './Logo';
import { FaHashtag } from 'react-icons/fa';

const SingleHashtag = ({ tag }) => {
    const classes = useStyles();
    return (
        <Box className={classes.hashtagsContainer}>
            <Stack position={'relative'} gap={'0.5rem'} direction='row'>
                <Logo Icon={FaHashtag} />
                <Stack direction='column' >
                    <Link to={`/posts?tag=${tag.tagName}`}>
                        <Typography className={classes.tagname} variant='subtitle1'>
                            {tag.tagName}
                        </Typography></Link>
                    <Typography className={classes.totalPosts} >
                        {tag.totalPosts}
                    </Typography>
                </Stack>
            </Stack>
        </Box>
    );
}

export default SingleHashtag;
