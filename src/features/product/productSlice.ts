import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AsyncState } from "../../types/Reponse";
import productService from "./productService";
import { Product } from "../../types/product";
import { toast } from "react-toastify";


export interface AsyncStateWithPage<T> extends AsyncState<T> {
   itemPerPage: number;
   totalItem: number
   page?: number
}

const ITEMPERPAGE = 20;
const initialState: AsyncStateWithPage<Product> = {
   data: [],
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: "",
   itemPerPage: ITEMPERPAGE,
   totalItem: 0,
}
export const getAllProducts = createAsyncThunk<{ data: Product[], total: number }, { query?: string, page?: number, limit?: number }>("products/get-all-product", async ({ query, page, limit = ITEMPERPAGE }) => {
   try {
      const response = await productService.getAllProducts(query, page, limit);
      return response.data.result;
   } catch (error) {
      return error
   }
});
export const addToWishList = createAsyncThunk<Product, string>("products/add-to-wish", async (product_id, thunkAPI) => {
   try {
      const response = await productService.toggleWishlist(product_id);
      return response.data.result;
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
   }
});
export const removeToWishList = createAsyncThunk<Product, string>("products/remove-to-wish", async (product_id, thunkAPI) => {
   try {
      const response = await productService.toggleWishlist(product_id);
      return response.data.result;
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
   }
});

export const productSlice = createSlice({
   name: 'product',
   initialState: initialState,
   reducers: {},
   extraReducers(builder) {
      builder.addCase(getAllProducts.pending, (state) => {
         state.isLoading = true;
      })
         .addCase(getAllProducts.fulfilled, (state, action) => {
            const data = action.payload.data;
            state.isLoading = false;
            state.isError = false
            state.isSuccess = true;

            if (Array.isArray(data)) {
               state.data = data;
            }
            state.totalItem = action.payload.total;
            state.page = Math.ceil(state.totalItem / state.itemPerPage);
         })
         .addCase(getAllProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true
            state.isSuccess = false;
            state.message = action.error as string;
         })
         .addCase(addToWishList.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(addToWishList.fulfilled, (state) => {
            state.isLoading = false;
            state.isError = false
            state.isSuccess = true;
            if (state.isSuccess === true) {
               toast.success("Add to wishlist successfully !", {
                  position: toast.POSITION.TOP_RIGHT
               });
            }

         })
         .addCase(addToWishList.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true
            state.isSuccess = false;
            if (action.payload) {
               toast.error("Add to wishlist failed!", {
                  position: toast.POSITION.TOP_RIGHT
               });
            }
         })
         .addCase(removeToWishList.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(removeToWishList.fulfilled, (state) => {
            state.isLoading = false;
            state.isError = false
            state.isSuccess = true;
            if (state.isSuccess === true) {
               toast.info("Remove to wishlist successfully !", {
                  position: toast.POSITION.TOP_RIGHT
               });
            }

         })
         .addCase(removeToWishList.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true
            state.isSuccess = false;
            if (action.payload) {
               toast.error("Remove to wishlist failed!", {
                  position: toast.POSITION.TOP_RIGHT
               });
            }
         })
   }
})

export default productSlice.reducer;