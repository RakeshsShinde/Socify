import { makeStyles } from '@mui/styles'
const useStyles = makeStyles((theme) => ({
    singleInput: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.2rem',
        height: '15%',
        marginBottom: '5px !important',
        position: 'relative',

    },
    inputLabel: {
        fontSize: '15px',
        fontWeight: '500 !important ',
        fontFamily: "'Poppins', sans-serif !important"
    },

    input: {
        outline: '1px solid blue',
        padding: '6px 35px 4px 10px ',
        borderRadius: '2px',
        height: '40px',

    },
    inputerror: {
        outline: '1px solid crimson',
    },
    error: {
        color: 'crimson',
        fontSize: '15px'
    }

}))
export default useStyles;