import { createSlice } from '@reduxjs/toolkit';
import { login, logout } from '../../actions/userActions';

const loginState = {
    loading: false,
    user: null,
    isAuthenticate: false,
    error: null,
    message: null,
    success: false,

}

const loginSlice = createSlice({
    initialState: loginState,
    name: 'login',
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearSuccess: (state) => {
            state.message = null;
            state.success = false;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
        }),
            builder.addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticate = true;
                state.success = true;
                state.user = action.payload.user;
                state.message = action.payload.message;
            }),
            builder.addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticate = false;
                state.error = action.payload;
            }),

            builder.addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticate = false;
                state.loading = false;

            })
    }
})

export const { clearError, clearSuccess, setUser } = loginSlice.actions;
export default loginSlice.reducer;