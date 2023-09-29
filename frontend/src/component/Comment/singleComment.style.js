import { makeStyles } from '@mui/styles';

const useStyle = makeStyles((theme) => ({
    singleCommentConatainer: {
        gap: '1rem',
        marginBottom: '10px',
    },
    singleReplayConatainer: {
        gap: '1rem',
        marginBottom: '15px',
        marginLeft: '35px',
        padding: '5px 35px'
    },
    singleCommentAvatar: {
        width: "30px",
        height: "30px"
    },
    singleCommentReplayAvatar: {
        width: "20px",
        height: "20px"
    },

    singleCommentHeader: {
        gap: '0.7rem',
        alignItems: 'center'
    },
    singleCommentTime: {
        marginTop: '4px',
        color: 'gray',
    },

    commentData: {
        letterSpacing: "1px",
        cursor: 'pointer',
        color: 'gray',
        fontSize: '16px'
    },
    commentsLikeandReplay: {
        display: 'flex',
        marginTop: '5px',
        gap: '1.2rem',
        alignItems: 'center'
    },
    likebtn: {
        width: "7%",
        height: "45px",
        "&:hover": {
            color: 'crimson'
        }
    },

}))

export default useStyle;