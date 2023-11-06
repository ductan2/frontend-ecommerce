import { useEffect } from "react"
import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "../store/store"
import { getAllBlog } from "../features/blog/blogSlice"
import { UploadImageType } from "../types/commom"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { Link } from "react-router-dom"
import { Loading } from "../components/loading/Loading"
dayjs.extend(relativeTime)
export const Blog = () => {
   const { data, isLoading } = useSelector((state: RootState) => state.blogs)
   const dispatch = useAppDispatch()
   useEffect(() => {
      dispatch(getAllBlog())
   }, [dispatch])
   if (isLoading) return <Loading isFull />
   return (
      <main className="main mt-50">

         <div className="page-content ">
            <div className="container">
               <div className="row">
                  <div className="col-lg-12">
                     <div className="shop-product-fillter mb-50">
                        <div className="totall-product">
                           <h2>
                              <img className="w-36px mr-10" src="assets/imgs/theme/icons/category-1.svg" alt="" />
                              Blog
                           </h2>
                        </div>
                     </div>
                     <div className="loop-grid">
                        <div className="row">
                           {data && data?.map((item) => (
                              <article style={{ minHeight: "520px" }} className="col-xl-3 col-lg-4 col-md-6 text-center hover-up mb-30 animated">
                                 <div className="post-thumb">
                                    <Link to={`/blog/${item._id}`}>
                                       <img className="border-radius-15" src={(item.images as UploadImageType).url || item.images as string} alt="" />
                                    </Link>

                                 </div>
                                 <div className="entry-content-2">
                                    <h6 className="mb-10 font-sm"><a className="entry-meta text-muted" href="blog-category-grid.html">{
                                       item.category.length > 3 ?
                                          item.category.slice(0, 3).map((cate) => {
                                             return cate.title
                                          }).join(" ") + "..." :
                                          item.category.map((cate) => {
                                             return cate.title
                                          }).join(" ")
                                    }</a></h6>
                                    <h4 className="post-title mb-15">
                                       <Link to={`/blog/${item._id}`}>
                                          {item.title.length > 30 ? item.title.substring(0, 30) + "..." : item.title}
                                       </Link>
                                    </h4>
                                    <div className="entry-meta font-xs color-grey mt-10 pb-10">
                                       <div>
                                          <span className="post-on mr-10">{dayjs(item.created_at).fromNow()}</span>
                                          <span className="hit-count has-dot mr-10">{item.numViews} Views</span>
                                          <span className="hit-count has-dot">{item.author}</span>
                                       </div>
                                    </div>
                                 </div>
                              </article>
                           ))}
                        </div>
                     </div>

                  </div>
               </div>
            </div>
         </div>
      </main>
   )
}
