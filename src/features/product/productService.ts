
import { auth } from "../../utils/auth";
import http from "../../utils/http";


const getAllProducts = async () => {
   return http.get(`/products/get-all-products-no-filter`)
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