import { createSlice } from '@reduxjs/toolkit';
import { getAllNotifications, markNotificationAsRead } from '../../actions/notificationActions';

const initialState = {
    loading: false,
    notifications: [],
    success: false,
    error: null,
}

const notificationSlice = createSlice({
    name: 'notificationSlice',
    initialState,
    reducers: {
        setnotifications: (state, action) => {
            state.notifications = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllNotifications.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getAllNotifications.fulfilled, (state, action) => {
            state.loading = false;
            state.notifications = action.payload;
            state.success = true;
        })
        builder.addCase(getAllNotifications.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(markNotificationAsRead.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
        })
        builder.addCase(markNotificationAsRead.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export const { setnotifications } = notificationSlice.actions
export default notificationSlice.reducer;