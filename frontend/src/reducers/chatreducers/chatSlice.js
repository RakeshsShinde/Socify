import { createSlice } from '@reduxjs/toolkit';
import { fetchAllchats, accessChat } from '../../actions/chatActions';

const initialState = {
    selectedChat: null,
    chats: [],
    error: null,
    chatlaoding: false,
    selectChatloading: false,
}

const chatSlice = createSlice({
    name: 'ChatList',
    initialState,
    reducers: {
        setselectedChat: (state, action) => {
            state.selectedChat = action.payload;
        },
        setChats: (state, action) => {
            state.chats = action.payload;
        },
        unselectChat: (state, action) => {
            state.selectedChat = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllchats.pending, (state) => {
            state.laoding = true;
        })
        builder.addCase(fetchAllchats.fulfilled, (state, action) => {
            state.laoding = false;
            state.chats = action.payload;
        })
        builder.addCase(fetchAllchats.rejected, (state, action) => {
            state.laoding = false;
            state.error = action.payload;
        })
        builder.addCase(accessChat.pending, (state) => {
            state.selectChatloading = true;
        })
        builder.addCase(accessChat.fulfilled, (state, action) => {
            state.selectChatloading = false;
            if (!state.chats.find((c) => c._id === action.payload._id)) {
                state.chats = ([action.payload, ...state.chats]);
            }
            state.selectedChat = action.payload;
        })
        builder.addCase(accessChat.rejected, (state, action) => {
            state.selectChatloading = false;
            state.error = action.payload;
        })
    }

})

export const { setselectedChat, setChats,unselectChat } = chatSlice.actions;
export default chatSlice.reducer;