import { createSlice } from '@reduxjs/toolkit';
import { createPost } from '../../actions/postActions'

const initialState = {
    loading: false,
    error: null,
    success: false,
    post: {},
}


const newPostSlice = createSlice({
    name: 'NewPost',
    initialState,
    reducers: {
        clearPostError: (state) => {
            state.error = null;
        },
        clearPostSuccess: (state) => {
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createPost.pending, (state) => {
            state.loading = true;
            state.error = null;
        }),

            builder.addCase(createPost.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.post = action.payload;
            }),

            builder.addCase(createPost.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            })
    }

})


export const { clearPostError, clearPostSuccess } = newPostSlice.actions;
export default newPostSlice.reducer;
