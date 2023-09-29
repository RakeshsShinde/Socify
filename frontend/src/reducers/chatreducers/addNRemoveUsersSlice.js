import { createSlice } from '@reduxjs/toolkit'
import { addUserToGroup, removeUserFromGroup } from '../../actions/chatActions'
const initialState = {
    addsuccess: false,
    adderror: null,
    addMessage: '',
    removesuccess: false,
    removeError: null,
    removeMessage: '',
    loading: false,

}

const addNremoveSlice = createSlice({
    name: 'AddNRemoveSlice',
    initialState,
    reducers: {
        clearAddNRemoveError: (state) => {
            state.adderror = null;
            state.removeError = null;
            state.loading = false;

        },
        clearAddNRemoveSuccess: (state) => {
            state.addsuccess = false;
            state.removesuccess = false;
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addUserToGroup.fulfilled, (state, action) => {
            state.addsuccess = true;
            state.loading = true;
            state.addMessage = action.payload.message;
        })
        builder.addCase(addUserToGroup.rejected, (state, action) => {
            state.addsuccess = false;
            state.adderror = action.payload;
            state.loading = false;
        })
        builder.addCase(removeUserFromGroup.fulfilled, (state, action) => {
            state.removesuccess = true;
            state.removeMessage = action.payload.message;
            state.loading = true;
        })
        builder.addCase(removeUserFromGroup.rejected, (state, action) => {
            state.removesuccess = false;
            state.removeError = action.payload;
            state.loading = false;
        })
    }

})

export const { clearAddNRemoveError, clearAddNRemoveSuccess } = addNremoveSlice.actions;

export default addNremoveSlice.reducer;
