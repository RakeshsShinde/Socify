import React, { useEffect } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import InputField from '../InputField';
import { Form, Formik } from 'formik';
import { ForgotSchema } from './ForgotSchema'
import useStyles from './forgotpassword.style';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword } from '../../../actions/userActions'
import { toast } from 'react-toastify'
import { clearForgotError, clearForgotSuccess } from '../../../reducers/UserReducers/forgotPassSlice';

const ForgotPassword = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { loading, error, success, message } = useSelector((state) => state.ForgotPassword);

    const handleSubmit = async ({ email }) => {
        await dispatch(forgotPassword({ email }));
    }

    useEffect(() => {
        if (error) {
            toast.error(error, { position: 'bottom-center', theme: 'dark' });
            dispatch(clearForgotError());
        }
        if (success) {
            toast.success(message, { position: 'bottom-center', theme: 'dark' });
            dispatch(clearForgotSuccess())
        }
    }, [error, dispatch, success, message])

    return (
        <Box className={classes.formcontainer}>
            <Box className={classes.formWrapper}>
                <Formik
                    initialValues={{
                        email: '',
                    }}
                    validationSchema={ForgotSchema}
                    onSubmit={handleSubmit}
                >
                    <Form className={classes.forgotPassForm}>
                        <Box className={classes.header}>
                            <Typography variant='subtitle1' className={classes.heading}>Fogot Password ?</Typography>
                            <Typography variant='subtitle2' className={classes.tagline}>Enter email to reset password</Typography>
                        </Box>
                        <Box className={classes.inputWrapper} >
                            <InputField
                                name='email'
                                label='Email'
                                type='email'
                                placeholder='enter email or username'
                            ></InputField>
                            <Button variant='outlined' type='submit' className={classes.resetbtn} >
                                {loading ? <CircularProgress className={classes.loader}></CircularProgress> : 'send reset link'}
                            </Button>
                            <Link to='/'>
                                <Button variant='outlined' className={classes.backtoLogin}>Back to Login</Button>
                            </Link>
                        </Box>
                    </Form>
                </Formik>
                <Box className={classes.imgWrapper}></Box>
            </Box>
        </Box>
    );
}

export default ForgotPassword;
