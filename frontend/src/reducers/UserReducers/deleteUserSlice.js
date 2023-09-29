import { createSlice } from '@reduxjs/toolkit';
import { deleteUser } from '../../actions/userActions';

const initialState = {
    success: false,
    message: null,
    error: null,
}

const deleteUserSlice = createSlice({
    name: 'DeleteUser',
    initialState,
    reducers: {
        clearUserDeleteError: (state) => {
            state.error = null;
        },
        clearUserDeleteSuccess: (state) => {
            state.success = false;
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.success = true;
            state.message = action.payload.message;
        }),
            builder.addCase(deleteUser.rejected, (state, action) => {
                state.error = action.payload;
            })
    }
})

export const { clearUserDeleteError, clearUserDeleteSuccess } = deleteUserSlice.actions;
export default deleteUserSlice.reducer;