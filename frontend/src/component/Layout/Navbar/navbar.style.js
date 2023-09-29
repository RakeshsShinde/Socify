import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    navbar: {
        backgroundColor: 'white !important',
        width: '100%',
        padding: '10px 50px',
        color: 'black !important',
        display: 'flex',
        justifyContent: 'space-between',
        minHeight: '50px',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px ',
        borderRadius: '8px'
    },

    userProfile: {
        cursor: 'pointer',
        borderRadius: '5px !important',
        transition: 'all ease .5s',
        "&:hover": {
            backgroundColor: '#cae9ff !important'
        }
    }
    ,
    menuItem: {
        height: '40px',
        margin: '5px 0px !important',
        "&:hover": {
            backgroundColor: '#f8f9fa !important'
        }
    },
    logo: {
        fontSize: '45px !important',
        fontFamily: '"Dancing Script", cursive !important',
        background: '#FF512F',
        background: '-webkit-linear-gradient(to right, #DD2476, #FF512F)',
        background: 'linear-gradient(to right, #DD2476, #FF512F)',
        '-webkit-background-clip': 'text !important',
        '-webkit-text-fill-color': 'transparent'
    }
}))

export default useStyles;