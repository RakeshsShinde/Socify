import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    formcontainer: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
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

    inputContainer: {
        padding: '15px 12px',
        height: '220px',
        display: 'flex',
        flexDirection: 'column',
        gap: '3.5rem',
    },

    formWrapper: {
        width: '900px',
        height: '500px',
        backgroundColor: 'white',
        display: 'flex',
        boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px'
    },
    loginform: {
        width: "50%",
        padding: '25px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',

    },
    herosection: {
        width: '50%',
        height: '100%',
        backgroundImage: 'url("/images/bg2.jpg") ', // Replace with your image path
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    signinbtn: {
        cursor: 'pointer',
        color: 'blue',
        margin: '5px !important'
    }
    ,
    signupbtn: {
        width: '100%',
        height: '40px',
        transition: 'all',
        transitionDelay: '500ms',
        marginTop: '5px !important',
        border: 'none !important',
        backgroundColor: 'lightseagreen !important',
        color: "white !important",
        "&:hover": {
            backgroundColor: '#0a9396 !important'
        },
        "&:disable": {
            opacity: 70,
            cursor: 'not-allowed',
        }
    },
    demobtn: {
        width: '100%',
        height: '40px',
        transition: 'all',
        transitionDelay: '500ms',
        marginTop: '8px !important',
        border: 'none !important',
        color: 'white !important',
        backgroundColor: '#ef476f !important',
        marginTop: '8px !important',
        "&:hover": {
            backgroundColor: '#f72585 !important'
        }
    },
    otheroptions: {
        justifyContent: 'space-between',
        padding: '5px 10px',
    },
    loader: {
        color: 'white !important',
        width: '15px',
        height: '15px'
    },
    forgotPassword: {
        margin: '5px 0px 5px auto !important',
        textDecoration: 'underline',
        color: 'navy',
        cursor: 'pointer'
    }
}))

export default useStyles;