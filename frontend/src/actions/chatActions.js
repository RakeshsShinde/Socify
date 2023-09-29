import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllchats = createAsyncThunk('fetchAllchats', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get('/chat/fetchChats', {
            headers: {
                "Content-Type": 'application/json',
            }
        })
        return data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message);
    }
})

export const accessChat = createAsyncThunk('accessChat', async ({ userId }, { rejectWithValue }) => {
    try {
        const { data } = await axios.post('/chat/accessChat', { userId }, {
            headers: {
                "Content-Type": 'application/json'
            }
        })
        return data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message);
    }
})


export const createNewGroup = createAsyncThunk('createNewGroup', async ({ groupName, users, profilepic }, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`/chat/new/group`, { groupName, users, profilepic }, {
            headers: {
                "Content-Type": 'application/json',
            }
        })
        return data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message);
    }
})

export const renameGroup = createAsyncThunk('renameGroup', async ({ groupName, groupId }, { rejectWithValue }) => {
    try {
        const { data } = await axios.put(`/chat/group/${groupId}/renamegroup`, { groupName }, {
            headers: {
                "Content-Type": 'application/json',
            }
        })
        return data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message);
    }
})

export const editprofilePic = createAsyncThunk('editprofilePic', async ({ groupId, profilepic }, { rejectWithValue }) => {
    try {
        const { data } = await axios.put(`/chat/group/edit/profilepic/${groupId}`, { profilepic }, {
            headers: {
                "Content-Type": 'application/json'
            }
        })
        return data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message);
    }
})

export const addUserToGroup = createAsyncThunk('addUserToGroup', async ({ userId, groupId }, { rejectWithValue }) => {
    try {
        const { data } = await axios.put(`/chat/group/adduser`, { groupId, userId }, {
            headers: {
                "Content-Type": 'application/json'
            }
        })
        return data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message);
    }
})

export const removeUserFromGroup = createAsyncThunk('removeUserFromGroup', async ({ userId, groupId }, { rejectWithValue }) => {
    try {
        const { data } = await axios.put(`/chat/group/removeuser`, { groupId, userId }, {
            headers: {
                "Content-Type": 'application/json'
            }
        })
        return data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message);
    }
})

