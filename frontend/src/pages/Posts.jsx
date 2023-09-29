import React, { useEffect, useState } from 'react';
import { Avatar, Box, Grid, Paper, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom'
import { getPostsByTagNLocation } from '../actions/postActions';
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './posts.style';

const Posts = () => {
    const params = new URLSearchParams(window.location.search);
    const tag = params.get('tag');
    const location = params.get('location');
    const { results, loading } = useSelector((state) => state.PostsByTagNLocation);
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        dispatch(getPostsByTagNLocation({ tag, location }));
    }, [tag, location, dispatch]);

    return (
        <Box className={classes.mainContainer} >
            <Box className={classes.userinfoContainer}>
                <Box className={classes.userinfoWrapper}>
                    <Avatar src={results?.coverImage?.secure_url} alt={"profile.jpg"} sx={{ width: '100px', height: '100px' }} />
                    <Stack direction={'column'} padding={'8px 5px'} >
                        <Typography variant='subtitle1' sx={{ fontSize: '20px', }}>{results?.title}</Typography>
                        <Typography variant='subtitle1' sx={{ fontSize: '17px' }}>{results?.totalPosts} posts</Typography>
                    </Stack>
                </Box>
            </Box>
            <Box className={classes.postsContainer}>
                <Grid container spacing={2}>
                    {results?.posts?.map((post, index) => (
                        <Grid item xs={4} key={index}>
                            <Paper>
                                <Link to={`/view/singlePost/${post._id}`}>
                                    <div className={classes.imageContainer}>
                                        <div className={classes.overlay}>
                                            <Typography variant='subtitle2'>overlay</Typography>
                                        </div>
                                        <img src={post.images[0].secure_url} style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',

                                        }} alt={`Image ${index + 1}`} />
                                    </div>
                                </Link>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box >
    );
}

export default Posts;
