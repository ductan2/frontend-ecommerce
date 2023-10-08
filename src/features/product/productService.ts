
import { auth } from "../../utils/auth";
import http from "../../utils/http";


export const getAllProducts= async (query?: string, page?: number, limit?: number) => {
   if (!query) return http.get(`/products/get-all-products?page=${page}&limit=${limit}`)
   return http.get(`/products/get-all-products?${query}&limit=${limit}&page=${page}`,)
}
export const toggleWishlist  = async (productId: string) => {
   return http.put(`/products/add-to-wishlist`, { product_id: productId },auth)
}
const productService = {
   getAllProducts,
   toggleWishlist 
}
export default productService;