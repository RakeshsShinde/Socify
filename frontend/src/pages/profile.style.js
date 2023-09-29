import { makeStyles } from '@mui/styles';
const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        height: 'fit-content',
        padding: '40px 150px',
        display: 'flex',
        flexDirection: 'column',
    },
    userProfileWrappper: {
        width: '80%',
        height: '1200px',
        borderRadius: '8px',
        padding: '10px',
        backgroundColor: 'white',
        margin: 'auto',
        boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px'
    },
    userinfoWrapper: {
        padding: '20px 150px',
        display: 'flex',
        flexDirection: 'column',
        height: '280px',
        justifyContent: 'space-between',
        marginBottom: '20px',
    },
    userinfoHeader: {
        width: '100%',
        gap: '1.2rem'
    },
    usermetaDataWrapper: {
        padding: '20px',
        display: 'flex',
        gap: '4rem'
    },
    usermetaData: {
        textAlign: 'center',
        fontFamily: '"Poppins", sans-serif !important',
        cursor: 'pointer',
        color: '#4a4e69',
    },
    userDetails: {
        marginTop: '-8px',
        fontFamily: '"Poppins", sans-serif !important',
        padding: '15px 0px'
    },
    username: {
        fontSize: '18px !important',
        fontWeight: 500,
    },
    userbio: {
        maxWidth: '400px',
        color: 'gray',
        fontSize: '16px !important',
        lineHeight: '1.1',
        margin: '-5px 0px 5px 0px !important'
    },
    buttonsWrapper: {
        width: '40%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    followbtn: {
        width: '30px',
        height: '30px',
        padding: '5px 10px',
        textTransform: 'lowercase !important'
    },
    editProfile: {
        width: '150px',
        height: '30px',
        padding: '5px 8px',
        textTransform: 'lowercase !important'
    },
    messagebtn: {
        backgroundColor: '#0a66c2',
        padding: '2px 12px',
        borderRadius: '10px',
        color: 'white',
        transition: 'all ease 0.3s',
        "&:hover": {
            borderRadius: '5px'
        }
    },
    postsContainer: {
        height: '400px',
        padding: '25px 50px'
    },
    divider: {
        borderBottom: '1px solid #888',
        borderColor: 'divider'
    },
    postsWrapper: {
        padding: '50px 20px',
        width: '100%',
        height: '800px',
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
            width: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '6px',
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: '#f1f1f1',
        },
        '::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555',
        },
    },
    contactMe: {
        fontWeight: '500 !important',
        fontFamily: '"Poppins", sans-serif !important',
    },
    userEmail: {
        color: 'blue',
        cursor: 'pointer',
        transition: 'all ease 0.2s',
        "&:hover": {
            textDecoration: 'underline',
        }
    },
    noPosts: {
        fontFamily: '"Work Sans", sans-serif !important',
        textAlign: 'center',
        color: 'gray',
    }
}))

export default useStyles;