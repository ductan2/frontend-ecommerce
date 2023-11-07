import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import userReducer from "../features/user/userSlice"
import productReducer from "../features/product/productSlice"
import paymentReducer from "../features/payment/paymentSlice"
import brandReducer from "../features/brand/brandSlice"
import categoryProcReducer from "../features/categoryProduct/categoryProcSlice"
import blogReducer from "../features/blog/blogSlice"
import uploadReducer from "../features/uploads/uploadSlice"
import orderReducer from "../features/orders/orderSlice"
import contactReducer from "../features/contact/contactSlice"
export const store = configureStore({
   reducer: {
      user: userReducer,
      products: productReducer,
      payment: paymentReducer,
      brands: brandReducer,
      categoryProc: categoryProcReducer,
      blogs: blogReducer,
      upload: uploadReducer,
      order: orderReducer,
      contact: contactReducer,
   },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
