import { makeStyles } from '@mui/styles';
export const editMoadalWrapper = {
    position: 'absolute',
    top: '47%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#ffffff',
    border: 'none',
    width: "600px",
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
    borderRadius: "4px",
    height: "700px"
}

export const useStyles = makeStyles((theme) => ({
    modal: {
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    header: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 40px 5px',
    },
    title: {
        fontWeight: 500,
        fontFamily: '"Poppins", sans-serif !important',
    },
    editFormWrpper: {
        height: '615px',
        width: '100%',
        padding: '25px 40px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem',
    },
    profileWrapper: {
        marginInline: 'auto',
        position: 'relative !important',
        width: '160px',
        height: '160px'
    },
    changeImage: {
        position: 'absolute !important',
        top: '59%',
        left: '60%',
        width: '35px',
        height: '35px',
        backgroundColor: 'white !important'
    },
    btnWrapper: {
        marginLeft: 'auto',
        justifyContent: 'space-between',
        width: '40%'
    },
    loader: {
        color: 'white !important',
        width: '5px',
        height: '5px'
    }

}))

