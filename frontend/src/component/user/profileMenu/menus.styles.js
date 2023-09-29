import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({

    menuItem: {
        height: '40px',
        margin: '5px 0px !important',
        "&:hover": {
            backgroundColor: '#f8f9fa !important'
        }
    },
    userProfile: {
        width: '100%',
        padding: '10px 15px',
        display: 'flex',
        gap: '0.4rem',
        alignItems: 'center',
        textAlign: 'center',
    },
    paperprops: {
        overflow: 'hidden !important',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        width: '250px',
        height: '320px',
        mt: 1.5,
        '& .MuiAvatar-root': {
            width: 50,
            height: 50,
            ml: -0.5,
            mr: 1,
        },
        '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 35,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
        },
    },
    username: {
        fontFamily: '"Poppins", sans-serif !important',
        fontWeight: 400
    },
    button: {
        textTransform: 'lowercase !important',
        width: 'fit-content',
        height: '30px'
    }
}))

export default useStyles;