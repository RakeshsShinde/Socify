import { createSlice } from '@reduxjs/toolkit';
import { likePost } from '../../actions/postActions'
const initialState = {
    loading: false,
    success: false,
    message: null,
    error: null,
}

const likePostSlice = createSlice({
    name: 'LikePost',
    initialState,
    reducers: {
        clearPostLikeError: (state) => {
            state.error = null;
        },
        clearPostLikeSucess: (state) => {
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(likePost.pending, (state) => {
            state.loading = true;
        }),
            builder.addCase(likePost.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            }),

            builder.addCase(likePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})


export const { clearPostLikeError, clearPostLikeSucess } = likePostSlice.actions;
export default likePostSlice.reducer;
