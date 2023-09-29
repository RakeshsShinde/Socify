import React, { useEffect, useRef, useState } from 'react';
import { Box, Divider, IconButton, Avatar, Modal, Stack, TextField, Typography, Tooltip, Button, LinearProgress } from '@mui/material'
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { BiImage } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { editUser } from '../../actions/userActions'
import { setUser } from '../../reducers/UserReducers/LoginSlice'
import { useDispatch, useSelector } from 'react-redux';
import { clearEditUserError, clearEditUserSuccess } from '../../reducers/UserReducers/editProfileSlice'
import { getPostOfFollowing } from '../../actions/postActions'
import { editMoadalWrapper, useStyles } from './editprofile.style';

const EditProfileModal = ({ open, setopen }) => {
    const classes = useStyles();
    const fileinputRef = useRef();
    const dispatch = useDispatch();
    const { loading, error, success, message } = useSelector((state) => state.Edituser);
    const [profilePic, setprofilePic] = useState('');
    const [username, setusername] = useState('');
    const [email, setemail] = useState('');
    const [Bio, setBio] = useState('');
    const [password, setpassword] = useState('');

    useEffect(() => {
        if (error) {
            toast.error(error, { toastId: 'edituserError', position: 'top-right' })
            dispatch(clearEditUserError())
        }
        if (success) {
            toast.success(message, { toastId: 'edituserSuccess', position: 'top-right' })
            dispatch(clearEditUserSuccess())
        }
    }, [error, success, dispatch])

    const triggerupload = () => {
        fileinputRef.current.click();
    }

    const handleClose = () => {
        setopen(false);
    }

    const resetForm = () => {
        setprofilePic('')
        setusername('')
        setemail('')
        setBio('')
        setpassword('')
    }

    const handleSubmit = async () => {
        if (username && username.length < 6) {
            toast.error('username should have atleast 6 characters !', { position: 'top-right' });
            return;
        }
        if (password && password.length < 6) {
            toast.error('password must greater than 6 characters', { position: 'top-right' });
            return;
        }
        if (email && /^\S+@\S+\.\S+$/.test(email)) {
            toast.error('please enter valid email', { position: 'top-right' });
            return;
        }
        const { payload } = await dispatch(editUser({ username, email, Bio, password, profilePic }));
        await dispatch(setUser(payload?.updateduser));
        resetForm();
        setopen(false);
        await dispatch(getPostOfFollowing());
    }

    const handleImageChange = (event) => {
        if (event.target.name == 'profilepic') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setprofilePic(reader.result);
                }
            }
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            className={classes.modal}
        >
            <Box sx={editMoadalWrapper}>
                {loading && <LinearProgress />}
                <Stack direction='row' className={classes.header}>
                    <Typography variant='h5' className={classes.title}>Edit Profile</Typography>
                    <IconButton onClick={handleClose}><IoIosCloseCircleOutline size={28} /></IconButton>
                </Stack>
                <Divider />
                <Box className={classes.editFormWrpper}>
                    <Stack direction='row'>
                        <Box className={classes.profileWrapper}>
                            <Avatar src={profilePic} alt={'profilePic'} sx={{ width: '90%', height: '90%', }} />
                            <input
                                name='profilepic'
                                ref={fileinputRef}
                                type='file'
                                onChange={(e) => handleImageChange(e)}
                                style={{
                                    display: 'none'
                                }} />
                            <Tooltip title='Change ProfilePic' placement='bottom-end'>
                                <IconButton onClick={triggerupload} className={classes.changeImage}><BiImage size={22} /></IconButton>
                            </Tooltip>
                        </Box>
                    </Stack>
                    <TextField
                        placeholder='e.g JoheDoe1321 '
                        label="Username"
                        variant="filled"
                        value={username}
                        onChange={(e) => setusername(e.target.value)}
                    />
                    <TextField
                        placeholder='e.g JohnDoe@gmail.com'
                        label="Email"
                        variant="filled"
                        value={email}
                        onChange={(e) => setemail(e.target.value)} />
                    <TextField
                        placeholder='Tell about yourself...'
                        label="Bio"
                        variant="filled"
                        rows={4}
                        multiline
                        value={Bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                    <TextField
                        placeholder='Enter new password'
                        label="Password"
                        variant="filled"
                        type={'password'}
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                    />
                    <Stack direction='row' className={classes.btnWrapper}>
                        <Button onClick={resetForm} variant='contained' color='error'>reset</Button>
                        <Button disabled={loading} onClick={handleSubmit} variant='contained' color='success'>
                            Edit
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Modal>
    );
}

export default EditProfileModal;
