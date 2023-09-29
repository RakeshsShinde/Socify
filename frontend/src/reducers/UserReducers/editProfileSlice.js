import { createSlice } from '@reduxjs/toolkit';
import { editUser } from '../../actions/userActions';

const initialState = {
    loading: false,
    success: false,
    message: null,
    error: null,
}

const editUserSlice = createSlice({
    name: 'EditUser',
    initialState,
    reducers: {
        clearEditUserError: (state) => {
            state.error = null;
        },
        clearEditUserSuccess: (state) => {
            state.success = false;
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(editUser.pending, (state) => {
            state.loading = true;
        }),
            builder.addCase(editUser.fulfilled, (state, action) => {
                state.success = true;
                state.message = action.payload.message;
                state.loading = false;
            }),
            builder.addCase(editUser.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
    }
})

export const { clearEditUserError, clearEditUserSuccess } = editUserSlice.actions;
export default editUserSlice.reducer;