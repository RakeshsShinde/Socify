import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: 'white',
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '31%',
        },
        borderRadius: '10px',
        borderWidth: '1px',
    },
    chatBox: {
        paddingBottom: '3px',
        paddingInline: '5px',
        fontSize: '28px',
        fontFamily: '"Work Sans", sans-serif !important',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        [theme.breakpoints.up('md')]: {
            fontSize: '30px',
        }
    },
    chatlist: {
        display: 'flex',
        flexDirection: 'column',
        padding: '8px',
        backgroundColor: '#F8F8F8',
        width: '100%',
        height: '100%',
        borderRadius: '5px',
        overflowY: 'hidden'
    },
    singleChat: {
        width: '100%',
        justifyContent: 'space-between',
        cursor: 'pointer',
        backgroundColor: '#E8E8E8',
        color: 'black',
        paddingInline: '10px',
        paddingBlock: '8px',
        borderRadius: '5px',
        alignItems: 'center',
        transition: 'all 0.193s',
        "&:hover": {
            backgroundColor: '#38B2AC',
            color: 'white',
        }
    },
    chatWrppper: {
        overflowY: 'scroll',
        gap: '1rem',
        height: '100%',
        '&::-webkit-scrollbar': {
            width: '0.4em',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'transparent',
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
        },
    },
    searchToChat: {
        width: '90%',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#eef3f8',
        padding: '8px 20px',
        justifyContent: 'space-between',
        borderRadius: '10px',
        margin: '10px 0px',
        cursor: 'pointer',
    },
    chatInfoWrapper: {
        padding: '5px 8px',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1
    },
    messageCountTime: {
        flexDirection: 'column',
        gap: '0.2rem',
        textAlign: 'center',
        alignItems: 'center',
    },
    unreadMessageCount: {
        width: '25px',
        height: '25px',
        backgroundColor: 'green',
        borderRadius: '50%',
        color: 'white',
        paddingTop: '3px'
    },
    drawerWrapper: {
        width: '320px',
    },
    drawerHeading: {
        padding: '15px 18px',
        fontSize: '20px'
    },
    searchInputWrppper: {
        padding: '10px 15px',
        width: '100%',
        alignItems: 'center',
        // direction='row' padding={'10px 15px'} width={'100%'} alignItems={'center'}
    },
    resultsWrapper: {
        padding: '10px 8px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem'
    }

}))

export default useStyles;