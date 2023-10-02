import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    heading: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    messageContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: '5px',
        backgroundColor: '#f4f4f9',
        width: '100%',
        height: '100%',
        borderRadius: '10px',
        overflow: "hidden",
        justifyContent: 'flex-end',
        '&::-webkit-scrollbar': {
            width: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '6px',
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: '#f1f1f1',
        },
        '::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555',
        },
    },
    loader: {
        width: '25px',
        height: '25px',
        alignSelf: 'center',
        margin: 'auto',
    },
    msginputContainer: {
        width: '100%',
        padding: '5px 10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '10px'
    },
    msginput: {
        width: '90%',
    }
}))

export default useStyles;