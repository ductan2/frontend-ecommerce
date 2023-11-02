import { useEffect, useState } from "react"
import { ratings } from "../../types/product"
import moment from "moment"
import { CommentStar } from "./CommentStar"
import { debounce } from "debounce";
import { RootState, useAppDispatch } from "../../store/store";
import { ratingsProduct } from "../../features/product/productSlice";
import { Loading } from "../loading/Loading";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
type Props = {
   product_id: string
   post: ratings[]
}
export const Comment = ({ post, product_id }: Props) => {
   const [avgStar, setAvgStar] = useState<number>(5);
   const [rating, setRating] = useState<number>(0)
   const [hoverStar, setHoverStar] = useState<number>(0)
   const [comment, setComment] = useState<string>("")
   const [star, setStar] = useState({
      one: 0,
      two: 0,
      three: 0,
      four: 0,
      five: 0
   })
   const [isLoad, setIsLoad] = useState<boolean>(false)
   const dispatch = useAppDispatch()
   useEffect(() => {
      const avg = post.reduce((total, item) => total + item.star, 0)
      setAvgStar(avg as number / post.length || 5)
   }, [post])
   const { user } = useSelector((state: RootState) => state.user)
   useEffect(() => {
      if (post) {
         const one = post.filter(item => item.star === 1).length
         const two = post.filter(item => item.star === 2).length
         const three = post.filter(item => item.star === 3).length
         const four = post.filter(item => item.star === 4).length
         const five = post.filter(item => item.star === 5).length
         setStar({
            one,
            two,
            three,
            four,
            five
         })
      }
   }, [post])
   const handleChangeValue = debounce((e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setComment(e.target.value)
   }, 500)
   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      console.log("🚀 ~ file: Comment.tsx:56 ~ handleSubmit ~ user:", user)
      if (!user._id) {
         toast.error("You can login to comment this post!", {
            position: toast.POSITION.TOP_RIGHT
         });
         return;
      }
      setIsLoad(true)
      setTimeout(() => {
         dispatch(ratingsProduct({ product_id, star: rating, comment }))
         setIsLoad(false)
      }, 1000);
   }

   if (!post) return null
   return (
      <>
         <div className="tab-pane fade active show" id="Reviews">

            <div className="comments-area">
               <div className="row">
                  <div className="col-lg-8">
                     <h4 className="mb-30">Customer questions &amp; answers</h4>
                     <div className="comment-list">
                        {post?.map((item, index) => {
                           return <div className="single-comment mb-30 " key={index}>
                              <div className="user row">
                                 <div className="thumb col-2">
                                    <img src={item.postedBy.avatar} alt="" />
                                    <div className="font-heading text-brand no-wrap">{item.postedBy.firstname + " " + item.postedBy.lastname}</div>
                                 </div>
                                 <div className="desc col-9">
                                    <div className="d-flex justify-content-between mb-10">
                                       <div className="d-flex align-items-center">
                                          <span className="font-xs text-muted">{moment(item.posted_at).format('MMMM D, YYYY [at] h:mm a')}</span>
                                       </div>
                                       <div className="product-rate d-inline-block">

                                          <div className="product-rating" style={{ width: item.star * 20 + "%" }}></div>
                                       </div>
                                    </div>
                                    <p className="mb-10">{item.comment}</p>
                                 </div>
                              </div>
                           </div>
                        })}
                     </div>
                  </div>
                  <div className="col-lg-4">
                     <h4 className="mb-30">Customer reviews</h4>
                     <div className="d-flex mb-30">
                        <div className="product-rate d-inline-block mr-15">
                           <div className="product-rating" style={{ width: avgStar * 20 + "%" }}></div>
                        </div>
                        <h6>{avgStar !== 5 ? avgStar.toFixed(2) : 5} out of 5</h6>
                     </div>
                     <div className="progress">
                        <span>{star.five} star</span>
                        <div className="progress-bar" role="progressbar" style={{ width: star.five / post.length * 100 + "%" }} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100}>{((star.five / post.length * 100) || 0).toFixed(2)}%</div>
                     </div>
                     <div className="progress">
                        <span>{star.four} star</span>
                        <div className="progress-bar" role="progressbar" style={{ width: star.four / post.length * 100 + "%" }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>{((star.four / post.length * 100) || 0).toFixed(2)}%</div>
                     </div>
                     <div className="progress">
                        <span>{star.three} star</span>
                        <div className="progress-bar" role="progressbar" style={{ width: star.three / post.length * 100 + "%" }} aria-valuenow={45} aria-valuemin={0} aria-valuemax={100}>{((star.three / post.length * 100) || 0).toFixed(2)}%</div>
                     </div>
                     <div className="progress">
                        <span>{star.two} star</span>
                        <div className="progress-bar" role="progressbar" style={{ width: star.two / post.length * 100 + "%" }} aria-valuenow={65} aria-valuemin={0} aria-valuemax={100}>{((star.two / post.length * 100) || 0).toFixed(2)}%</div>
                     </div>
                     <div className="progress mb-30">
                        <span>{star.one} star</span>
                        <div className="progress-bar" role="progressbar" style={{ width: star.one / post.length * 100 + "%" }}
                           aria-valuenow={85} aria-valuemin={0} aria-valuemax={100}
                        >{((star.one / post.length * 100) || 0).toFixed(2)}%</div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="comment-form">
               <h4 className="mb-15">Add a review</h4>
               <div className="row">
                  <div className="col-lg-8 col-md-12">
                     <form className="form-contact comment_form" id="commentForm" onSubmit={handleSubmit}>
                        <div className="row">
                           <div className="col-12">
                              <CommentStar hoverStar={hoverStar} rating={rating} setHoverStar={setHoverStar} setRating={setRating} />
                              <div className="form-group">
                                 <textarea className="form-control w-100"
                                    name="comment" id="comment" onChange={handleChangeValue}
                                    cols={30} rows={9} placeholder="Write Comment"></textarea>
                              </div>
                           </div>
                        </div>
                        <div className="form-group">
                           <button type="submit" className="button button-contactForm px-5">{isLoad ? <Loading /> : "Submit reviews"}</button>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div></>
   )
}
