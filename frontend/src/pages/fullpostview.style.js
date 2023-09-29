import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    postcontainer: {
        width: '100%',
        marginTop: '5px',
        display: 'flex',
        justifyContent: 'center',
        padding: '10px 50px',
        alignItems: 'center',
        marginBottom: '70px',
    },
    postwrapper: {
        width: '70%',
        height: 'fit-content',
        padding: '20px 10px'
    }
}))

export default useStyles;