import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    activityContainer: {
        position: 'sticky',
        top: '80px',
        width: '100%',
        height: 'fit-content',
        minHeight: '250px',
        overflowY: 'auto',
        mr: '1rem',
        backgroundColor: 'white',
        padding: '5px 8px',
        borderRadius: '15px',
        overflow: 'hidden !important',
        boxShadow: ' rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
    },
    title: {
        textAlign: 'left',
        color: 'gray',
        fontSize: '22px',
        fontWeight: '500 !important ',
        fontFamily: "'Roboto', sans-serif !important"
    },
    header: {
        display: 'flex',
        justifyContent: "space-between",
        alignItems: 'center',
        padding: '15px 18px'
    },
    activitywrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.2rem',
    },
    badgeItem: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '25px',
        height: '25px',
        padding: '5px',
        borderRadius: '50%',
        backgroundColor: '#0e9594', color: 'white'
    },
    noActivity: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '15px',
        color: 'gray',
    }
}))


export default useStyles;