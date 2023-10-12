import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
    message: {
        fontSize: '14px',
        color: 'gray',
        fontWeight: '500 !important ',
        fontFamily: "'Poppins', sans-serif !important",
    },
    username: {
        color: 'black',
        fontWeight: '500 !important ',
        fontFamily: "'Poppins', sans-serif !important",
        fontSize: '15px'
    },
    conatainer: {
        width: '100%',
        padding: '5px 8px',
        display: 'flex',
        gap: '0.4rem',
        alignItems: 'center',
        borderRadius: '8px',
        marginBottom: '5px',
    },
    activityDetail: {
        maxWidth: '60%',
        height: 'fit-content',
        lineHeight: '1.2'
    },
    logoContainer: {
        width: '40px',
        height: '35px',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}))


export default useStyles;