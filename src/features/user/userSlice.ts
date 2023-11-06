import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AsyncState, ErrorResponseAxios } from "../../types/Reponse";
import userService from "./userService";
import { Address, CartItem, CartPayload, User, UserLogin, UserRegister, UserUpdate } from "../../types/user";
import { toast } from "react-toastify";
import { Product } from "../../types/product";
import { AxiosResponse } from "axios";


interface AsyncStateWithWishList<T> extends AsyncState<T> {
   wishlist: Product[],
   cart: CartItem[],
   user: User
}
const initialState: AsyncStateWithWishList<User> = {
   data: [],
   user: {} as User,
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
      console.log("🚀 ~ file: userSlice.ts:39 ~ loginUser ~ response:", response)
      return response.data.result;
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
   }
})
export const updateUser = createAsyncThunk<User, UserUpdate>("user/update", async (body, thunkAPI) => {
   try {
      const response = await userService.updateUser(body);
      return response.data.result;
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
   }
})
export const updateAddress = createAsyncThunk<User, { id_address: string, address: Address }>("user/update-address", async ({ address, id_address }, thunkAPI) => {
   try {
      const arrAddress = []
      arrAddress[0] = address
      const response = await userService.updateAddress(id_address, arrAddress);
      return response.data.result;
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
   }
})
export const deleteAddress = createAsyncThunk<User, { id_address: string }>("user/delete-address", async ({ id_address }, thunkAPI) => {
   try {
      const response = await userService.deleteAddress(id_address);
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
export const cashOrderByPaypal = createAsyncThunk<string, { COD?: boolean, couponApplied?: string, payment_id?: string, address: Address }>("users/order/cash-order", async ({ COD, couponApplied, payment_id, address }, thunkAPI) => {
   try {
      const response = await userService.cashOrderByPaypal({ COD, couponApplied, payment_id, address });
      return response.data.result;
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
   }
})
export const appliedCoupon = createAsyncThunk<string, string>("users/apply-coupon", async (coupon, thunkAPI) => {
   try {
      const response = await userService.appliedCoupon(coupon);

      return response.data;
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
   }
})

export const getInfoUser = createAsyncThunk("users/info", async (_, thunkAPI) => {
   try {
      const response = await userService.getInfoUser();
      return response.data.result;
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
   }
})
export const logout = createAsyncThunk("users/logout", async (_, thunkAPI) => {
   try {
      const response = await userService.logout();
      return response.data;
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
   }
})
export const forgotPassword = createAsyncThunk<string, string>("users/forgot-password", async (email, thunkAPI) => {
   try {
      const response = await userService.forgotPassword(email);
      return response.data;
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
   }
})
export const resetPassword = createAsyncThunk<string, { password: string, confirmPassword: string, token: string }>("users/reset-password", async ({ password, confirmPassword, token }, thunkAPI) => {
   try {
      const response = await userService.resetPassword(password, confirmPassword, token);
      return response.data;
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
   }
})
export const userSlice = createSlice({
   name: 'users',
   initialState: initialState,
   reducers: {

   },
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
               setTimeout(() => {
                  window.location.href = "/login"
               }, 1000)
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
            const { search } = new URL(window.location.href);
            console.log("🚀 ~ file: userSlice.ts:211 ~ .addCase ~ search:", search)
            if (state.isSuccess === true) {
               toast.success("Login successfully !", {
                  position: toast.POSITION.TOP_RIGHT
               });
               setTimeout(() => {
                  window.location.href = search.substring(1) === "login" ? "/" : search.substring(1)
               }, 1000)
            }

         })
         .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true
            state.isSuccess = false;
            console.log(action)
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
         .addCase(cashOrderByPaypal.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(cashOrderByPaypal.fulfilled, (state) => {
            state.isLoading = false;
            state.isError = false
            state.isSuccess = true;
            if (state.isSuccess) {
               toast.success("Order successfully !", {
                  position: toast.POSITION.TOP_RIGHT
               });
            }
         })
         .addCase(cashOrderByPaypal.rejected, (state) => {
            state.isLoading = false;
            state.isError = true
            state.isSuccess = false;
         })
         .addCase(appliedCoupon.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(appliedCoupon.fulfilled, (state) => {
            state.isLoading = false;
            state.isError = false
            state.isSuccess = true;
            if (state.isSuccess) {
               toast.success("Applied coupon successfully !", {
                  position: toast.POSITION.TOP_RIGHT
               });
            }
         })
         .addCase(appliedCoupon.rejected, (state) => {
            state.isLoading = false;
            state.isError = true
            state.isSuccess = false;
            toast.error("Coupon is valid", {
               position: toast.POSITION.TOP_RIGHT
            });
         })
         .addCase(getInfoUser.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getInfoUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false
            state.isSuccess = true;
            state.user = action.payload
         })
         .addCase(getInfoUser.rejected, (state) => {
            state.isLoading = false;
            state.isError = true
            state.isSuccess = false;

         })
         .addCase(logout.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(logout.fulfilled, (state) => {
            state.isLoading = false;
            state.isError = false
            state.isSuccess = true;
            if (state.isSuccess) {
               localStorage.removeItem("token")
               window.location.href = "/"
            }
         })
         .addCase(logout.rejected, (state) => {
            state.isLoading = false;
            state.isError = true
            state.isSuccess = false;
         })
         .addCase(forgotPassword.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(forgotPassword.fulfilled, (state) => {
            state.isLoading = false;
            state.isError = false
            state.isSuccess = true;
            if (state.isSuccess) {
               toast.success("Send email successfully !", {
                  position: toast.POSITION.TOP_RIGHT
               });
               setTimeout(() => {
                  window.location.href = "/check-email"
               }, 1000)
            }
         })
         .addCase(forgotPassword.rejected, (state) => {
            state.isLoading = false;
            state.isError = true
            state.isSuccess = false;
         })
         .addCase(resetPassword.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(resetPassword.fulfilled, (state) => {
            state.isLoading = false;
            state.isError = false
            state.isSuccess = true;
            if (state.isSuccess) {
               toast.success("Password changed successfully !", {
                  position: toast.POSITION.TOP_RIGHT
               });
               setTimeout(() => {
                  window.location.href = "/login"
               }, 1000)
            }
         })
         .addCase(resetPassword.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true
            state.isSuccess = false;
            if (action.payload) {
               state.errorResponse = (action.payload as ErrorResponseAxios).response?.data || []
            }
         })
         .addCase(updateUser.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(updateUser.fulfilled, (state) => {
            state.isLoading = false;
            state.isError = false
            state.isSuccess = true;
            if (state.isSuccess) {
               toast.success("Update user successfully !", {
                  position: toast.POSITION.TOP_RIGHT
               });

            }
         })
         .addCase(updateUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true
            state.isSuccess = false;
            if (action.payload) {
               state.errorResponse = (action.payload as ErrorResponseAxios).response?.data || []
            }
         })
         .addCase(updateAddress.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(updateAddress.fulfilled, (state) => {
            state.isLoading = false;
            state.isError = false
            state.isSuccess = true;
            if (state.isSuccess) {
               toast.success("Update address successfully !", {
                  position: toast.POSITION.TOP_RIGHT
               });

            }
         })
         .addCase(updateAddress.rejected, (state) => {
            state.isLoading = false;
            state.isError = true
            state.isSuccess = false;
         })
         .addCase(deleteAddress.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(deleteAddress.fulfilled, (state) => {
            state.isLoading = false;
            state.isError = false
            state.isSuccess = true;
            if (state.isSuccess) {
               toast.success("Delete address successfully !", {
                  position: toast.POSITION.TOP_RIGHT
               });

            }
         })
         .addCase(deleteAddress.rejected, (state) => {
            state.isLoading = false;
            state.isError = true
            state.isSuccess = false;
         })
   },
})
export default userSlice.reducer;