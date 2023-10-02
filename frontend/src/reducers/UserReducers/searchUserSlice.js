import { createSlice } from '@reduxjs/toolkit';
import { searchUser } from '../../actions/userActions';
import { searchByTags, searchByLocation } from '../../actions/postActions';
const initialState = {
    loading: false,
    searchUsers: [],
    searchTags: [],
    searchLocation: [],
}

const searchUserSlice = createSlice({
    name: 'searchUser',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(searchUser.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(searchUser.fulfilled, (state, action) => {
            state.searchUsers = action.payload;
            state.loading = false;
        })
        builder.addCase(searchUser.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
        builder.addCase(searchByTags.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(searchByTags.fulfilled, (state, action) => {
            state.searchTags = action.payload;
            state.loading = false;
        })
        builder.addCase(searchByTags.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
        builder.addCase(searchByLocation.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(searchByLocation.fulfilled, (state, action) => {
            state.searchLocation = action.payload;
            state.loading = false;
        })
        builder.addCase(searchByLocation.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
    }

})

export default searchUserSlice.reducer;

