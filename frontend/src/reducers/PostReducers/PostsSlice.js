import { createSlice } from '@reduxjs/toolkit';
import { getPostOfFollowing } from '../../actions/postActions';

const initialState = {
    loading: false,
    error: null,
    posts: [],
    success: false,
}


const postsSlice = createSlice({
    name: 'Posts',
    initialState,
    reducers: {
        clearPostsError: (state) => {
            state.error = null;
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getPostOfFollowing.pending, (state) => {
            state.loading = true;
        }),
            builder.addCase(getPostOfFollowing.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload.posts;
                state.success = true;
            }),
            builder.addCase(getPostOfFollowing.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})
export const { clearPostsError } = postsSlice.actions;
export default postsSlice.reducer;

