import { createSlice } from '@reduxjs/toolkit';
import { savePost } from '../../actions/postActions';
const initialState = {
    success: false,
    message: null,
    error: null,
    loading: false,
}

const SavePostSlice = createSlice({
    name: 'SavePost',
    initialState,
    reducers: {
        clearSavePostError: (state) => {
            state.error = null;
        },
        clearSavePostSuccess: (state) => {
            state.success = false;
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(savePost.pending, (state) => {
            state.loading = true;
        }),
            builder.addCase(savePost.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            }),
            builder.addCase(savePost.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
    }
})

export const { clearSavePostError, clearSavePostSuccess } = SavePostSlice.actions;
export default SavePostSlice.reducer;