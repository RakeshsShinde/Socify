import { makeStyles } from '@mui/styles'

const useStyle = makeStyles((theme) => (
    {
        SinglePostcontainer: {
            width: '95%',
            border: 'none',
            borderRadius: '5px',
            margin: '0px auto 30px auto',
            height: 'fit-content',
            backgroundColor: '#ffffff',
            display: 'flex',
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            flexDirection: 'column',
            overflow: 'hidden',
            '&::-webkit-scrollbar': {
                display: 'none',
            },
        },
        allcomments: {
            fontFamily: '"Poppins", sans-serif !important',
            fontWeight: 500,
            fontSize: '16px',
            color: 'gray',
            paddingBottom: '15px'
        },
        userInfoContainer: {
            display: 'flex',
            gap: '1px',
            padding: '5px 20px',
            alignItems: 'center',
        },
        likes: {
            fontFamily: '"Poppins", sans-serif !important',
            fontWeight: 500,
            fontSize: '16px',
            cursor: 'pointer',
            // margin: '5px 0px',
        },
        avatar: {
            width: 40,
            height: 40,
            marginTop: '5px'
        },
        username: {
            fontSize: '18px',
            fontWeight: 400,
            fontFamily: '"Poppins", sans-serif !important',
        },
        postusername: {
            fontSize: '18px',
            fontWeight: '500 !important',
            fontFamily: '"Poppins", sans-serif !important',
        },
        location: {
            fontSize: '14px',
            color: 'gray',
            marginTop: '-5px !important'
        },
        postbtnConatiner: {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '8px 20px',
        },
        singlebtn: {
            width: '30%',
            alignItems: 'center',
            gap: '0.1rem',

        },
        postlikecomment: {
            width: '40%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        postData: {
            width: '100%',
            padding: '3px 38px',
            display: 'flex',
            flexDirection: "column",
            gap: '0.4rem',
            // marginBottom: "px"

        },
        followbtn: {
            width: '50px',
            height: '30px',
            fontSize: '14px !important',
            margin: '5px 0px 0px auto !important ',
            textTransform: 'lowercase !important'
        },
        commentSection: {
            padding: '10px 30px',

        },
        postdate: {
            fontFamily: '"Poppins", sans-serif !important',
            marginTop: "3px",
            fontWeight: "300 !important",
            color: 'gray',
        }
        ,
        commentsContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginTop: '8px'
        },
        postdesc: {
            fontFamily: '"Poppins", sans-serif !important',
            fontSize: '15px',
            lineHeight: '1.4'

        },
        tags: {
            padding: '3px 0px'
        },
        hashtag: {
            fontSize: '16px',
            fontFamily: '"Open Sans", sans-serif !important',
            fontWeight: '400 !important',
            margin: '0px 2px',
            color: '#4361ee',
            cursor: 'pointer',
            transition: 'all ease 2s',
            "&:hover": {
                textDecoration: 'underline',
            }
        }

    }
))

export default useStyle;