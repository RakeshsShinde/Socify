import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { BsChevronDown } from 'react-icons/bs';
import SingleHashtag from './SingleHashtag';
import axios from 'axios';
import useStyles from './hashtag.style';

const TrendingHashtags = () => {
    const classes = useStyles();
    const [trendingTags, settrendingTags] = useState([]);

    useEffect(() => {
        fetchTrendingTags();
    }, [])

    const fetchTrendingTags = async () => {
        const { data } = await axios.get(`/post/trending`);
        settrendingTags(data.trendingTags);
    }
    return (
        <Box className={classes.trendingTags}>
            <Stack className={classes.headerContainer} direction={'row'}>
                <Typography variant='subtitle1' className={classes.title}>
                    Trending Hashtags
                </Typography>
                <BsChevronDown cursor={'pointer'} color='#343a40' size={18} />
            </Stack>
            {trendingTags?.map((t) => (
                <SingleHashtag key={t.tagName} tag={t} />
            ))}

        </Box>
    );
}

export default TrendingHashtags;
