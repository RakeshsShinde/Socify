import React, { useEffect } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import InputField from '../InputField';
import { ResetPasswordSchema } from './ResetpasswordSchema';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearResetPassError, clearResetPassSuccess } from '../../../reducers/UserReducers/resetPasswordSlice'
import { resetPassword } from '../../../actions/userActions';
import { toast } from 'react-toastify';
import useStyles from './resetPassword.style';


const ResetPassword = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { resetToken } = useParams();
    const { loading, success, error, message } = useSelector((state) => state.ResetPassword);

    useEffect(() => {
        if (success) {
            toast.success(message, { position: 'bottom-center', theme: 'dark' })
            dispatch(clearResetPassSuccess());
        }
        if (error) {
            toast.error(error, { position: 'bottom-center', theme: 'dark' })
            dispatch(clearResetPassError());
        }
    }, [success, error, message, dispatch])

    const handleSubmit = async ({ password }) => {
        await dispatch(resetPassword({ token: resetToken, password }));
    }

    return (
        <Box className={classes.formcontainer}>
            <Box className={classes.formWrapper}>
                <Formik
                    initialValues={{
                        password: '',
                        confirmpassword: ''
                    }}
                    validationSchema={ResetPasswordSchema}
                    onSubmit={handleSubmit}
                >
                    <Form className={classes.forgotPassForm}>
                        <Box className={classes.header}>
                            <Typography variant='subtitle1' className={classes.heading}>Reset password !</Typography>
                            <Typography variant='subtitle2' className={classes.tagline}>Reset your password  </Typography>
                        </Box>
                        <Box className={classes.inputWrapper} >
                            <InputField
                                name='password'
                                label='New password'
                                type='password'
                                placeholder='Enter new password'
                                showpassicon={true}
                            ></InputField>
                            <InputField
                                name='confirmpassword'
                                label='Confirm password'
                                type='password'
                                placeholder='Confirm password !'
                                showpassicon={true}
                            ></InputField>
                            <Button variant='outlined' type='submit' className={classes.resetbtn} >
                                {loading ? <CircularProgress className={classes.loader}></CircularProgress> : 'reset password'}
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

export default ResetPassword;
