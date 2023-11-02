
import { auth } from "../../utils/auth";
import http from "../../utils/http";



const getAllBlog = async () => {
   return http.get(`/blogs/get-all`)
}
const getBlogById = async (id: string) => {
   return http.get(`/blogs/${id}`)
}
const likeBlog = async (id_blog: string) => {
   return http.put(`/blogs/likes`, {id_blog}, auth)
}
const dislikeBlog = async (id_blog: string) => {
   return http.put(`/blogs/dislikes`, {id_blog}, auth)
}
const blogService = {
   getAllBlog, getBlogById, dislikeBlog, likeBlog
}
export default blogService;