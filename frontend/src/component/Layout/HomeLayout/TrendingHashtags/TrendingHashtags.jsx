import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { BsChevronDown } from 'react-icons/bs';
import SingleHashtag from './SingleHashtag';
import { useSelector, useDispatch } from 'react-redux';
import { getTrendingTags } from '../../../../actions/postActions';
import useStyles from './hashtag.style';

const TrendingHashtags = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { tags, loading } = useSelector((state) => state.TrendingTags);
    const { success: newPostSuccess } = useSelector((state) => state.NewPost);
    const { success: postEditSuccess } = useSelector((state) => state.EditPost);
    const { success: deletePostSuccess } = useSelector((state) => state.DeletePost);

    useEffect(() => {
        dispatch(getTrendingTags());
    }, [dispatch, newPostSuccess, postEditSuccess, deletePostSuccess])

    return (
        <Box className={classes.trendingTags}>
            <Stack className={classes.headerContainer} direction={'row'}>
                <Typography variant='subtitle1' className={classes.title}>
                    Trending Hashtags
                </Typography>
                <BsChevronDown cursor={'pointer'} color='#343a40' size={18} />
            </Stack>
            {tags?.map((t) => (
                <SingleHashtag key={t.tagName} tag={t} />
            ))}

        </Box>
    );
}

export default TrendingHashtags;
