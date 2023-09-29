import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit'

export const newComment = createAsyncThunk('newComment', async ({ content, postId }, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`/comment/newcomment`, { content, postId }, {
            headers: {
                "Content-Type": 'application/json'
            }
        })
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data?.message);
    }
})


export const likeComment = createAsyncThunk('likeComment', async ({ commentId }, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`/comment/like/${commentId}`, {
            headers: {
                "Content-Type": 'application/json',
            }
        })
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data?.message);
    }
})


export const deleteComment = createAsyncThunk('deleteComment', async ({ commentId }, { rejectWithValue }) => {
    try {
        const { data } = await axios.delete(`/comment/deletecomment/${commentId}`, {
            headers: {
                "Content-Type": 'application/json'
            }
        })
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data?.message);
    }
})


export const replaytoComment = createAsyncThunk('replaytoComment', async ({ commentId, content }, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`/comment/${commentId}/newreplay`, { content }, {
            headers: {
                "Content-Type": 'application/json',
            }
        })
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data?.message);
    }
})

export const likeReplay = createAsyncThunk('likeReplay', async ({ replayId }, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`/comment/replay/${replayId}`, {
            headers: {
                "Content-Type": 'application/json'
            }
        })
        return data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message);
    }
})

export const deleteReplay = createAsyncThunk('deleteReplay', async ({ replayId }, { rejectWithValue }) => {
    try {
        const { data } = await axios.delete(`/comment/replay/${replayId}`, {
            headers: {
                "Content-Type": 'application/json'
            }
        })
        return data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message);
    }
})



