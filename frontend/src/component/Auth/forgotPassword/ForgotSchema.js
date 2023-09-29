import * as Yup from 'yup'
export const ForgotSchema = Yup.object().shape({
    email: Yup.string().email('please enter valid email !')
        .required('please enter username or email !'),
});