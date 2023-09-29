import { createSlice } from '@reduxjs/toolkit';
import { likeReplay } from '../../actions/commentActions'

const initialState = {
    success: false,
    message: null,
    error: null,
}

const likeReplaySlice = createSlice({
    name: 'LikeReplay',
    initialState,
    reducers: {
        clearReplayLikeError: (state) => {
            state.error = null;
        },
        clearReplayLikeSuccess: (state) => {
            state.success = false;
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(likeReplay.fulfilled, (state, action) => {
            state.success = true;
            state.message = action.payload.message;
        }),
            builder.addCase(likeReplay.rejected, (state, action) => {
                state.error = action.payload;
            })
    }
})

export const { clearReplayLikeSuccess, clearReplayLikeError } = likeReplaySlice.actions;
export default likeReplaySlice.reducer;