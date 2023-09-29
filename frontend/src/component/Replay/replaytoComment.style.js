
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles((theme) => ({
    addReplay: {
        display: 'flex',
        marginTop: '5px',
        paddingLeft: '60px',
        alignItems: 'center',
        marginBottom: '5px',
        justifyContent: 'space-between',
    },
    addcommentAvatar: {
        width: "25px",
        height: "25px"
    },
    addcommentInput: {
        minWidth: "75%",
        height: "25px",
        fontFamily: '"Nunito Sans", sans-serif !important',
        fontSize: '16px',
        fontWeight: 400

    },
    postCommentbtn: {
        height: "25px",
        width: '30px'
    },
    loader: {
        width: '20px',
        height: '20px',
    }
}))

export default useStyles;