import React, { useEffect, useRef, useState } from 'react'
import { Typography, Box, Stack, Button, Avatar } from '@mui/material'
import { Form, Formik } from 'formik'
import { SignupSchema } from './SignupSchema'
import InputField from '../InputField';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../../../actions/userActions';
import { clearError } from '../../../reducers/UserReducers/RegisterSlice'
import { CircularProgress } from '@mui/material'
import { toast } from 'react-toastify'
import useStyles from './signup.style';

const Signup = () => {
    const classes = useStyles();
    const fileinputRef = useRef(null);
    const [profilepic, setprofilepic] = useState('');
    const { loading, error, success } = useSelector((state) => state.Register);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            toast.error(error, { position: 'top-right' })
            dispatch(clearError())
        }
        if (success) {
            navigate('/')
        }

    }, [error, dispatch, success, navigate])

    const handleSubmit = async ({ username, email, password }) => {
        dispatch(signup({ username, email, password, profilepic }))
    };

    const profilepicChange = (event) => {
        if (event.target.name == 'profilepic') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setprofilepic(reader.result);
                }
            }
            reader.readAsDataURL(event.target.files[0]);
        }

    }

    return (
        <Box className={classes.formcontainer}>
            <Box className={classes.formWrapper}>
                <Formik
                    initialValues={{
                        username: '',
                        email: '',
                        password: '',
                        confirmpassword: '',
                        profilepic: ''
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={handleSubmit}

                >{() => (
                    <Form encType="multipart/form-data" className={classes.loginform}>
                        <Box height={'20%'}>
                            <Typography className={classes.heading} variant='subtitle1'>Create New Account</Typography>
                            <Typography className={classes.tagline} variant='subtitle2'>Please Signup to Continue </Typography>
                        </Box>
                        <Box className={classes.inputContainer}>
                            <Stack className={classes.userProfileContainer} direction={"row"}>
                                <Box>
                                    < Avatar sx={{ width: '100px', height: '100px' }} src={profilepic} alt={profilepic} />
                                    <input
                                        name='profilepic'
                                        accept='image/*'
                                        onChange={(event) => profilepicChange(event)}
                                        style={{ display: 'none' }}
                                        type={'file'}
                                        ref={fileinputRef} />
                                    <Button className={classes.uploadbtn} onClick={() => fileinputRef.current.click()} variant='outlined'>Upload </Button>
                                </Box>
                            </Stack>
                            <InputField
                                label='Username'
                                name='username'
                                type='text'
                                placeholder='John Doe'
                            ></InputField>
                            <InputField
                                label='Email'
                                name='email'
                                type='text'
                                placeholder='JohnDoe1321@gmail.com'
                            ></InputField>
                            <InputField
                                label='Password'
                                name='password'
                                type='password'
                                placeholder='Enter password'
                                showpassicon={true}
                            ></InputField>
                            <InputField
                                label='Confirm Password'
                                name='confirmpassword'
                                type='password'
                                placeholder='Confirm password'
                                showpassicon={true}
                            ></InputField>
                            <Button
                                disabled={loading}
                                variant='contained'
                                type='submit'
                                className={classes.signupbtn} >
                                {loading ? <CircularProgress sx={{
                                    color: 'white',
                                    width: '15px',
                                    height: '15px'
                                }} ></CircularProgress> : 'Sign up'}
                            </Button>
                        </Box>
                        <Stack marginTop={'60px'} justifyContent='space-between' padding={'5px 10px'} height={'25%'} direction='row'>
                            <span>Already have account?</span>
                            <Link to='/'>
                                <span className={classes.signinbtn}>Login</span>
                            </Link>
                        </Stack>
                    </Form>
                )}
                </Formik>
                <Box className={classes.herosection} ></Box>
            </Box>
        </Box>
    );
}

export default Signup;

