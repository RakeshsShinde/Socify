import { createSlice } from '@reduxjs/toolkit';
import { followUser } from '../../actions/userActions';

const initialState = {
    success: false,
    message: null,
    error: null,
}

const followUserSlice = createSlice({
    name: 'FollowUser',
    initialState,
    reducers: {
        clearFollowUserError: (state) => {
            state.error = null;
        },
        clearFollowUserSuccess: (state) => {
            state.success = false;
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(followUser.fulfilled, (state, action) => {
            state.success = true;
            state.message = action.payload.message;
        }),
            builder.addCase(followUser.rejected, (state, action) => {
                state.error = action.payload;
            })
    }
})

export const { clearFollowUserError, clearFollowUserSuccess } = followUserSlice.actions;
export default followUserSlice.reducer;