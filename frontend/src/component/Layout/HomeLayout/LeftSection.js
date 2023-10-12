import React from 'react';
import TrendingHashtags from '../HomeLayout/TrendingHashtags/TrendingHashtags';
import Suggestions from './suggestion/Suggestions';

const LeftSection = () => {
    return (
        <>
            <div className='flex flex-col gap-3 min-w-[20%]' >
                <TrendingHashtags />
                <Suggestions />
            </div>
        </>
    );
}

export default LeftSection;
