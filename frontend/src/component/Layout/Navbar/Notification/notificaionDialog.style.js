import { makeStyles } from '@mui/styles';
const useStyles = makeStyles((theme) => ({
    paperprops: {
        overflowY: 'scroll !important',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        width: '450px',
        height: '320px',
        mt: 1.5,
        '& .MuiAvatar-root': {
            width: 50,
            height: 50,
            ml: -0.5,
            mr: 1,
        },
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
}))

export default useStyles;