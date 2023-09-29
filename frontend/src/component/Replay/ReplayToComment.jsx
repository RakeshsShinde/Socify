import React, { useState } from 'react';
import { Avatar, Button, Input, Stack } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { replaytoComment } from '../../actions/commentActions';
import { getPostOfFollowing } from '../../actions/postActions';
import useStyles from './replaytoComment.style';
import Loader from '../miscellaneous/Loader';

const ReplayToComment = ({ commentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [content, setcontent] = useState('');
    const { user } = useSelector((state) => state.Login);
    const { loading } = useSelector((state) => state.ReplayTocomment);

    const handleReplay = async () => {
        setcontent('');
        await dispatch(replaytoComment({ commentId, content }))
        await dispatch(getPostOfFollowing())
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
