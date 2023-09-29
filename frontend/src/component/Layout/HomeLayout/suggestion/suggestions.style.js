import { makeStyles } from '@mui/styles'
const useStyles = makeStyles((theme) => ({
    friendSuggestions: {
        position: 'sticky',
        top: '80px',
        width: '100%',
        minHeight: '250px',
        overflowY: 'hidden',
        mr: '1rem',
        backgroundColor: 'white',
        borderRadius: '15px',
        boxShadow: ' rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        padding: '15px 5px'
    },
    title: {
        textAlign: 'left',
        color: 'black',
        fontSize: '22px',
        fontWeight: '500 !important ',
        fontFamily: "'Roboto', sans-serif !important"
    },
    wrapper: {
        padding: '20px 15px',
    },
    header: {
        display: 'flex',
        justifyContent: "space-between",
        alignItems: 'center',
        padding: '15px 18px'
        // backgroundColor: 'lightgray',
    },
    subtitle: {
        marginTop: '3px !important',
        cursor: "pointer",
        fontSize: '17px',
        color: 'gray'
    },
    noSuggestion: {
        fontSize: '25px',
        color: 'gray',
        margin: '35px 45px !important',
    }

}))

export default useStyles;