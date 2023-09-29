import { createSlice } from '@reduxjs/toolkit';
import { getPostsByTagNLocation } from '../../actions/postActions'
const initialState = {
    loading: false,
    results: {},
}

const postsByTagAndLocSlice = createSlice({
    name: 'postsByTagNLocation',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPostsByTagNLocation.pending, (state) => {
            state.loading = true;
        }),
            builder.addCase(getPostsByTagNLocation.fulfilled, (state, action) => {
                state.loading = false;
                state.results = action.payload;
            })
    },
})

export default postsByTagAndLocSlice.reducer;


