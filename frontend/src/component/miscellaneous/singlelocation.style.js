import { makeStyles } from '@mui/styles'
const useStyles = makeStyles((theme) => ({
    resultsContainer: {
        marginTop: '10px',
        padding: '5px 10px',
        maxHeight: '100%',
        width: '100%',
        overflow: 'hidden',
        alignItems: 'center',
        cursor: 'pointer',
    },
    locationName: {
        fontSize: '15px',
        transition: 'all',
        transitionDuration: "400ms",
        cursor: 'pointer',
        fontWeight: '600 !important',
        fontFamily: "'Raleway', sans-serif !important",
        "&:hover": {
            color: 'crimson',
            paddingLeft: '2px',
            "&:after": {
                content: `" "`,
                position: "absolute",
                top: 5,
                left: 43,
                width: '3px',
                height: '17px',
                backgroundColor: 'crimson',
            }
        }
    },
    totalPosts: {
        fontSize: '14px',
        fontWeight: '400 !important  ',
        fontFamily: "'Noto Sans', sans-serif !important",
        marginTop: '-5px',
        color: '#6c757d'
    }
}))


export default useStyles;