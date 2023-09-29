import * as Yup from 'yup'
export const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string().min(6, 'password must greater than 6 characters !')
        .max(18, 'password should not greater than 18 characters !').required('please enter password !')
        .matches(/^\S*$/, 'Password cannot contain whitespace'),
    confirmpassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Please confirm your password')
        .matches(/^\S*$/, 'Password cannot contain whitespace'),

});