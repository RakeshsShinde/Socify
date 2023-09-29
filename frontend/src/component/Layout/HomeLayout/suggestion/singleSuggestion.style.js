import { makeStyles } from '@mui/styles';
const useStyles = makeStyles((theme) => ({
    notiContainer: {
        padding: '10px 8px',
    },
    username: {
        fontSize: "20px",
        display: 'inline-block',
        width: "70px",
        fontWeight: '500 !important ',
        fontFamily: '"Poppins", sans-serif !important',

    },
    message: {
        marginTop: '-3px !important',
        fontSize: '13px !important',
        color: 'gray',
        fontFamily: '"Poppins", sans-serif !important'
    },
    body: {
        width: '70%',
        marginLeft: '8px'
    },
    singleNotification: {
        display: "flex",
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: '45px',
    },
    iconContainer: {
        width: '15%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5px 8px',
        borderRadius: '50%',
        transition: 'all 0.5s',
    },
    icon: {
        width: '25px',
        height: '25px',
        cursor: 'pointer',
        "&:hover": {
            color: '#0fa3b1'
        }
    },
}))

export default useStyles;