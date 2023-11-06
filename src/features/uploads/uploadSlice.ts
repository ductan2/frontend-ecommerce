

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import uploadServices from './uploadServices';
import { UploadImageType } from '../../types/commom';



const initialState = {
   data: {} as UploadImageType,
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: "",
}

export const uploadImage = createAsyncThunk<UploadImageType, File>("uploads/", async (data: File) => {
   try {
      const formData = new FormData();
      formData.append("image", data);
      const response = await uploadServices.uploadImageServices(formData);
      return response.data.result;
   } catch (error) {
      return error
   }
});
export const deleteImage = createAsyncThunk<UploadImageType, string>("delete-image/", async (id, thunkAPI) => {
   try {
      const response = await uploadServices.deleteImage(id);
      return response.data;
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
   }
});

export const uploadSlice = createSlice({
   name: 'uploads',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(uploadImage.pending, (state) => {
         state.isLoading = true;
      })
         .addCase(uploadImage.fulfilled, (state, action) => {
            const data = action.payload;
            state.isLoading = false;
            state.isError = false
            state.isSuccess = true;
            if(Array.isArray(data)){
               state.data = data[0];
            }

         })
         .addCase(uploadImage.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true
            state.isSuccess = false;
            state.message = action.error as string;
         })
         .addCase(deleteImage.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(deleteImage.fulfilled, (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.data = {} as UploadImageType;
         })
         .addCase(deleteImage.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload as string;
         });
   }
})

export default uploadSlice.reducer;
