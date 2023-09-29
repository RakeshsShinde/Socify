import { createSlice } from '@reduxjs/toolkit';
import { forgotPassword } from '../../actions/userActions';

const initialState = {
    loading: false,
    success: false,
    message: null,
    error: null,
}

const forgotpassSlice = createSlice({
    name: 'ForgotPassword',
    initialState,
    reducers: {
        clearForgotError: (state) => {
            state.error = null;
        },
        clearForgotSuccess: (state) => {
            state.success = false;
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(forgotPassword.pending, (state) => {
            state.loading = true;
        }),
            builder.addCase(forgotPassword.fulfilled, (state, action) => {
                state.success = true;
                state.message = action.payload.message;
                state.loading = false;
            }),
            builder.addCase(forgotPassword.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
    }
})

export const { clearForgotSuccess, clearForgotError } = forgotpassSlice.actions;
export default forgotpassSlice.reducer;