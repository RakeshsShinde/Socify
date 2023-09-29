import { createSlice } from '@reduxjs/toolkit';
import { getSinglePost } from '../../actions/postActions';

const initialState = {
    loading: false,
    error: null,
    post: {},
    success: false,
}


const postSlice = createSlice({
    name: 'SinglePost',
    initialState,
    reducers: {
        clearPostError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getSinglePost.pending, (state) => {
            state.loading = true;
        }),
            builder.addCase(getSinglePost.fulfilled, (state, action) => {
                state.loading = false;
                state.post = action.payload.post;
                state.success = true;
            }),
            builder.addCase(getSinglePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})
export const { clearPostError } = postSlice.actions;
export default postSlice.reducer;

