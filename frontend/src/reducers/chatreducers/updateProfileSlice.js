import { createSlice } from '@reduxjs/toolkit';
import { renameGroup, editprofilePic } from '../../actions/chatActions';

const initialState = {
    picloading: false,
    renameloading: false,
    renameMessage: null,
    renameSuccess: false,
    picuploadmessage: null,
    picloadSuccess: false,
    error: null,
}

const updateSlice = createSlice({
    name: 'updateSlice',
    initialState,
    reducers: {
        clearSuccess: (state) => {
            state.renameSuccess = false;
            state.picloadSuccess = false;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(renameGroup.pending, (state) => {
            state.renameloading = true;
        })
        builder.addCase(renameGroup.fulfilled, (state, action) => {
            state.renameloading = false;
            state.renameMessage = action.payload;
            state.renameSuccess = true;
        })
        builder.addCase(renameGroup.rejected, (state, action) => {
            state.renameloading = false;
            state.error = action.payload;
        })
        builder.addCase(editprofilePic.pending, (state) => {
            state.picloading = true;
        })
        builder.addCase(editprofilePic.fulfilled, (state, action) => {
            state.picloading = false;
            state.picuploadmessage = action.payload.message;
            state.picloadSuccess = true;
        })
        builder.addCase(editprofilePic.rejected, (state, action) => {
            state.picloading = false;
            state.error = action.payload;
        })
    }

})
export const { clearError, clearSuccess } = updateSlice.actions;

export default updateSlice.reducer;