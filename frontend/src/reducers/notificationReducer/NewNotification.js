import { createSlice } from '@reduxjs/toolkit';
import { newNotification } from '../../actions/notificationActions';

const initialState = {
    loading: false,
    notification: {},
    success: false,
    error: null,
}

const notificationSlice = createSlice({
    name: 'notificationSlice',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(newNotification.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(newNotification.fulfilled, (state, action) => {
            state.loading = false;
            state.notification = action.payload;
            state.success = true;
        })
        builder.addCase(newNotification.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export const { setnotifications } = notificationSlice.actions
export default notificationSlice.reducer;