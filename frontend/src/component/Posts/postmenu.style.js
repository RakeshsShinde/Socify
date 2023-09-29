import { makeStyles } from '@mui/styles'
const useStyles = makeStyles((theme) => ({
    paperprops: {
        overflow: 'hidden !important',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        width: '150px',
        height: '80px',
        mt: 5.5,
    },
    options: {
        margin: '5px 0px 0px auto !important ',
        fontSize: '18px',
    },
    menuitems: {
        fontSize: '17px',
        color: 'gray',
    }

}))

export default useStyles;