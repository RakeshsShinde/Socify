import { createSlice } from '@reduxjs/toolkit';
import { replaytoComment } from '../../actions/commentActions';

const initialState = {
    loading: false,
    success: false,
    message: null,
    error: null,
}

const replaySlice = createSlice({
    name: 'Replay',
    initialState,
    reducers: {
        clearReplayError: (state) => {
            state.error = null;
        },
        clearReplaySuccess: (state) => {
            state.success = false;
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(replaytoComment.pending, (state) => {
            state.loading = true;
        }),
            builder.addCase(replaytoComment.fulfilled, (state, action) => {
                state.success = true;
                state.message = action.payload;
                state.loading = false;
            }),
            builder.addCase(replaytoComment.rejected, (state, action) => {
                state.success = false;
                state.error = action.payload;
                state.loading = false;
            })
    }
})

export const { clearReplayError, clearReplaySuccess } = replaySlice.actions;
export default replaySlice.reducer;