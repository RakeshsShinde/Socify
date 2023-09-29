import { createSlice } from '@reduxjs/toolkit';
import { deleteComment } from '../../actions/commentActions'

const initialState = {
    success: false,
    message: null,
    error: null,
}

const deleteCommentSlice = createSlice({
    name: 'DeleteComment',
    initialState,
    reducers: {
        cleardeleteCommentError: (state) => {
            state.error = null;
        },
        cleardeleteCommentSuccess: (state) => {
            state.success = false;
            state.message = null;
        }
    },
    extraReducers: (builder) => {

        builder.addCase(deleteComment.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
        }),
            builder.addCase(deleteComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export const { cleardeleteCommentError, cleardeleteCommentSuccess } = deleteCommentSlice.actions;
export default deleteCommentSlice.reducer;