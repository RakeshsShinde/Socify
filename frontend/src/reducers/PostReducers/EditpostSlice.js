import { createSlice } from '@reduxjs/toolkit';
import { editPost } from '../../actions/postActions';
const initialState = {
    success: false,
    message: null,
    error: null,
    loading: false,
}

const editPostSlice = createSlice({
    name: 'EditPost',
    initialState,
    reducers: {
        clearEditPostError: (state) => {
            state.error = null;
        },
        clearEditPostSuccess: (state) => {
            state.success = false;
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(editPost.pending, (state) => {
            state.loading = true;
        }),
            builder.addCase(editPost.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            }),
            builder.addCase(editPost.rejected, (state, action) => {
                state.error = action.payload;
            })
    }
})

export const { clearEditPostError, clearEditPostSuccess } = editPostSlice.actions;
export default editPostSlice.reducer;