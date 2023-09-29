import { createSlice } from '@reduxjs/toolkit';
import { signup } from '../../actions/userActions';

const initialState = {
    loading: false,
    success: false,
    user: null,
    error: null,
}

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
            state.loading = false;
        },
        clearSuccess: (state) => {
            state.success = false;
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signup.pending, (state) => {
            state.loading = true;
        }),
            builder.addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.user = action.payload.user;
                state.message = action.payload.message;
            }),
            builder.addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.user = null;
                state.error = action.payload;
            })
    }
})

export const { clearError, clearSuccess } = registerSlice.actions;
export default registerSlice.reducer;