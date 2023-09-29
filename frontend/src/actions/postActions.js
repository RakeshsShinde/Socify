import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const createPost = createAsyncThunk('createPost', async ({ caption, location, tags, postimages }, { rejectWithValue }) => {
    try {
        const { data } = await axios.post('/post/newpost', { caption, location, tags, postimages }, {
            headers: {
                "Content-Type": 'application/json'
            }
        })
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data?.message);
    }
})

export const editPost = createAsyncThunk('editPost', async ({ postId, caption, location, tags }, { rejectWithValue }) => {
    try {
        const { data } = await axios.patch(`/post/update/${postId}`, { caption, location, tags }, {
            headers: {
                "Content-Type": 'application/json'
            }
        })
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data?.message);
    }
})

export const deletePost = createAsyncThunk('deletePost', async (postId, { rejectWithValue }) => {
    try {
        const { data } = await axios.delete(`/post/delete/${postId}`, null, {
            headers: {
                "Content-Type": 'application/json'
            }
        })
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data?.message);
    }
})




export const getPostOfFollowing = createAsyncThunk('getPostOfFollowing', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`post/getPostOfFollowing`, {
            headers: {
                "Content-Type": 'application/json'
            }
        })
        return data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message);
    }
})


export const getSinglePost = createAsyncThunk('getSinglePost', async (postId, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/post/${postId}`, {
            headers: {
                "Content-Type": 'application/json'
            }
        });
        return data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message);
    }
})


export const searchByTags = createAsyncThunk('searchByTags', async (keyword, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/post/search?keyword=${keyword}`, {
            headers: {
                "Content-Type": 'application/json'
            }
        })
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data?.message);
    }
})



export const likePost = createAsyncThunk('likePost', async (postId, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`/post/likepost/${postId}`, {
            headers: {
                "Content-Type": 'application/json',
            }
        })
        return data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message);
    }
})

export const getPostsByTagNLocation = createAsyncThunk('getPostsByTagNLocation', async ({ tag, location }, { rejectWithValue }) => {
    try {
        let apiurl = '/post/posts';
        if (tag) {
            apiurl += `?tag=${tag}`;
        } else if (location) {
            apiurl += `?location=${location}`;
        }
        const { data } = await axios.get(apiurl, {
            headers: {
                "Content-Type": 'application/json',
            }
        });
        return data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message)
    }
})

export const fetchUserPosts = createAsyncThunk('fetchUserPosts', async ({ userId, selectTab }, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/post/profile/${userId}/posts?tab=${selectTab}`, {
            headers: {
                "Content-Type": 'appliaction/json'
            }
        })
        return { selectTab, posts: data.posts };
    } catch (err) {
        return rejectWithValue(err.response?.data?.message);
    }
})


export const savePost = createAsyncThunk('savePost', async (postId, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`/post/savepost/${postId}`, {
            headers: {
                "Content-Type": 'application/json',
            }
        })
        return data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message);
    }
})




