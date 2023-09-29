import { makeStyles } from '@mui/styles'
const useStyles = makeStyles((theme) => ({
    trendingTags: {
        width: '100%',
        height: 'fit-content',
        minHeight: '250px',
        overflowY: 'auto',
        mr: '1rem',
        backgroundColor: 'white',
        padding: '15px 20px',
        borderRadius: '15px',
        overflow: 'hidden !important',
        boxShadow: ' rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
    },
    title: {
        textAlign: 'left',
        color: 'gray',
        fontSize: '22px',
        fontWeight: '500 !important ',
        fontFamily: "'Roboto', sans-serif !important"
    },
    hashtagsContainer: {
        marginTop: '10px',
        padding: '5px 10px',
        maxHeight: '100%',
        width: '100%',
        overflow: 'hidden',
        alignItems: 'center',
        cursor: 'pointer',
    },
    tagname: {
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
    headerContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
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