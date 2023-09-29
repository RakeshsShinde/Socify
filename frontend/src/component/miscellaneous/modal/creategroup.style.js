import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    header: {
        width: '100%',
        justifyContent: 'space-between',
        padding: '15px 15px 0px 15px',
        fontFamily: '"Work Sans", sans-serif !important',
        alignItems: 'center'
    },
    divider: {
        marginTop: '5px',
        color: 'gray',
    },
    formWrapper: {
        gap: '1.2rem',
        padding: '15px 25px',
        marginTop: '10px'
    },
    buttonsContainer: {
        padding: '15px 20px',
        width: '100%'
    },
    buttonsWrapper: {
        marginLeft: 'auto',
        width: '40%',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5px 8px',
        color: 'white',
    },
    groupProfileContainer: {
        height: '200px',
        padding: '8px 10px',
        display: 'flex',
        width: '100%',
        justifyContent: 'center',

    },
    uploadbtn: {
        width: '100px',
        height: '30px',
        margin: '10px 20px 0px 20px !important ',
        backgroundColor: '#3f8efc !important',
        
    },
    submitBtn: {
        backgroundColor: '#4361ee !important',
        "&:hover": {
            backgroundColor: "#0077b6",
        }
    }

}))

export const modalContainer = {
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