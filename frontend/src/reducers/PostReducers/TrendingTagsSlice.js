import { createSlice } from '@reduxjs/toolkit';
import { getTrendingTags } from '../../actions/postActions';
const initialState = {
    success: false,
    error: null,
    loading: false,
    tags: [],
}

const trendingTagsSlice = createSlice({
    name: 'trendingTagsSlice',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getTrendingTags.pending, (state) => {
            state.loading = true;
        }),
            builder.addCase(getTrendingTags.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.tags = action.payload.trendingTags;
            }),
            builder.addCase(getTrendingTags.rejected, (state, action) => {
                state.error = action.payload;
            })
    }
})

export default trendingTagsSlice.reducer;