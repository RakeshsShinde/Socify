import React from 'react';
import { Avatar, Button, Skeleton, Stack, Box } from '@mui/material';

const SuggestionLoader = () => {
    return (
        <Box sx={{ padding: '10px 20px' }}>
            <Stack direction={'row'} width={'100%'} gap={'0.7rem'}>
                <Skeleton animation={'wave'} variant='circular' >
                    <Avatar style={{ width: '45px', height: '45px' }} />
                </Skeleton>
                <Box sx={{ padding: '8px 0px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <Skeleton animation={'wave'} variant='rounded' height={'10px'} width={'200px'}></Skeleton>
                    <Skeleton animation={'wave'} variant='rounded' height={'10px'} width={'100px'}></Skeleton>
                </Box>
                <Skeleton sx={{ margin: '5px auto' }} animation='wave' variant='circular' width={'20px'} height='20px'></Skeleton>
            </Stack>
        </Box>
    );
}

export default SuggestionLoader;
