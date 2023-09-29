import { makeStyles } from '@mui/styles';

export const updateModalWrapper = {
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
    formWrapper: {
        gap: '1.2rem',
        padding: '15px 25px',
        marginTop: '10px'
    },
    profileupdatebtn: {
        width: '100px',
        height: '30px',
        margin: '10px 20px 0px 20px !important ',
        '&.Mui-disabled': {
            color: 'white',
            cursor: 'not-allowed',
        },
    }
}))