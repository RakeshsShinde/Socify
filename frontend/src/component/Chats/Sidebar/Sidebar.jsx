import React from 'react';
import { Box, Stack, IconButton, Drawer, Divider, CircularProgress } from '@mui/material';
import UserListItem from '../UserListItem';
import UserLoader from '../../miscellaneous/UserLoder';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from '../mychats.style';
import { FaSearch } from 'react-icons/fa';
import { accessChat } from '../../../actions/chatActions';
import { toast } from 'react-toastify';

const Sidebar = ({ open, onClose, search, setsearch, handleSearch }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { searchUsers, loading } = useSelector((state) => state.SearchUser);
    const { selectChatloading } = useSelector((state) => state.Chats);

    const handleAccessChat = async (userId) => {
        try {
            await dispatch(accessChat({ userId }));
            onClose();
        } catch (err) {
            console.log(err);
            toast.error('unable to create chat !', 404);
        }
    }
    return (
        <Drawer anchor='left' open={open} onClose={onClose}>
            <Box className={classes.drawerWrapper}>
                <h6 className={classes.drawerHeading}>Search users</h6>
                <Divider />
                <Stack direction='row' className={classes.searchInputWrppper}>
                    <input
                        value={search}
                        onChange={(e) => setsearch(e.target.value)}
                        placeholder='search user..'
                        type={'text'}
                        className='border-[2px] w-[80%] border-gray-300 outline-blue-400 px-2 py-1 rounded-md'
                    />
                    <IconButton onClick={handleSearch} className='ml-[10px]'>
                        <FaSearch size={18} />
                    </IconButton>
                </Stack>
                <Box className={classes.resultsWrapper}>
                    {loading ? <>
                        {Array.from(8).map((_, i) => (
                            <UserLoader key={i} />
                        ))}
                    </> : (
                        searchUsers?.map((user) => (
                            <UserListItem
                                key={user._id}
                                user={user}
                                handleFunction={() => handleAccessChat(user._id)}
                            />
                        ))
                    )}
                    {selectChatloading && <CircularProgress />}
                </Box>
            </Box>
        </Drawer >
    );
}

export default Sidebar;
