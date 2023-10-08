
import { UserLogin, UserRegister } from "../../types/user";
import { auth } from "../../utils/auth";
import http from "../../utils/http";


export const registerUser = async (body: UserRegister) =>
   http.post('/users/register', body, { withCredentials: true, headers: { 'Content-Type': 'application/json' } })

export const loginUser = async (body: UserLogin) =>
   http.post('/users/login', body, { withCredentials: true, headers: { 'Content-Type': 'application/json' } })

export const getWishList = async () =>
   http.get('/users/wishlist', auth)

const userService = {
   registerUser, loginUser, getWishList
}
export default userService;