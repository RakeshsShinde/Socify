import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    headingContainer: {
        height: '20%',
        marginBottom: "10px",
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    heading: {
        fontWeight: 500,
        fontFamily: '"Poppins", sans-serif !important',
    },
    formContainer: {
        height: '80%',
        display: "flex",
        flexDirection: "column",
        gap: "1.2rem"
    },
    selectedimages: {
        width: '100%',
        padding: '5px 5px',
        gap: "0.5rem",
        display: 'flex',
        overflow: 'auto',
        '&::-webkit-scrollbar': {
            width: '0.5em',
            display: 'none',
        },
    },
    postimg: {
        minWidth: '200px',
        height: '180px',
        cursor: 'all-scroll'

    },
    footer: {
        padding: '2px 8px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    Addimage: {
        width: "40px",
        backgroundColor: '#f3f2ef',
        transition: 'ease',
        transitionDelay: '.2s',
        boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;',
        "&:hover": {
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            backgroundColor: '#f3f2ef',
        }
    },
    chipsContainer: {
        backgroundColor: 'white',
        overflow: 'auto',
        '&::-webkit-scrollbar': {
            width: '0.5em',
            display: 'none',
        },
    },
    deleteChip: {
        color: 'white',

    },
    modal: {
        backgroundColor: 'rgba(0,0,0,0.2)'
    }
}))

export const modelwrapper = {
    position: 'absolute',
    top: '47%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#ffffff',
    border: 'none',
    width: "600px",
    padding: "15px 40px",
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
    borderRadius: "4px",
    minHeight: "450px"
}