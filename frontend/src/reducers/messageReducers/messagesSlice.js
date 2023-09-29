import { createSlice } from '@reduxjs/toolkit';
import { getAllmessages } from '../../actions/messageActions'
const initialState = {
    loading: false,
    messages: [],
    success: false,
    error: null,
}

const MessagesSlice = createSlice({
    name: 'MessagesSlice',
    initialState,
    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        clearMessages: (state) => {
            state.messages = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllmessages.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getAllmessages.fulfilled, (state, action) => {
            state.loading = false;
            state.messages = action.payload;
            state.success = true;
        })
        builder.addCase(getAllmessages.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export const { setMessages,clearMessages } = MessagesSlice.actions

export default MessagesSlice.reducer;