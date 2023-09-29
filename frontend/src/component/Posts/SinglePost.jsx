import React, { useEffect, useState } from 'react';
import { BsHeart, BsSave } from 'react-icons/bs'
import PostCarasoual from '../Carosual/PostCarasoual';
import { AiFillHeart, AiFillSave, AiOutlineSave } from 'react-icons/ai'
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import { Avatar, Button, Divider, IconButton, Stack, Typography } from '@mui/material';
import { FiMessageCircle } from 'react-icons/fi';
import Addcomment from '../Comment/Addcomment';
import SingleComment from '../Comment/SingleComment';
import { useSelector, useDispatch } from 'react-redux'
import PostMenu from './PostMenu';
import { likePost, savePost } from '../../actions/postActions'
import formatDate from '../../Helper/FormatDate';
import { setUser } from '../../reducers/UserReducers/LoginSlice';
import { followUser } from '../../actions/userActions'
import { useSocket } from '../../context/SocketProvider';
import LikeDialog from '../miscellaneous/modal/Likemodel';
import useStyle from './singlePost.style';

const SinglePost = ({ fullpostview, post }) => {
    const classes = useStyle();
    const [showComment, setshowComment] = useState(false);
    const [like, setlike] = useState(false);
    const [follow, setfollow] = useState(false);
    const [save, setsave] = useState(false);
    const [openlikeDialog, setopenlikeDialog] = useState(false);
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.Login);
    const authUser = post?.postBy?._id === user?._id;
    const { Socket } = useSocket();

    useEffect(() => {
        if (Socket) {
            Socket.on("post like", (likedata) => {
                console.log(likedata);
            })

            return () => {
                Socket.off('');
            };
        }
    }, [Socket])

    useEffect(() => {
        setsave(post?.saveBy?.some((u) => u === user?._id))
        setlike(post?.likes?.some((p) => p._id === user?._id))
        setfollow(user?.following?.some((u) => u === post?.postBy?._id))
    }, [post?.likes, user?.following, post?.saveBy])



    const handleFollow = async () => {
        setfollow((prev) => !prev)
        const { payload } = await dispatch(followUser({ userId: post.postBy?._id }));
        await dispatch(setUser(payload?.user));
    }

    const handleSave = async () => {
        setsave((prev) => !prev)
        const { payload } = await dispatch(savePost(post._id));
        await dispatch(setUser(payload?.user));
    }

    const handleClickOpen = () => {
        setopenlikeDialog(true);
    };

    const handleClose = () => {
        setopenlikeDialog(false);
    }

    const handleLike = () => {
        setlike((prev) => !prev);
        Socket.emit('new like', { user, post });
        dispatch(likePost(post._id));
    }

    return (
        <Box className={classes.SinglePostcontainer}>
            <Stack className={classes.userInfoContainer} direction={'row'}>
                <Link to={`/profile/${post?.postBy?._id}`}>
                    <Avatar variant='circular'
                        end="True"
                        className={classes.avatar}
                        src={post?.postBy?.profilePic?.url}
                        alt={post?.postBy?.username}
                    >
                    </Avatar>
                </Link>
                <div className={`flex flex-col h-[45px] py-1 px-3 `}>
                    <Link to={`/profile/${post?.postBy?._id}`}>
                        <Typography
                            className={classes.username}>
                            {post?.postBy?.username}
                        </Typography>
                    </Link>
                    {post?.location ? (
                        <Link to={`/posts?location=${post?.location}`}>
                            <Typography
                                className={classes.location}
                                varient='caption'>
                                {post?.location}
                            </Typography>
                        </Link>
                    ) : <Typography
                        className={classes.postdate}
                        variant='subtitle2'>
                        {formatDate(post?.createdAt)}
                    </Typography>}

                </div>
                {authUser ? <PostMenu post={post} /> :
                    <Button
                        onClick={handleFollow}
                        className={classes.followbtn}
                        variant='outlined'>
                        {follow ? "following" : "follow"}
                    </Button>
                }
            </Stack>
            <PostCarasoual postimages={post?.images} />
            <Box className={classes.postbtnConatiner} >
                <Box className={classes.postlikecomment} marginLeft={'15px'} >
                    <Stack className={classes.singlebtn} direction={'row'}>
                        <IconButton onClick={handleLike} >
                            {like ? (
                                <AiFillHeart size={25} color={'red'} />
                            ) : (
                                <BsHeart size={25} />
                            )}
                        </IconButton>
                        <Typography variant='subtitle2'>{post?.likes?.length}</Typography>
                    </Stack>

                    <Stack className={classes.singlebtn} direction={'row'} >
                        <IconButton onClick={() => setshowComment((prev) => !prev)}  >
                            <FiMessageCircle size={25} />
                        </IconButton>
                        <Typography variant='subtitle2'>{post?.comments?.length}</Typography>
                    </Stack>

                    <Stack className={classes.singlebtn} direction={'row'} >
                        <IconButton onClick={handleSave}>
                            {save ? (
                                <AiFillSave color={'green'} size={25} />
                            ) : (
                                <AiOutlineSave size={25} />
                            )}
                        </IconButton>
                        <Typography variant='subtitle2'>{post?.saveBy?.length}</Typography>
                    </Stack>
                </Box>
                <IconButton >
                    <BsSave size={20} />
                </IconButton>
            </Box>
            <Box className={classes.postData}>
                <Divider />
                <Typography
                    className={classes.likes}
                    onClick={handleClickOpen}
                    variant='subtitle2'>
                    {post?.likes?.length === 0 ? "No likes yet" : `${post?.likes?.length} Likes`}
                </Typography>
                <Box>
                    <Stack direction="row" gap={'0.7rem'} alignItems={'center'}>
                        <Typography className={classes.postusername}>
                            {post?.postBy?.username}
                        </Typography>
                        <Typography
                            className={classes.postdate}
                            variant='subtitle2'>
                            {formatDate(post?.createdAt)}
                        </Typography>
                    </Stack>
                    <Typography
                        variant='subtitle1'
                        className={classes.postdesc}
                    >
                        {post?.caption}
                    </Typography>
                    {post?.tags?.length > 0 ? (
                        <Box className={classes.tags}>
                            {post?.tags && post?.tags?.map((t, i) => (
                                <Link to={`/posts?tag=${t}`} key={i}>
                                    <span className={classes.hashtag}>#{t}</span>
                                </Link>
                            ))}
                        </Box>
                    ) : null}
                </Box>
                <Link >
                    {post?.comments?.length === 0 ?
                        <Typography className={classes.allcomments} >
                            No comments yet
                        </Typography>
                        : <Link to={`/view/singlePost/${post?._id}`}>
                            <Typography className={classes.allcomments} >
                                view all {post?.comments?.length} comments
                            </Typography>
                        </Link>
                    }
                </Link>
            </Box>
            {showComment && (
                <Box className={classes.commentSection} >
                    < Divider />
                    <Addcomment postId={post?._id} showComment={showComment} />

                    {fullpostview ? (
                        <Box className={`${classes.commentSection}  `}>
                            {post?.comments?.map((c, i) => (
                                <SingleComment key={i} comment={c} />
                            ))}
                        </Box>
                    ) : (
                        <Box className={`${classes.commentSection}  `}>
                            {post?.comments?.slice(-2).reverse().map((c, i) => (
                                <SingleComment key={i} comment={c} />
                            ))}
                        </Box>
                    )}
                </Box>
            )}
            <LikeDialog heading={'Likes'} open={openlikeDialog} handleClose={handleClose} users={post?.likes} />
        </Box>
    );
}

export default SinglePost;
