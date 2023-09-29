import { makeStyles } from '@mui/styles';
const useStyles = makeStyles((theme) => ({
    formcontainer: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formWrapper: {
        width: '800px',
        height: '450px',
        backgroundColor: 'white',
        boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
        display: 'flex'
    },
    forgotPassForm: {
        width: '50%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        width: '100%',
        height: '20%',
        padding: '35px 20px'
    },
    inputWrapper: {
        width: '100%',
        height: '80%',
        padding: '25px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '2.5rem',
    },
    imgWrapper: {
        width: '50%',
        height: '100%',
        backgroundImage: 'url("/images/bg2.jpg") ', // Replace with your image path
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    heading: {
        fontSize: '25px',
        fontWeight: '500 !important ',
        fontFamily: "'Poppins', sans-serif !important"
    },
    tagline: {
        color: 'lightgray',
        margin: '-4px 0px 0px 2px !important'
    },
    resetbtn: {
        width: '100%',
        height: '40px',
        transition: 'all',
        transitionDelay: '500ms',
        marginTop: '30px !important',
        border: 'none !important',
        backgroundColor: 'lightseagreen !important',
        color: "white !important",
        "&:hover": {
            backgroundColor: '#0a9396 !important'
        }
    },
    backtoLogin: {
        width: '100%',
        height: '35px',
        transition: 'all',
        transitionDelay: '500ms',
        marginTop: '5px !important',
        border: 'none !important',
        color: 'white !important',
        backgroundColor: '#ef476f !important',
        marginTop: '-22px !important',
        "&:hover": {
            backgroundColor: '#f72585 !important'
        }
    },
    loader: {
        color: 'white !important',
        width: '10px',
        height: '10px'
    },
}))

export default useStyles;
