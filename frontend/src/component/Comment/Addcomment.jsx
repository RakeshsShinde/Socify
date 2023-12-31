import React, { useState } from 'react';
import { Avatar, Button, Input, Stack } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { newComment } from '../../actions/commentActions';
import Loader from '../miscellaneous/Loader';
import useStyles from './Addcomment.style'
import { useSocket } from '../../context/SocketProvider';


const Addcomment = ({ post, showComment }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [content, setcontent] = useState('');
    const { user } = useSelector((state) => state.Login);
    const { loading } = useSelector((state) => state.NewComment);
    const { Socket } = useSocket();

    const AddComment = async () => {
        await dispatch(newComment({ content, postId: post?._id }));
        if (Socket) {
            Socket.emit('new comment', {
                senderId: user?._id,
                message: 'comment on your post ',
                type: 'postcomment',
                post: post._id,
                receiverId: post?.postBy?._id,
            })
        }
        setcontent('');
    }
    return (
        <>
            {showComment && <Stack direction={'row'} className={classes.addComment} >
                <Avatar
                    className={classes.addcommentAvatar}
                    src={user?.profilePic?.url}
                    alt={user?.username} />
                <Input
                    placeholder={'Add a comment..'}
                    value={content}
                    onChange={(e) => setcontent(e.target.value)}
                    className={classes.addcommentInput}
                />
                {loading ? <Loader className={classes.postCommentbtn} /> : <Button
                    className={classes.postCommentbtn}
                    onClick={AddComment}
                    variant='outlined' >
                    post
                </Button>}

            </Stack>}
        </>

    );
}

export default Addcomment;
