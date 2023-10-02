import React, { useState, useEffect } from 'react';
import { Box, Stack } from '@mui/system';
import { Avatar, IconButton, Typography } from '@mui/material';
import { AiFillHeart, AiOutlineDelete, AiOutlineHeart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import formatDate from '../../Helper/FormatDate';
import { likeReplay, deleteReplay } from '../../actions/commentActions';
import { getPostOfFollowing } from '../../actions/postActions';
import useStyles from './SingleReplay.style';
import LikeDialog from '../miscellaneous/modal/Likemodel';

const SingleReplay = ({ replay }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [like, setlike] = useState(false);
    const [openLikeDialog, setopenLikeDialog] = useState(false);
    const { user } = useSelector((state) => state.Login);
    const authUser = user._id === replay.replayBy._id;
    useEffect(() => {
        setlike(replay.likes?.some((r) => r._id === user?._id));
    }, [replay?.likes]);

    const handleLike = async () => {
        setlike((prev) => !prev);
        await dispatch(likeReplay({ replayId: replay._id }));
        await dispatch(getPostOfFollowing());
    }
    const handleDelete = async () => {
        await dispatch(deleteReplay({ replayId: replay._id }));
        await dispatch(getPostOfFollowing());
    }

    const closeLikeDialog = () => {
        setopenLikeDialog(false);
    }

    return (
        <>

            <Stack direction={'row'} className={classes.singlereplayConatainer} >
                <Avatar
                    className={classes.singlereplayAvatar}
                    src={replay.replayBy?.profilePic?.url}
                    alt={replay.replayBy?.username}
                />
                <Box width={'75%'}>
                    <Stack direction="row" className={classes.singlereplayHeader} >
                        <Typography
                            variant='subtitle2'
                            className={classes.username}>
                            {replay.replayBy?.username}
                        </Typography>
                        <Typography
                            variant='subtitle2'
                            className={classes.singlereplayTime}>
                            {formatDate(replay.createdAt)}
                        </Typography>
                    </Stack>
                    <Typography
                        variant='subtitle1'
                        className={classes.content}>
                        {replay.content}
                    </Typography>
                    <Typography className={classes.replaylikes} onClick={() => setopenLikeDialog(true)} variant='subtitle2'>
                        likes({replay.likes?.length})
                    </Typography>
                </Box>
                <IconButton onClick={handleLike} className={classes.likebtn}>
                    {like ? <AiFillHeart size={20} color='crimson' /> : <AiOutlineHeart size={20} />}
                </IconButton>
                {authUser && (
                    <IconButton onClick={handleDelete} className={classes.likebtn}>
                        <AiOutlineDelete size={20} />
                    </IconButton>
                )}
            </Stack>
            <LikeDialog heading={'Likes'} open={openLikeDialog} handleClose={closeLikeDialog} users={replay?.likes} />
        </>
    );
}

export default SingleReplay;
