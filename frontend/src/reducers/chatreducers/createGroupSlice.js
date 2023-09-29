import { createSlice } from '@reduxjs/toolkit';
import { createNewGroup } from '../../actions/chatActions'
const initialState = {
    group: {},
    loading: false,
    error: null,
    success: false,
}

const GroupSlice = createSlice({
    name: 'GroupSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createNewGroup.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(createNewGroup.fulfilled, (state, action) => {
            state.loading = false;
            state.group = action.payload;
            state.success = true;
        })
        builder.addCase(createNewGroup.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

    }

})

export default GroupSlice.reducer;