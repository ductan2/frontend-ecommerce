
import { Address, CartPayload, UserLogin, UserRegister, UserUpdate } from "../../types/user";
import { auth } from "../../utils/auth";
import http from "../../utils/http";


const registerUser = async (body: UserRegister) =>
   http.post('/users/register', body, { withCredentials: true, headers: { 'Content-Type': 'application/json' } })

const loginUser = async (body: UserLogin) =>
   http.post('/users/login', body, { withCredentials: true, headers: { 'Content-Type': 'application/json' } })

const getInfoUser = async () =>
   http.get('/users/info', auth)

const getWishList = async () =>
   http.get('/users/wishlist', auth)

const addToCart = async (cart: CartPayload[]) => {
   return http.post(`/users/cart`, { cart }, auth)
}
const getCart = async () => {
   return http.get(`/users/cart/get-cart`, auth)
}
const deleteCartItem = async (id: string) => {
   return http.delete(`/users/cart/delete-cart/${id}`, auth)
}
const emptyCart = async () => {
   return http.delete(`/users/cart/empty-cart`, auth)
}
const updateCartQuantity = async (id: string, amount: number) => {
   return http.put(`/users/cart/update-cart/${id}`, { amount }, auth)
}
const cashOrderByPaypal = async (body: { COD?: boolean, couponApplied?: string, payment_id?: string, address: Address }) => {
   return http.post(`/users/order/cash-order`, body, auth)
}

const appliedCoupon = async (coupon: string) => {
   return http.patch(`/users/apply-coupon`, { coupon }, auth)
}
const updateUser = async (data: UserUpdate) => {
   return http.patch(`/users/update-user`, data, auth)
}
const logout = async () => {
   return http.get(`/users/logout`, auth)
}
const forgotPassword = async (email: string) => {
   return http.post(`/users/forgot-password-token`, { email })
}
const resetPassword = async (password: string, confirmPassword: string, token: string) => {
   return http.put(`/users/reset-password/${token}`, { password, confirmPassword })
}
const updateAddress = async (id_address: string, address: Address[]) => {
   return http.put(`/users/update-user-address/${id_address}`, { address }, auth)
}
const deleteAddress = async (id_address: string) => {
   return http.delete(`/users/delete-user-address/${id_address}`, auth)
}
const userService = {
   registerUser, loginUser, getWishList, addToCart, getCart, deleteCartItem, emptyCart,
   updateCartQuantity, cashOrderByPaypal, appliedCoupon, getInfoUser, updateUser, logout,
   forgotPassword, resetPassword, updateAddress, deleteAddress
}
export default userService;