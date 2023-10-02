import { makeStyles } from '@mui/styles';

export const profileViewModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#ffffff',
    border: 'none',
    width: "550px",
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
    borderRadius: "4px",
    height: 'fit-content'
}

export const useStyles = makeStyles((theme) => ({
    header: {
        padding: '10px 20px',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    userdetailsWrepper: {
        display: 'flex',
        flexDirection: 'column',
        gap: '-10px',
        fontFamily: '"Poppins", sans-serif !important',
    },
    buttonWrpper: {
        padding: '10px 25px',
        width: '100%'
    },
    followbtn: {
        textTransform: 'lowercase !important',
    }
}))