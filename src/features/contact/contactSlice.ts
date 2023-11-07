import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import contactService from "./contactService";
import { toast } from "react-toastify";



const initialState = {
   data: "",
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: "",
}


export const createContact = createAsyncThunk("contact/create", async (body: { name: string, email: string, subject: string, message: string }) => {
   const response = await contactService.createContact(body);
   return response.data;
})


export const paymentSlice = createSlice({
   name: 'payment',
   initialState: initialState,
   reducers: {},
   extraReducers(builder) {
      builder.addCase(createContact.pending, (state) => {
         state.isLoading = true;
      })
         .addCase(createContact.fulfilled, (state) => {
            state.isLoading = false;
            state.isError = false
            state.isSuccess = true;
            if (state.isSuccess) {
               toast.success("Send a contact successfully")
            }
         })
         
   },
})
export default paymentSlice.reducer;