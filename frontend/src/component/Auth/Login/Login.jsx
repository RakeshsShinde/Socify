import React, { useEffect } from 'react';
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import InputField from '../InputField';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../../actions/userActions';
import { toast } from 'react-toastify'
import { LoginSchema } from './LoginSchema'
import { useDispatch, useSelector } from 'react-redux'
import { clearError } from '../../../reducers/UserReducers/LoginSlice'
import { clearSuccess } from '../../../reducers/UserReducers/RegisterSlice';
import { clearUserDeleteSuccess } from '../../../reducers/UserReducers/deleteUserSlice';
import useStyles from './login.Style';

const Login = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticate } = useSelector((state) => state.Login);
    const { success, message } = useSelector((state) => state.Register);
    const { success: deleteUserSuccess, message: deleteUserMessage } = useSelector((state) => state.DeleteUser);

    const handlelogin = async ({ username, password }) => {
        await dispatch(login({ username, password }));
    }

    const handleDemoUser = async () => {
        await handlelogin({ username: 'rakesh1321', password: 'rakesh1321' });
    }

    useEffect(() => {
        if (error) {
            toast.error(error, { position: 'top-right', theme: 'dark' })
            dispatch(clearError());
        }
        if (deleteUserSuccess) {
            toast.success(deleteUserMessage, { toastId: 'deletesuccess', position: 'top-right', theme: 'dark' });
            dispatch(clearUserDeleteSuccess())
        }
        if (success) {
            toast.success(message, { toastId: 'registerSuccess' });
            dispatch(clearSuccess());
        }
        if (isAuthenticate) {
            navigate('/home');
        }
    }, [error, navigate, deleteUserSuccess, deleteUserMessage, dispatch, isAuthenticate, success, message])

    return (
        <Box className={classes.formcontainer}>
            <Box className={classes.formWrapper}>
                <Formik
                    initialValues={{
                        username: '',
                        password: ''
                    }}
                    validationSchema={LoginSchema}
                    onSubmit={handlelogin}
                >
                    <Form className={classes.loginform}>
                        <Box height={'20%'}>
                            <Typography className={classes.heading} variant='subtitle1'>Login !</Typography>
                            <Typography className={classes.tagline} variant='subtitle2'>Please Login to Continue </Typography>
                        </Box>
                        <Box className={classes.inputContainer}>
                            <InputField
                                id='username'
                                label='Username'
                                name='username'
                                type='text'
                                placeholder='enter email or username'
                            ></InputField>
                            <InputField
                                id='password'
                                label='Password'
                                name='password'
                                type='password'
                                showpassicon={true}
                                placeholder='Enter password'
                            ></InputField>
                        </Box>
                        <Button
                            variant='outlined'
                            type='submit'
                            disabled={loading}
                            className={classes.signupbtn} >
                            {loading ? <CircularProgress className={classes.loader}></CircularProgress> : 'Login'}
                        </Button>
                        <Button
                            variant='outlined'
                            type='submit'
                            className={classes.demobtn}
                            onClick={handleDemoUser}
                        >
                            Demo user credintials
                        </Button>
                        <Typography variant='subtitle2' onClick={() => navigate('/forgotPassword')} className={classes.forgotPassword} >forgot password?</Typography>
                        <Stack direction='row' className={classes.otheroptions}>
                            <span>Create New account?</span>
                            <Link to='/signup'>
                                <span className={classes.signinbtn}>Signup</span>
                            </Link>
                        </Stack>
                    </Form>
                </Formik>
                <Box className={classes.herosection} ></Box>
            </Box>
        </Box>
    );
}
export default Login;
