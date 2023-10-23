

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import brandServices from './brandServices';
import { Brand } from '../../types/brand';
import { AsyncState } from '../../types/Reponse';

const initialState: AsyncState<Brand> = {
   data: [],
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: ""
}

export const getAllBrand = createAsyncThunk<Brand[]>("brands/get-all", async () => {
   try {
      const response = await brandServices.getBrandsServices();
      return response.data.result;
   } catch (error) {
      return error
   }
})
export const getABrand = createAsyncThunk<Brand, string>("brands/get-a-brand", async (id: string) => {
   try {
      const response = await brandServices.getABrandServices(id);
      return response.data.result;
   } catch (error) {
      return error
   }
})




export const customerSlice = createSlice({
   name: 'brands',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getAllBrand.pending, (state) => {
         state.isLoading = true;
      })
         .addCase(getAllBrand.fulfilled, (state, action) => {
            const data = action.payload;
            state.isLoading = false;
            state.isError = false
            state.isSuccess = true;
            if (Array.isArray(data)) {
               state.data = data;
            }
         })
         .addCase(getAllBrand.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true
            state.isSuccess = false;
            state.message = action.error as string;
         })
         .addCase(getABrand.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getABrand.fulfilled, (state, action) => {
            const data = action.payload;
            state.isLoading = false;
            state.isError = false
            state.isSuccess = true;
            state.dataUpdate = data;
         })
         .addCase(getABrand.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true
            state.isSuccess = false;
            state.message = action.error as string;
         })
   }
})

export default customerSlice.reducer;
