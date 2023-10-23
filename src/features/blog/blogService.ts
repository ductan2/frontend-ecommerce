
import http from "../../utils/http";



const getAllBlog = async () => {
   return http.get(`/blogs/get-all`)
}

const blogService = {
   getAllBlog
}
export default blogService;