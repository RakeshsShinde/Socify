import { createSlice } from '@reduxjs/toolkit';
import { sendMessage } from '../../actions/messageActions'
const initialState = {
    loading: false,
    message: {},
    success: false,
    error: null,

}

const msgSlice = createSlice({
    name: 'msgSlice',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(sendMessage.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(sendMessage.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.success = true;
        })
        builder.addCase(sendMessage.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})


export default msgSlice.reducer;