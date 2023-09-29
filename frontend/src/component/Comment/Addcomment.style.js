import { makeStyles } from '@mui/styles'
const useStyles = makeStyles((theme) => ({
    addComment: {
        display: 'flex',
        marginTop: '10px',
        alignItems: 'center',
        marginBottom: '12px',
        justifyContent: 'space-between',
    },
    addcommentAvatar: {
        minWidth: "30px",
        height: "30px"
    },
    addcommentInput: {
        minWidth: "80%",
        height: "25px",
        fontFamily: '"Nunito Sans", sans-serif !important',
        fontSize: '16px',
        fontWeight: 400

    },
    postCommentbtn: {
        height: "30px",
        minWidth: '5%',
    },
}))

export default useStyles;