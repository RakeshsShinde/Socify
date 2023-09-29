import { Box, IconButton, Modal, Stack, TextField, Typography, Button, Tooltip, Chip, Divider, LinearProgress } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { BiImage } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, getPostOfFollowing, editPost } from '../../actions/postActions'
import { toast } from 'react-toastify';
import { clearPostError } from '../../reducers/PostReducers/NewPostSlice';
import { useStyles, modelwrapper } from './CreateNewpost.style'

const CreateNewPost = ({ open, setopen, post }) => {
    const [postimages, setpostimages] = useState([]);
    const [previewImages, setpreviewImages] = useState([]);
    const [inputvalue, setinputvalue] = useState('');
    const [location, setlocation] = useState('');
    const [caption, setcaption] = useState('');
    const [tags, settags] = useState([]);
    const fileinputRef = useRef(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const { error, loading } = useSelector((state) => state.NewPost);
    const isEditing = !!post;

    const resetform = () => {
        setcaption('');
        setpostimages([]);
        setpreviewImages([]);
        setlocation('');
        settags([]);
    }

    useEffect(() => {
        if (post) {
            setcaption(post.caption || "");
            setlocation(post.location || "");
            settags(post.tags || []);
        } else {
            resetform();
        }
    }, [post])

    useEffect(() => {
        if (error) {
            toast.error(error, { toastId: 'newpostError', position: 'top-right' });
            dispatch(clearPostError());
        }
    }, [error, dispatch]);

    const handleinputChange = (e) => {
        setinputvalue(e.target.value)
    }

    const handleinput = (event) => {
        if (event.key === 'Enter' && inputvalue.trim() !== '') {
            settags((prevchips) => [...prevchips, inputvalue.trim()])
            setinputvalue('')
        } else if (event.key === 'Backspace' && inputvalue === '' && tags.length > 0) {
            settags(((prevchips) => prevchips.slice(0, prevchips.length - 1)))
        }
    }

    const triggerupload = () => {
        fileinputRef.current.click();
    }

    const handleImageChnage = (event) => {
        const files = Array.from(event.target.files);
        setpostimages([]);
        setpreviewImages([]);

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setpostimages((oldimages) => [...oldimages, reader.result]);
                    setpreviewImages((oldimages) => [...oldimages, reader.result]);
                }
            }
            reader.readAsDataURL(file);
        })

    }

    const handlePost = async () => {
        let action = isEditing ? "Edit" : "Create"
        try {
            resetform();
            if (isEditing) {
                await dispatch(editPost({ postId: post._id, caption, location, tags }));
            } else {
                await dispatch(createPost({ caption, location, tags, postimages }));
            }
            setopen(false);
        } catch (err) {
            toast.error(`Unable to ${action} Post !`)
        }

        await dispatch(getPostOfFollowing());
    }

    const handleClose = () => {
        setopen(false)
        resetform();
    }

    return (
        <Modal
            className={classes.modal}
            open={open}
            onClose={() => handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >

            <Box sx={modelwrapper} >
                {loading && <LinearProgress />}
                <Stack className={classes.headingContainer} direction={"row"} >
                    {post ? <Typography
                        className={classes.heading}
                        variant='h5'>
                        Edit Post
                    </Typography> : <Typography
                        className={classes.heading}
                        variant='h5'>
                        Create New Post
                    </Typography>}

                    <IconButton onClick={handleClose}>
                        <IoIosCloseCircleOutline size={28} />
                    </IconButton>
                </Stack>
                <Divider />
                <Box className={classes.formContainer} >
                    <TextField
                        placeholder="What do you want to talk about?"
                        multiline
                        value={caption}
                        onChange={(e) => setcaption(e.target.value)}
                        rows={7}
                        variant="filled"
                    />
                    <TextField
                        placeholder="e.g nashik,new york"
                        variant="filled"
                        value={location}
                        onChange={(e) => setlocation(e.target.value)}
                        label={'Location'}
                    />
                    <TextField
                        placeholder="Tags:e.g photography,design,nature"
                        variant="filled"
                        className={classes.chipsContainer}
                        value={inputvalue}
                        onChange={handleinputChange}
                        onKeyDown={handleinput}
                        InputProps={{
                            startAdornment: (
                                tags.map((chip, index) => (
                                    <Chip
                                        key={index}
                                        label={chip}
                                        style={{
                                            marginTop: 8,
                                            marginRight: 5,
                                            backgroundColor: '#3a86ff',
                                            color: 'white',
                                            borderRadius: '5px',
                                            fontSize: '16px',
                                            fontFamily: '"Poppins", sans-serif !important',
                                        }}
                                        onDelete={() => {
                                            settags((prevchips) => prevchips.filter((_, i) => i != index))
                                        }}
                                        deleteIcon={<AiOutlineClose size={18} color={'white'} />}
                                    />
                                )))
                        }} />
                    {previewImages && (
                        <Box className={classes.selectedimages}>
                            {previewImages.map((item) => (
                                <img className={classes.postimg} key={item} src={item} />
                            ))}
                        </Box>
                    )}
                    <Box className={classes.footer}>
                        <input
                            ref={fileinputRef}
                            type='file'
                            multiple
                            onChange={handleImageChnage}
                            style={{
                                display: 'none'
                            }} />
                        {!isEditing && <Tooltip title='Add image' placement='top'>
                            <IconButton className={classes.Addimage} onClick={triggerupload}>
                                <BiImage size={25} />
                            </IconButton>
                        </Tooltip>}
                        {isEditing ?
                            <Button variant='contained' color='success' onClick={handlePost}>Edit</Button>
                            : <Button
                                variant='contained'
                                disabled={loading}
                                onClick={handlePost}>
                                Post
                            </Button>
                        }
                    </Box>
                </Box>
            </Box>
        </Modal>

    );
}

export default CreateNewPost;
