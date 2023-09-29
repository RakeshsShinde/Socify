import { createSlice } from '@reduxjs/toolkit';
import { suggestedUser } from '../../actions/userActions';

const initialState = {
    success: false,
    loading: false,
    error: null,
    users: [],
}

const SuggestedUsersSlice = createSlice({
    name: 'SuggestUser',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(suggestedUser.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(suggestedUser.fulfilled, (state, action) => {
            state.success = true;
            state.users = action.payload.usersnotFollowed;
            state.loading = false;
        }),
            builder.addCase(suggestedUser.rejected, (state, action) => {
                state.error = action.payload;
            })
    }
})

export default SuggestedUsersSlice.reducer;