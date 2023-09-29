import { makeStyles } from '@mui/styles';
const useStyles = makeStyles((theme) => ({
    postsContainer: {
        width: '70%',
        borderRadius: '8px',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
        backgroundColor: 'white',
        padding: '40px 35px',
        height: '80%',
        marginBottom: '50px',
        overflow: 'auto',
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
    userinfoContainer: {
        width: '60%',
        backgroundColor: 'white',
        padding: '10px 20px',
        height: '20%',
        borderRadius: '5px',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px'
    },
    userinfoWrapper: {
        width: '100%',
        padding: '15px 130px',
        display: 'flex',
        fontFamily: '"Work Sans", sans-serif !important',
        flexDirection: 'row',
        gap: '1.2rem',
        alignItems: 'center'
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        paddingTop: '100%',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.3s ease-in-out',
        '& img': {
            transition: 'transform 0.3s ease-in-out'
        },
        '&:hover': {
            '& img': {
                transform: 'scale(1.05)',
            },
        },
        '&:hover.overlay': {
            opacity: 1,
            transform: 'translate(0, 0)',

        },

    },
    mainContainer: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        padding: '25px',
        alignItems: 'center'
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.5)',
        opacity: 0,
        transform: 'translate(20%, 20%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
    },
}))

export default useStyles;