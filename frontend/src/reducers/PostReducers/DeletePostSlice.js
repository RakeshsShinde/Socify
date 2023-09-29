import { createSlice } from '@reduxjs/toolkit';
import { deletePost } from '../../actions/postActions';
const initialState = {
    success: false,
    message: null,
    error: null,
    loading: false,
}

const deletePostSlice = createSlice({
    name: 'DeletePost',
    initialState,
    reducers: {
        clearDeletePostError: (state) => {
            state.error = null;
        },
        clearDeletePostSuccess: (state) => {
            state.success = false;
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(deletePost.pending, (state) => {
            state.loading = true;
        }),
            builder.addCase(deletePost.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            }),
            builder.addCase(deletePost.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
    }
})

export const { clearDeletePostError, clearDeletePostSuccess } = deletePostSlice.actions;
export default deletePostSlice.reducer;