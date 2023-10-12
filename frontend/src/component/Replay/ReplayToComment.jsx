import React, { useState } from 'react';
import { Avatar, Button, Input, Stack } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { replaytoComment } from '../../actions/commentActions';
import { getPostOfFollowing } from '../../actions/postActions';
import useStyles from './replaytoComment.style';
import Loader from '../miscellaneous/Loader';
import { useSocket } from '../../context/SocketProvider';

const ReplayToComment = ({ comment }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [content, setcontent] = useState('');
    const { user } = useSelector((state) => state.Login);
    const { loading } = useSelector((state) => state.ReplayTocomment);
    const { Socket } = useSocket();

    const handleReplay = async () => {
        setcontent('');
        await dispatch(replaytoComment({ commentId: comment?._id, content }))
        await dispatch(getPostOfFollowing())

        if (Socket) {
            Socket.emit('new replay', {
                senderId: user?._id,
                message: 'replay on your comment',
                type: 'replaytoComment',
                post: comment?.post,
                receiverId: comment?.commentBy?._id,
            });

        }
    }

    return (
        <>
            <Stack direction={'row'} className={classes.addReplay} >
                <Avatar
                    className={classes.addcommentAvatar}
                    src={user?.profilePic?.url}
                    alt={user?.username}
                />
                <Input
                    value={content}
                    onChange={(e) => setcontent(e.target.value)}
                    placeholder={'Replay to comment.'}
                    className={classes.addcommentInput} />
                {loading ? <Loader className={classes.loader} /> : <Button
                    className={classes.postCommentbtn}
                    variant='outlined'
                    onClick={handleReplay} >
                    post
                </Button>}
            </Stack>
        </>
    );

}

export default ReplayToComment;
