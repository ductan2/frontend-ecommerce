

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import orderServices from './orderServices';
import { Order } from '../../types/Order';
import { AsyncState } from '../../types/Reponse';


const initialState: AsyncState<Order> = {
   data: [],
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: "",
   dataUpdate: undefined
}

export const getOrder = createAsyncThunk("orders/get-order", async () => {
   try {
      const response = await orderServices.getOrder();
      return response.data.result;
   } catch (error) {
      return error
   }
});

export const getOrderById = createAsyncThunk("orders/get-order-by-id", async (id: string) => {
   try {
      const response = await orderServices.getOrderById(id);
      return response.data.result;
   } catch (error) {
      return error
   }
});

export const orderSlice = createSlice({
   name: 'orders',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getOrder.pending, (state) => {
         state.isLoading = true;
      })
         .addCase(getOrder.fulfilled, (state, action) => {
            const data = action.payload;
            state.isLoading = false;
            state.isError = false
            state.isSuccess = true;
            if (Array.isArray(data)) {
               state.data = data;
            }

         })
         .addCase(getOrder.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true
            state.isSuccess = false;
            state.message = action.error as string;
         })
         .addCase(getOrderById.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getOrderById.fulfilled, (state, action) => {
            const data = action.payload;
            console.log("🚀 ~ file: orderSlice.ts:66 ~ .addCase ~ data:", data)
            state.isLoading = false;
            state.isError = false
            state.isSuccess = true;
            state.dataUpdate = data;
         })
         .addCase(getOrderById.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true
            state.isSuccess = false;
            state.message = action.error as string;
         })
   }
})

export default orderSlice.reducer;
