import { makeStyles } from '@mui/styles';

const useStyle = makeStyles((theme) => ({
    container: {
        width: '100%',
        height: '100vh',
        marginTop: '18px'
    },
    chatsWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        height: '82.5vh',
        padding: '10px'
    }
}))

export default useStyle;