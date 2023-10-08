import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import userReducer from "../features/user/userSlice"
import productReducer from "../features/product/productSlice"
export const store = configureStore({
   reducer: {
      user: userReducer,
      products:productReducer
   },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
