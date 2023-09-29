import * as Yup from 'yup'
export const LoginSchema = Yup.object().shape({
    username: Yup.string()
        .required('please enter username or email!'),
    password: Yup.string().required('please enter password !')
        .matches(/^\S*$/, 'Password cannot contain whitespace')

});