

import http from "../../utils/http";


export const getCategoryProductService = async () => {
   return http.get('/product-categorys/get-all')
}

export const getCategoryProductByIdService = async (id: string) => {
   return http.get(`/product-categorys/${id}`)
}
const CategoryProductServices = {
   getCategoryProductService,
   getCategoryProductByIdService
}
export default CategoryProductServices;