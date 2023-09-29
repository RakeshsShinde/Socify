import { createSlice } from '@reduxjs/toolkit';
import { newComment } from '../../actions/commentActions'

const initialState = {
    loading: false,
    error: null,
    success: false,
    message: null,
}


const newCommentSlice = createSlice({
    name: 'NewComment',
    initialState,
    reducers: {
        clearCommentError: (state) => {
            state.error = null;
        },
        clearCommentSuccess: (state) => {
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(newComment.pending, (state) => {
            state.loading = true;
            state.error = null;
        }),

            builder.addCase(newComment.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            }),

            builder.addCase(newComment.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            })
    }

})


export const { clearCommentError, clearCommentSuccess } = newCommentSlice.actions;
export default newCommentSlice.reducer;
