import { makeStyles } from '@mui/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        paddingTop: '5px',
        minWidth: '54%',
        border: '1px solid gray',
        borderRadius: '15px',
        marginLeft: '24%',
        height: '60px',
        zIndex: 500,
    },
    selected: {
        color: ' rgb(47, 128, 237)',
    }

}));
export default useStyles;