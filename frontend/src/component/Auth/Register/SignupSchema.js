import * as Yup from 'yup'
export const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .min(6, 'username have atleast 6 characters !')
        .max(14, 'username should not have more than 14 characters!')
        .required('please enter username !'),
    email: Yup.string().email('please enter valid email !').required('please enter email !'),
    password: Yup.string().min(6, 'password must greater than 6 characters !')
        .max(18, 'password should not greater than 18 characters !').required('please enter password !')
        .matches(/^\S*$/, 'Password cannot contain whitespace'),
    confirmpassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Please confirm your password')
        .matches(/^\S*$/, 'Password cannot contain whitespace'),

});