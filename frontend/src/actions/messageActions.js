import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const sendMessage = createAsyncThunk('sendMessage', async ({ chatId, content }, { rejectWithValue }) => {
    try {
        const { data } = await axios.post('/message/send', { chatId, content }, {
            headers: {
                "Content-Type": 'application/json',
            }
        })
        return data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message);
    }
})
export const getAllmessages = createAsyncThunk('getAllmessages', async ({ chatId }, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/message/getMessages/${chatId}`, {
            headers: {
                "Content-Type": 'application/json',
            }
        })
        return data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message);
    }
})

