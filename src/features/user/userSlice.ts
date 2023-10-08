import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AsyncState, ErrorResponseAxios } from "../../types/Reponse";
import userService from "./userService";
import { User, UserLogin, UserRegister } from "../../types/user";
import { toast } from "react-toastify";
import { Product } from "../../types/product";
import { AxiosResponse } from "axios";

interface AsyncStateWithWishList<T> extends AsyncState<T> {
   wishlist: Product[]
}
const initialState: AsyncStateWithWishList<User> = {
   data: [],
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: "",
   wishlist: []
}

export const registerUser = createAsyncThunk<UserRegister, UserRegister>("user/register", async (body, thunkAPI) => {
   try {
      const response = await userService.registerUser(body);

      return response.data;
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
   }
})

export const loginUser = createAsyncThunk<{ refresh_token: string, token: string }, UserLogin>("user/login", async (body, thunkAPI) => {
   try {
      const response = await userService.loginUser(body);
      return response.data.result;
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
   }
})

export const getWishList = createAsyncThunk("user/get-wish-list", async (): Promise<Product[]> => {
   const response: AxiosResponse<{ result: Product[] }> = await userService.getWishList();
   return response.data.result;
})

export const userSlice = createSlice({
   name: 'product',
   initialState: initialState,
   reducers: {},
   extraReducers(builder) {
      builder.addCase(registerUser.pending, (state) => {
         state.isLoading = true;
      })
         .addCase(registerUser.fulfilled, (state) => {
            state.isLoading = false;
            state.isError = false
            state.isSuccess = true;
            if (state.isSuccess === true) {
               toast.success("Register successfully !", {
                  position: toast.POSITION.TOP_RIGHT
               });
            }
         })
         .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true
            state.isSuccess = false;
            if (action.payload) {
               state.errorResponse = (action.payload as ErrorResponseAxios).response?.data || []
            }
         })
         .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false
            state.isSuccess = true;
            localStorage.setItem("token", action.payload.token)
            if (state.isSuccess === true) {
               toast.success("Login successfully !", {
                  position: toast.POSITION.TOP_RIGHT
               });
            }

         })
         .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true
            state.isSuccess = false;
            if (action.payload) {
               state.errorResponse = (action.payload as ErrorResponseAxios).response?.data || []
            }
         })
         .addCase(getWishList.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getWishList.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false
            state.isSuccess = true;
            state.wishlist = action.payload;
         })
         .addCase(getWishList.rejected, (state) => {
            state.isLoading = false;
            state.isError = true
            state.isSuccess = false;
         })
   },
})
export default userSlice.reducer;