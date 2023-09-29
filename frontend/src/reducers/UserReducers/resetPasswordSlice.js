import { createSlice } from '@reduxjs/toolkit';
import { resetPassword } from '../../actions/userActions';

const initialState = {
    loading: false,
    success: false,
    message: null,
    error: null,
}

const resetPasswordSlice = createSlice({
    name: 'ResetPassword',
    initialState,
    reducers: {
        clearResetPassError: (state) => {
            state.error = null;
        },
        clearResetPassSuccess: (state) => {
            state.success = false;
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(resetPassword.pending, (state) => {
            state.loading = true;
        }),
            builder.addCase(resetPassword.fulfilled, (state, action) => {
                state.success = true;
                state.message = action.payload.message;
                state.loading = false;
            }),
            builder.addCase(resetPassword.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
    }
})

export const { clearResetPassError, clearResetPassSuccess } = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;