import { createSlice } from '@reduxjs/toolkit';
import { fetchUserProfile } from '../../actions/userActions';
import { fetchUserPosts } from '../../actions/postActions';

const initialState = {
    user: {},
    posts: [],
    saved: [],
    profileloading: false,
    postsloading: false,
    error: null,
}

const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {
        clearProfileError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserProfile.pending, (state) => {
            state.profileloading = true;
        }),
            builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.profileloading = false;
            }),
            builder.addCase(fetchUserProfile.rejected, (state, action) => {
                state.error = action.payload;
                state.profileloading = false;
            }),
            builder.addCase(fetchUserPosts.pending, (state) => {
                state.postsloading = true;
            }),
            builder.addCase(fetchUserPosts.fulfilled, (state, action) => {
                const { selectTab, posts } = action.payload;
                if (selectTab === 'posts') {
                    state.posts = posts;
                } else {
                    state.saved = posts
                }
                state.postsloading = false;
            }),
            builder.addCase(fetchUserPosts.rejected, (state, action) => {
                state.error = action.payload;
                state.postsloading = false;
            })
    }
})
export const { clearProfileError } = userProfileSlice.actions;
export default userProfileSlice.reducer;