import React, { useEffect, useState } from 'react';
import { Box, Stack } from '@mui/system';
import { Avatar, IconButton, Typography } from '@mui/material';
import { AiFillHeart, AiOutlineDelete, AiOutlineHeart } from 'react-icons/ai';
import SingleReplay from '../Replay/SingleReplay';
import ReplayToComment from '../Replay/ReplayToComment';
import { useDispatch, useSelector } from 'react-redux'
import { deleteComment, likeComment } from '../../actions/commentActions';
import formatDate from '../../Helper/FormatDate';
import useStyle from './singleComment.style';
import { getPostOfFollowing } from '../../actions/postActions';
import LikeDialog from '../miscellaneous/modal/Likemodel';


const SingleComment = ({ comment }) => {
    const classes = useStyle();
    const [showReplies, setshowReplies] = useState(false);
    const [like, setlike] = useState(false);
    const [replaytoComment, setreplaytoComment] = useState(false);
    const [LikeDialogOpen, setLikeDialogOpen] = useState(false);
    const { user } = useSelector((state) => state.Login);
    const dispatch = useDispatch();
    const authUser = user._id === comment.commentBy?._id;

    useEffect(() => {
        setlike(comment.likes?.some((c) => c._id === user._id));
    }, [comment?.likes]);


    const handleReplay = () => {
        setreplaytoComment((prev) => !prev);
    }

    const handleLike = async () => {
        setlike((prev) => !prev);
        await dispatch(likeComment({ commentId: comment._id }))
    }

    const deletePost = async () => {
        await dispatch(deleteComment({ commentId: comment._id }))
        await dispatch(getPostOfFollowing());
    }

    const closeLikeDialog = () => {
        setLikeDialogOpen(false);
    }

    const handleReplies = () => {
        setshowReplies((prev) => !prev);
    }
    return (

        <Box>
            <Stack direction={'row'} className={classes.singleCommentConatainer}>
                <Avatar
                    className={classes.singleCommentAvatar}
                    src={comment.commentBy?.profilePic?.url}
                    alt={comment.commentBy?.username}
                />
                <Box width={'75%'}>
                    <Stack direction="row" className={classes.singleCommentHeader} >
                        <Typography
                            variant='h6'
                            fontFamily={'"Poppins", sans-serif !important'}
                            fontWeight={500}
                            fontSize={'16px'}
                            color={'#343a40'}
                        >
                            {comment.commentBy?.username}
                        </Typography>
                        <Typography
                            marginTop={'4px'}
                            className={classes.singleCommentTime}
                            variant='subtitle2'>
                            {formatDate(comment.createdAt)}
                        </Typography>
                    </Stack>
                    <Typography
                        lineHeight={1.3}
                        fontFamily={'"Poppins", sans-serif !important'}
                        fontSize={"15px"}
                        variant='subtitle1' >
                        {comment.content}
                    </Typography>
                    <Stack direction={'row'} className={classes.commentsLikeandReplay} >
                        <Typography
                            className={classes.commentData}
                            variant='subtitle2'
                            onClick={() => setLikeDialogOpen(true)}
                        >
                            likes({comment.likes?.length})
                        </Typography>
                        <Typography
                            onClick={handleReplay}
                            className={classes.commentData}
                            variant='subtitle2' >
                            replay
                        </Typography>
                        {
                            comment.replies?.length > 0 && (
                                <Typography
                                    className={classes.commentData}
                                    variant='subtitle2'
                                    onClick={handleReplies}
                                >
                                    {showReplies ? `--Hide` : `--load previous replies`}
                                </Typography>
                            )
                        }
                    </Stack>
                </Box>
                <IconButton onClick={handleLike} className={classes.likebtn} >
                    {like ? <AiFillHeart color={'crimson'} size={22} /> : <AiOutlineHeart size={22} />}
                </IconButton>
                {authUser && (<IconButton onClick={deletePost} className={classes.likebtn} >
                    <AiOutlineDelete size={22} />
                </IconButton>)}
            </Stack>

            <Box>
                {replaytoComment && (<ReplayToComment commentId={comment._id} />)}
                {comment.replies?.map((replay) => (
                    showReplies && (<SingleReplay key={replay._id} replay={replay} />)
                ))}
            </Box>
            <LikeDialog heading={'Likes'} open={LikeDialogOpen} handleClose={closeLikeDialog} users={comment.likes} />
        </Box>

    );
}

export default SingleComment;
