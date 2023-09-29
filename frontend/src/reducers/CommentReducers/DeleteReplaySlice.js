import { createSlice } from '@reduxjs/toolkit';
import { deleteReplay } from '../../actions/commentActions'

const initialState = {
    success: false,
    message: null,
    error: null,
}

const deleteReplaySlice = createSlice({
    name: 'deleteReplay',
    initialState,
    reducers: {
        clearDeleteReplayError: (state) => {
            state.error = null;
        },
        clearDeleteReplaySuccess: (state) => {
            state.success = false;
            state.message = null;
        }
    },
    extraReducers: (builder) => {

        builder.addCase(deleteReplay.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
        }),
            builder.addCase(deleteReplay.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export const { clearDeleteReplayError, clearDeleteReplaySuccess } = deleteReplaySlice.actions;
export default deleteReplaySlice.reducer;