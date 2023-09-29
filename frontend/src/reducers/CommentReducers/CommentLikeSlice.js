import { createSlice } from '@reduxjs/toolkit';
import { likeComment } from '../../actions/commentActions'

const initialState = {
    success: false,
    loading: false,
    message: null,
    error: null,
}

const likeCommentSlice = createSlice({
    name: 'CommentLike',
    initialState,
    reducers: {
        clearlikeCommentError: (state) => {
            state.error = null;
        },
        clearlikeCommentSuccess: (state) => {
            state.success = false;
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(likeComment.pending, (state) => {
            state.loading = true;
        }),
            builder.addCase(likeComment.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            }),
            builder.addCase(likeComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export const { clearlikeCommentError, clearlikeCommentSuccess } = likeCommentSlice.actions;
export default likeCommentSlice.reducer;