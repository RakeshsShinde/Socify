import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa'
import { RxCross2 } from 'react-icons/rx'
import SingleSuggestion from '../HomeLayout/suggestion/SingleSuggestion';
import { Tab, Tabs } from '@mui/material';
import SuggestionLoader from '../../miscellaneous/SuggestionLoader';
import { useDispatch, useSelector } from 'react-redux';
import { searchUser } from '../../../actions/userActions';
import { searchByTags } from '../../../actions/postActions';
import SingleHashtag from '../HomeLayout/TrendingHashtags/SingleHashtag';

const Searchbar = () => {
    const [search, setsearch] = useState('');
    const [selectedTab, setSelectedTab] = useState(0);
    const [loadingTabchange, setloadingTabchange] = useState(false);
    const dispatch = useDispatch();
    const { searchUsers, searchTags, searchCommunity, loading } = useSelector((state) => state.SearchUser);


    useEffect(() => {
        if (search.trim() != '') {
            if (selectedTab == 0) {
                dispatch(searchUser(search))
            }
            if (selectedTab == 1) {
                dispatch(searchByTags(search))
            }
        }
    }, [search, selectedTab, dispatch])

    const clearSearch = () => {
        setsearch("");
    }

    const handleTabChange = (event, newValue) => {
        setloadingTabchange(true);
        setTimeout(() => {
            setSelectedTab(newValue);
            setloadingTabchange(false);
        }, 300);
    };


    return (
        <div className='w-[400px] h-12 px-4 py-1 relative'>
            {search && (
                <div onClick={clearSearch} className='absolute cursor-pointer top-[28%] right-[25px] text-gray-500'>
                    <RxCross2 size={22} />
                </div>
            )}
            <div className='absolute top-[32%] left-[25px] text-gray-500'>
                <FaSearch />
            </div>

            <input
                value={search}
                onChange={(e) => setsearch(e.target.value)}
                type='text'
                className='w-full h-full outline-none transition-all duration-100 
                focus:outline-2 focus:outline-blue-500 rounded-[0.4rem] px-9
                 placeholder:text-gray-400 bg-[#eef3f8]' placeholder='search' />

            {loading ? Array.from(5).map((_, i) => (
                <SuggestionLoader key={i} />
            )) : (
                search && (
                    <div className={`
                    h-[400px] w-[450px] 
                    absolute top-14 -left-4 rounded-lg 
                    shadow-2xl p-2 bg-[#ffffff]  
                    ${loadingTabchange ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}
                    overflow-x-hidden overflow-y-auto `}>
                        <Tabs value={selectedTab} onChange={handleTabChange} >
                            <Tab style={{ width: '30%' }} label="Users" />
                            <Tab style={{ width: '30%' }} label="Tags" />
                            <Tab style={{ width: '30%' }} label="Community" />
                        </Tabs>
                        {selectedTab === 0 && searchUsers?.map((user) => <SingleSuggestion key={user._id} user={user} />)}
                        {selectedTab === 1 && searchTags?.map((tag) => <SingleHashtag key={tag.tagName} tag={tag} />)}
                    </div>
                ))}
        </div>
    );
}

export default Searchbar;
