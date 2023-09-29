import React from 'react';
import { Skeleton, Box, Stack, Avatar, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
const useStyles = makeStyles((theme) => ({
    singlePost: {
        width: '95%',
        margin: '0px auto 30px auto',
        minHeight: '650px',
        backgroundColor: 'white',
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
    },
    userinfoContainer: {
        display: 'flex',
        gap: '1px',
        padding: '10px 15px 2px 15px',
        alignItems: 'center',
    },
    avatar: {
        width: 45,
        height: 30,

    },
    followbtn: {
        margin: '2px 0px 0px auto !important ',
    },

    postData: {
        width: '100%',
        padding: '8px 38px',
        display: 'flex',
        flexDirection: "column",
        gap: '0.7rem',
    }
}
))
const PostSkeleton = () => {
    const classes = useStyles();
    return (
        <Box className={classes.singlePost} >
            <Stack direction={'row'} className={classes.userinfoContainer} >
                <Skeleton animation={'wave'} variant='circular' >
                    <Avatar className={classes.avatar} />
                </Skeleton>
                <div className='flex flex-col gap-2 h-[45px] py-1 px-3 '>
                    <Skeleton animation={'wave'} variant='rounded' width={'120px'} height={'12px'}></Skeleton>
                    <Skeleton animation={'wave'} variant='rounded' width={'150px'} marginTop={'5px'} height={'12px'}></Skeleton>

                </div>
                <Button className={classes.followbtn}>
                    <Skeleton variant='rectangular' animation={'wave'} marginRight={'auto'} width={65} height={28}>
                    </Skeleton>
                </Button>
            </Stack>
            <Skeleton variant='rectangular' animation='wave' width={'100%'} height={'450px'}></Skeleton>
            <Box className={classes.postData}>
                <Skeleton animation={'wave'} variant='rounded' width={60} height={15}></Skeleton>
                <Stack direction={'column'} gap={'0.2rem'}>
                    <Stack direction={'row'} gap={'0.5rem'}>
                        <Skeleton width={90} animation={'wave'} height={20}></Skeleton>
                        <Skeleton width={80} animation={'wave'} height={20}></Skeleton>
                    </Stack>
                    <Skeleton width={640} animation={'wave'} height={15}></Skeleton>
                    <Skeleton width={640} animation={'wave'} height={15}></Skeleton>
                    <Skeleton width={500} animation={'wave'} height={15}></Skeleton>
                </Stack>
                <Skeleton width={200} animation={'wave'} height={20}></Skeleton>
            </Box>

        </Box>
    );
}

export default PostSkeleton;
