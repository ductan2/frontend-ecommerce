
import { CartPayload, UserLogin, UserRegister } from "../../types/user";
import { auth } from "../../utils/auth";
import http from "../../utils/http";


const registerUser = async (body: UserRegister) =>
   http.post('/users/register', body, { withCredentials: true, headers: { 'Content-Type': 'application/json' } })

const loginUser = async (body: UserLogin) =>
   http.post('/users/login', body, { withCredentials: true, headers: { 'Content-Type': 'application/json' } })

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
const userService = {
   registerUser, loginUser, getWishList, addToCart, getCart, deleteCartItem,emptyCart,
   updateCartQuantity
}
export default userService;