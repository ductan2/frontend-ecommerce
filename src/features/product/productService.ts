
import { auth } from "../../utils/auth";
import http from "../../utils/http";


const getAllProducts = async (query?: string, page?: number, limit?: number) => {
   if (!query) return http.get(`/products/get-all-products?page=${page}&limit=${limit}`)
   return http.get(`/products/get-all-products?${query}&limit=${limit}&page=${page}`,)
}
const getAProduct = async (productId: string) => {
   return http.get(`/products/${productId}`)
}
const toggleWishlist = async (productId: string) => {
   return http.put(`/products/add-to-wishlist`, { product_id: productId }, auth)
}
const postComment = async (body: { comment: string, star: number, product_id: string }) => {
   body.star = Number(body.star)
   return http.put(`/products/rating`, body, auth)
}
const productService = {
   getAllProducts,
   toggleWishlist,
   getAProduct,
   postComment
}
export default productService;