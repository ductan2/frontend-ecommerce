import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AsyncState } from "../../types/Reponse";
import productService from "./productService";
import { Product } from "../../types/product";
import { toast } from "react-toastify";


export interface AsyncStateWithPage<T> extends AsyncState<T> {
   filterData: T[],
   currentPage: number,
   limitPerPage: number,
   totalFilteredPages: number,
   showPagination: number
}

const initialState: AsyncStateWithPage<Product> = {
   data: [],
   filterData: [],
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: "",
   dataItem: {} as Product,
   currentPage: 1,
   limitPerPage: 10,
   totalFilteredPages: 1,
   showPagination: 4,
}

export const getAllProducts = createAsyncThunk<Product>("products/get-all", async (_, thunkAPI) => {
   try {
      const response = await productService.getAllProducts();
      return response.data.result;
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
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
export const getAProduct = createAsyncThunk<Product, string>("products/get-product", async (product_id, thunkAPI) => {
   try {
      const response = await productService.getAProduct(product_id);

      return response.data.result[0];
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
   }
});
export const ratingsProduct = createAsyncThunk<Product, { comment: string, star: number, product_id: string }>("products/rating", async (body, thunkAPI) => {
   try {
      const response = await productService.postComment(body);
      return response.data;
   } catch (error) {
      return thunkAPI.rejectWithValue(error);
   }
});

export const productSlice = createSlice({
   name: 'product',
   initialState: initialState,
   reducers: {
      filterProducts: (state, action) => {
         const { selectedBrand, selectedCategories, priceRange } = action.payload;
         console.log(state.filterData)
         state.filterData = state.data.filter(item => {
            const brandMatch = selectedBrand ? item.brand === selectedBrand : true;
            const categoryMatch = selectedCategories.every((category: string) => item.category.some(cat => cat.title === category));
            const priceMatch = item.price >= priceRange.min && item.price <= priceRange.max;

            return brandMatch && categoryMatch && priceMatch;
         });
         state.totalFilteredPages = Math.ceil(state.filterData.length / state.limitPerPage);
      },
      sortProducts: (state, action) => {
         switch (action.payload) {
            case 'title':
               state.filterData.sort((a, b) => a.title.localeCompare(b.title));
               break;
            case '-title':
               state.filterData.sort((a, b) => b.title.localeCompare(a.title));
               break;
            case 'price':
               state.filterData.sort((a, b) => a.price - b.price);
               break;
            case '-price':
               state.filterData.sort((a, b) => b.price - a.price);
               break;
            default:
               state.filterData.sort((a, b) => b.created_at.localeCompare(a.created_at));
               break;
         }
      },
      changePage: (state, action) => {
         window.scrollTo(0, 0)
         state.currentPage = action.payload;
      },
      clear: (state) => {
         state.filterData = state.data;
         state.currentPage = 1;
         state.totalFilteredPages = Math.ceil(state.filterData.length / state.limitPerPage);
      }
   },
   extraReducers(builder) {
      builder.addCase(getAllProducts.pending, (state) => {
         state.isLoading = true;
      })
         .addCase(getAllProducts.fulfilled, (state, action) => {

            state.isLoading = false;
            state.isError = false
            state.isSuccess = true;

            if (Array.isArray(action.payload)) {
               state.data = action.payload;
               state.filterData = action.payload;
               state.totalFilteredPages = Math.ceil(state.data.length / state.limitPerPage);
            }

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
         .addCase(addToWishList.rejected, (state) => {
            state.isLoading = false;
            state.isError = true
            state.isSuccess = false;
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
         .addCase(getAProduct.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getAProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false
            state.isSuccess = true;
            state.dataItem = action.payload
         })
         .addCase(getAProduct.rejected, (state) => {
            state.isLoading = false;
            state.isError = true
            state.isSuccess = false;
         })
         .addCase(ratingsProduct.fulfilled, (state) => {
            state.isSuccess = true;
            if (state.isSuccess === true) {
               window.location.reload();
            }
         })


   }
})
export const { sortProducts, filterProducts, changePage, clear } = productSlice.actions;
export default productSlice.reducer;