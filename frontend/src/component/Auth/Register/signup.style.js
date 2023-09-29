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
    singleInput: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.2rem',
        maxHeight: '15%',

    },
    inputContainer: {
        minHeight: '80%',
        padding: '10px 8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8rem',

    },
    formWrapper: {
        width: '950px',
        height: '720px',
        backgroundColor: 'white',
        display: 'flex',
        boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px'
    },
    loginform: {
        width: "45%",
        padding: '25px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',

    },
    userProfileContainer: {
        height: '150px',
        padding: '8px 10px',
        display: 'flex',
        width: '100%',
        justifyContent: 'center',

    },
    inputLabel: {
        fontSize: '15px',
        fontWeight: '500 !important ',
        fontFamily: "'Poppins', sans-serif !important"
    },
    herosection: {
        width: '55%',
        height: '100%',
        backgroundImage: 'url("/images/bg2.jpg") ', // Replace with your image path
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',

    },
    input: {
        outline: '1px solid crimson',
        padding: '4px 7px',
        borderRadius: '2px',
    },
    signupbtn: {
        width: '100%',
        height: '40px',
        transition: 'all',
        transitionDelay: '500ms',
        marginTop: '10px !important',
        backgroundColor: 'lightseagreen !important',
        color: 'white',
        "&:hover": {
            backgroundColor: '#0a9396 !important',

        }
    },
    uploadbtn: {
        width: '100px',
        height: '30px',
        margin: '10px 20px 0px 0px !important '
    },
    signinbtn: {
        cursor: 'pointer',
        color: 'blue',
        marginBottom: '5px !important'
    },

}))

export default useStyles;