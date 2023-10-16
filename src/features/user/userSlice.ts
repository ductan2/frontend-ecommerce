import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AsyncState, ErrorResponseAxios } from "../../types/Reponse";
import userService from "./userService";
import { CartItem, CartPayload, User, UserLogin, UserRegister } from "../../types/user";
import { toast } from "react-toastify";
import { Product } from "../../types/product";
import { AxiosResponse } from "axios";

interface AsyncStateWithWishList<T> extends AsyncState<T> {
   wishlist: Product[],
   cart: CartItem[]
}
const initialState: AsyncStateWithWishList<User> = {
   data: [],
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: "",
   wishlist: [],
   cart: []
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
export const addToCart = createAsyncThunk<CartItem[], CartPayload>("user/cart", async (body, thunkAPI) => {
   try {
      const cart = []
      cart.push(body)
      console.log("🚀 ~ file: userSlice.ts:47 ~ addToCart ~ cart:", cart)
      const response = await userService.addToCart(cart);
      console.log("🚀 ~ file: userSlice.ts:49 ~ addToCart ~ response:", response)
      return response.data.result;
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
   }
})
export const getCart = createAsyncThunk("users/get-cart", async (_, thunkAPI) => {
   try {
      const response: AxiosResponse<{ result: CartItem[] }> = await userService.getCart();
      return response.data.result;
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
   }
});

export const removeToCartById = createAsyncThunk<string, string>("users/delete-cart", async (product_id, thunkAPI) => {
   try {
      const response = await userService.deleteCartItem(product_id);
      return response.data;
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
   }
});

export const emptyCart = createAsyncThunk("users/empty-cart", async (_, thunkAPI) => {
   try {
      const response = await userService.emptyCart();
      return response.data;
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
   }
})
export const updateCartQuantity = createAsyncThunk<string, { id: string, amount: number }>("users/cart/update-cart", async ({ id, amount }, thunkAPI) => {
   try {
      const response = await userService.updateCartQuantity(id, amount);
      return response.data.result;
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
   }
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
         .addCase(addToCart.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(addToCart.fulfilled, (state) => {
            state.isLoading = false;
            state.isError = false
            state.isSuccess = true;
            if (state.isSuccess) {
               toast.success("Add to cart successfully !", {
                  position: toast.POSITION.TOP_RIGHT
               });
            }
         })
         .addCase(addToCart.rejected, (state) => {
            state.isLoading = false;
            state.isError = true
            state.isSuccess = false;
         })
         .addCase(getCart.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false
            state.isSuccess = true;
            state.cart = action.payload
         })
         .addCase(getCart.rejected, (state) => {
            state.isLoading = false;
            state.isError = true
            state.isSuccess = false;
         })
         .addCase(removeToCartById.rejected, (state) => {
            state.isSuccess = false;
            if (state.isSuccess === false) {
               toast.error("Remove to cart failed !", {
                  position: toast.POSITION.TOP_RIGHT
               });
            }
         })
         .addCase(emptyCart.fulfilled, (state) => {
            state.isSuccess = true;
            if (state.isSuccess === true) {
               window.location.reload()
            }
         })

   },
})
export default userSlice.reducer;