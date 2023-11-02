import { useEffect } from "react"
import { RootState, useAppDispatch } from "../store/store"
import { dislikeBlog, getBlogById, likeBlog } from "../features/blog/blogSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { Loading } from "../components/loading/Loading";
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from "react-icons/ai"

import { toast } from "react-toastify";
dayjs.extend(relativeTime)
const SingleBlog = () => {
   const dispatch = useAppDispatch();
   const { dataUpdate: blog } = useSelector((state: RootState) => state.blogs)
   const { user } = useSelector((state: RootState) => state.user)
   const { id } = useParams<{ id: string }>();
   const navigate = useNavigate()
   useEffect(() => {
      dispatch(getBlogById(id as string))
   }, [id, dispatch])

   const isLike = blog?.likes.find((item) => item._id == user._id)

   const isDislike = blog?.dislikes.find((item) => item._id == user._id)
   const handleLike = async () => {
      if (!user._id) {
         toast.error("Please login to like this blog")
         navigate(`/login?/blog/${id}`)
         return;
      }
      const { payload } = await dispatch(likeBlog(id as string))
      if (payload) {
         setTimeout(() => {
            dispatch(getBlogById(id as string))
         }, 100)
      }
   }
   const handleDislike = async () => {
      if (!user._id) {
         toast.error("Please login to like this blog")
         navigate(`/login?redirect=/blog/${id}`)
         return;
      }
      const { payload } = await dispatch(dislikeBlog(id as string))
      if (payload) {
         setTimeout(() => {
            dispatch(getBlogById(id as string))
         }, 100)
      }
   }
   if (!blog) return <Loading isFull />
   return (
      <>
         <main className="main">
            <div className="page-content mb-50">
               <div className="container">
                  <div className="row">
                     <div className="col-lg-9 m-auto">
                        <div className="single-page pt-50 pr-30">
                           <div className="single-header style-2">
                              <div className="row">
                                 <div className="col-xl-10 col-lg-12 m-auto">
                                    <h6 className="mb-10"><a href="#">{
                                       blog.category.map((cate) => {
                                          return cate.title
                                       }).join(", ")
                                    }</a></h6>
                                    <h2 className="mb-10">{blog.title}</h2>
                                    <div className="single-header-meta">
                                       <div className="entry-meta meta-1 font-md mt-15 mb-15">
                                          <a className="author-avatar" href="#">
                                             <img className="img-circle" src="assets/imgs/blog/author-1.png" alt="" />
                                          </a>
                                          <span className="post-by">By <a href="#">{blog.author}</a></span>
                                          <span className="post-on has-dot">{dayjs(blog.created_at).fromNow()}</span>
                                       </div>
                                       <div>
                                          <div className="social-icons single-share cursor-pointer"  >
                                             <span className="mr-10 icon-hover" onClick={handleLike}>
                                                {!isLike ? <AiOutlineLike style={{ fontSize: "25px", fill: "#000" }} /> :
                                                   <AiFillLike style={{ fontSize: "25px", fill: "#000" }} />}
                                             </span>
                                             <span className="icon-hover" onClick={handleDislike}>
                                                {!isDislike ? <AiOutlineDislike style={{ fontSize: "25px", fill: "#000" }} /> :
                                                   <AiFillDislike style={{ fontSize: "25px", fill: "#000" }} />}
                                             </span>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <figure className="single-thumbnail">
                              <img src={typeof blog.images !== "string" ? blog.images.url : blog.images} alt="" />
                           </figure>
                           <div className="single-content">
                              <div className="row">
                                 <div className="col-xl-10 col-lg-12 m-auto">
                                    <div dangerouslySetInnerHTML={{ __html: blog.description }}></div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </main >
      </>
   )
}

export default SingleBlog