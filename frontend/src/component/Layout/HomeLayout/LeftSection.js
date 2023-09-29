import React, { useEffect, useState } from 'react';
import TrendingHashtags from '../HomeLayout/TrendingHashtags/TrendingHashtags';
import Suggestions from '../HomeLayout/suggestion/Suggestions';
import axios from 'axios';

const Friends = () => {
    const [trending, settrending] = useState([]);
    useEffect(() => {
        fetchTrendingPosts();
    }, [])


    const fetchTrendingPosts = async () => {
        const { data } = await axios.get('/post/trending', {
            headers: {
                "Content-Type": 'application/json',
            }
        })
        settrending(data.trendingTags)
    }
    return (
        <>
            <div className='flex flex-col gap-3 min-w-[20%]' >
                <TrendingHashtags trendingTags={trending} />
                <Suggestions />
            </div>
        </>
    );
}

export default Friends;
