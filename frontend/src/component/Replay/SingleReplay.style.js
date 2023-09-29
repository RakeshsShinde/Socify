import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
    singlereplayConatainer: {
        gap: '1rem',
        marginBottom: '5px',
        padding: '5px 15px',
        marginLeft: '20px',
        transitionDuration: '197ms',
    },

    singlereplayAvatar: {
        width: "25px",
        height: "25px"
    },
    singlereplayReplayAvatar: {
        width: "26px",
        height: "26px"
    },

    username: {
        fontFamily: '"Poppins", sans-serif !important',
        fontWeight: '500 !important ',
        fontSize: '18px'
    },
    content: {
        lineHeight: '1.1',
        fontFamily: '"Poppins", sans-serif !important',
        fontSize: "10px",
        marginTop: '-8px !important'
    },

    singlereplayHeader: {
        gap: '0.7rem',
        alignItems: 'center',

    },
    singlereplayTime: {
        marginTop: '4px !important',
        color: 'gray',
    },

    replaylikes: {
        letterSpacing: "1px",
        cursor: 'pointer',
        color: 'gray',
        fontSize: '16px',
        marginTop: '2px !important '

    },
    likebtn: {
        width: "8%",
        height: "50px",
        "&:hover": {
            color: 'crimson'
        }
    }
}))

export default useStyles;