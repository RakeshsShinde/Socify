import { makeStyles } from '@mui/styles';
const useStyles = makeStyles((theme) => ({
    paperprops: {
        overflowY: 'scroll !important',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        width: '350px',
        height: '320px',
        padding: '10px',
        mt: 1.5,
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
    noMessage: {
        fontSize: '16px',
        color: 'gray',
        marginLeft: '25px',
        fontWeight: '500 !important ',
        fontFamily: "'Poppins', sans-serif !important"
    },
    heading: {
        fontSize: '15px',
        fontFamily: '"Work Sans", sans-serif !important',
    },
    divider: {
        margin: '5px 0px !important'
    }
}))

export default useStyles;