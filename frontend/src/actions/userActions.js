import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const login = createAsyncThunk('login', async ({ username, password }, { rejectWithValue }) => {
    try {
        const { data } = await axios.post('/user/login', { userId: username, password }, {
            headers: {
                "Content-Type": 'application/json'
            }
        })

        return data;

    } catch (err) {
        return rejectWithValue(err.response.data?.message);
    }
})

export const signup = createAsyncThunk('signup', async ({ username, email, password, profilepic }, { rejectWithValue }) => {

    try {
        const { data } = await axios.post('/user/signup', {
            username,
            email,
            password,
            profilepic
        }, {
            headers: {
                "Content-Type": 'application/json'
            }
        })

        return data;

    }
    catch (err) {
        return rejectWithValue(err.response?.data?.message);
    }

})

export const followUser = createAsyncThunk('followUser', async ({ userId }, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`/user/follow/${userId}`);
        return data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message);
    }
})

export const editUser = createAsyncThunk('', async ({ username, email, Bio, password, profilePic }, { rejectWithValue }) => {
    try {
        const { data } = await axios.put('/user/edit/profile', { username, email, Bio, password, profilePic }, {
            headers: {
                "Content-Type": 'application/json'
            }
        })
        return data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message)
    }
})

export const deleteUser = createAsyncThunk('deleteUser', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.delete('/user/delete')
        return data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message);
    }
})

export const suggestedUser = createAsyncThunk('suggestedUser', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get('/user/suggestion')
        return data;
    }
    catch (err) {
        return rejectWithValue(err.response?.data?.message);
    }
})


export const forgotPassword = createAsyncThunk('forgotPassword', async ({ email }, { rejectWithValue }) => {
    try {
        const { data } = await axios.post('/user/forgotpassword', { email }, {
            headers: {
                "Content-Type": 'application/json',
            }
        })
        return data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message);
    }
})

export const resetPassword = createAsyncThunk('resetPassword', async ({ token, password }, { rejectWithValue }) => {
    try {
        const { data } = await axios.put('/user/resetpassword', { token, password }, {
            headers: {
                "Content-Type": 'application/json'
            }
        })
        return data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message);
    }
})


 export const searchUser = createAsyncThunk('searchUser', async (search, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/user/search?query=${search}`, {
            headers: {
                "Content-Type": 'application/json'
            }
        });
        return data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message);
    }
})



export const fetchUserProfile = createAsyncThunk('fetchUserProfile', async (userId, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/user/profile/${userId}`, {
            headers: {
                "Content-Type": 'appliaction/json'
            }
        })
        return data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message);
    }
})


export const logout = createAsyncThunk('logout', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get('/user/logout')
        return data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message);
    }
})


