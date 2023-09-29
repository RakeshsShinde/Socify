import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    notification: [],
}

const NotificationSlice = createSlice({
    name: 'NotificationSlice',
    initialState,
    reducers: {
        setNotification: (state, action) => {
            state.notification = action.payload;
        }
    },

})

export const { setNotification } = NotificationSlice.actions;

export default NotificationSlice.reducer;