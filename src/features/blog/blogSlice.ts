import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blogService from "./blogService";
import { Blog } from "../../types/blog";
import { AsyncState } from "../../types/commom";


const initialState: AsyncState<Blog> = {
   data: [],
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: "",
   dataUpdate: undefined
}


export const getAllBlog = createAsyncThunk("blogs/get-all", async () => {
   try {
      const response = await blogService.getAllBlog();
      return response.data.result;
   } catch (error) {
      return error
   }
});
export const getBlogById = createAsyncThunk("blogs/get-a-blog", async (id: string) => {
   try {
      const response = await blogService.getBlogById(id);
      return response.data.result;
   } catch (error) {
      return error
   }
});
export const likeBlog = createAsyncThunk("blogs/likes", async (id: string) => {
   try {
      const response = await blogService.likeBlog(id);
      return response.data.result;
   } catch (error) {
      return error
   }
});
export const dislikeBlog = createAsyncThunk("blogs/dislike", async (id: string) => {
   try {
      const response = await blogService.dislikeBlog(id);
      return response.data.result;
   } catch (error) {
      return error
   }
});
export const blogSlice = createSlice({
   name: 'blogs',
   initialState: initialState,
   reducers: {},
   extraReducers(builder) {
      builder.addCase(getAllBlog.pending, (state) => {
         state.isLoading = true;
      })
         .addCase(getAllBlog.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false
            state.isSuccess = true;
            state.data = action.payload;
         })
         .addCase(getAllBlog.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true
            state.isSuccess = false;
            state.message = action.error as string;
         })
         .addCase(getBlogById.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getBlogById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false
            state.isSuccess = true;
            state.dataUpdate = action.payload;
         })
         .addCase(getBlogById.rejected, (state) => {
            state.isLoading = false;
            state.isError = true
            state.isSuccess = false;
         })
   },
})
export default blogSlice.reducer;