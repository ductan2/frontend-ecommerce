import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import paymentService from "./paymentService";


const initialState = {
   data: "",
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: "",
}


export const getConfigPayment = createAsyncThunk("payment/config", async () => {
   const response = await paymentService.getConfig();
   return response.data;
})


export const paymentSlice = createSlice({
   name: 'payment',
   initialState: initialState,
   reducers: {},
   extraReducers(builder) {
      builder.addCase(getConfigPayment.pending, (state) => {
         state.isLoading = true;
      })
      .addCase(getConfigPayment.fulfilled, (state, action) => {
         state.isLoading = false;
         state.isError = false
         state.isSuccess = true;
         state.data = action.payload;
      })
   },
})
export default paymentSlice.reducer;