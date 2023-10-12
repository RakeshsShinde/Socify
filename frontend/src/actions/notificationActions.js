import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';


export const newNotification = createAsyncThunk('newNotification', async ({ sender, type, desc, recipients, message, post }, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`/notification/create`, { sender, type, desc, recipients, message, post }, {
            headers: {
                "Content-Type": 'application/json',
            }
        })
        return data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message);
    }
})

export const getAllNotifications = createAsyncThunk('getAllNotifications', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/notification`)
        return data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message);
    }
})


export const markNotificationAsRead = createAsyncThunk('markNotificationAsRead', async ({ notificationId }, { rejectWithValue }) => {
    try {
        await axios.put(`/notification/read/${notificationId}`);
    } catch (err) {
        rejectWithValue(err.response?.data?.message);
    }
})






