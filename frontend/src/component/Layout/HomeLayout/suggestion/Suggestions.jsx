import { Box, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import SingleSuggestion from './SingleSuggestion'
import { useSelector, useDispatch } from 'react-redux'
import { suggestedUser } from '../../../../actions/userActions';
import { getPostOfFollowing } from '../../../../actions/postActions';
import useStyles from './suggestions.style'

const Suggestions = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.SuggestUsers);
    const { user } = useSelector((state) => state.Login);

    useEffect(() => {
        dispatch(suggestedUser());
        dispatch(getPostOfFollowing());
    }, [user?.following])

    return (
        <Box className={classes.friendSuggestions}>
            <Stack className={classes.header} direction="row">
                <Typography variant='subtitle1' className={classes.title}>Suggested For You</Typography>
                <Box className={classes.badgeItem}>
                    <span>{users?.length}</span>
                </Box>
            </Stack>
            {users?.length > 0 ? users?.map((u) => (
                <SingleSuggestion key={u._id} user={u} />
            ))
                : <Typography variant='h6' className={classes.noSuggestion} >no suggestions</Typography>
            }
        </Box>
    );
}

export default Suggestions;
