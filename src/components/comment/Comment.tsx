import { useEffect, useState } from "react"
import { ratings } from "../../types/product"
import moment from "moment"
import { CommentStar } from "./CommentStar"
type Props = {
   post: ratings[]
}
export const Comment = ({ post }: Props) => {
   const [avgStar, setAvgStar] = useState<number>(0);
   const [rating, setRating] = useState<number>(0)
   const [hoverStar, setHoverStar] = useState<number>(0)


   useEffect(() => {
      const avg = post.reduce((total, item) => total + item.star, 0)
      setAvgStar(avg as number / post.length)
   }, [post])
   if (!post) return null
   return (
      <>
         <div className="tab-pane fade active show" id="Reviews">

            <div className="comments-area">
               <div className="row">
                  <div className="col-lg-8">
                     <h4 className="mb-30">Customer questions &amp; answers</h4>
                     <div className="comment-list">
                        {post?.map((item) => {
                           return <div className="single-comment mb-30 ">
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
                           <div className="product-rating" style={{ width: "90%" }}></div>
                        </div>
                        <h6>{avgStar} out of 5</h6>
                     </div>
                     <div className="progress">
                        <span>5 star</span>
                        <div className="progress-bar" role="progressbar" style={{ width: "50%" }} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100}></div>
                     </div>
                     <div className="progress">
                        <span>4 star</span>
                        <div className="progress-bar" role="progressbar" style={{ width: "25%" }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>25%</div>
                     </div>
                     <div className="progress">
                        <span>3 star</span>
                        <div className="progress-bar" role="progressbar" style={{ width: "45%" }} aria-valuenow={45} aria-valuemin={0} aria-valuemax={100}>45%</div>
                     </div>
                     <div className="progress">
                        <span>2 star</span>
                        <div className="progress-bar" role="progressbar" style={{ width: "65%" }} aria-valuenow={65} aria-valuemin={0} aria-valuemax={100}>65%</div>
                     </div>
                     <div className="progress mb-30">
                        <span>1 star</span>
                        <div className="progress-bar" role="progressbar" style={{ width: "85%" }}
                           aria-valuenow={85} aria-valuemin={0} aria-valuemax={100}
                        >85%</div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="comment-form">
               <h4 className="mb-15">Add a review</h4>
               <div className="row">
                  <div className="col-lg-8 col-md-12">
                     <form className="form-contact comment_form" action="#" id="commentForm">
                        <div className="row">
                           <div className="col-12">
                              <CommentStar hoverStar={hoverStar} rating={rating} setHoverStar={setHoverStar} setRating={setRating} />
                              <div className="form-group">
                                 <textarea className="form-control w-100"
                                    name="comment" id="comment"
                                    cols={30} rows={9} placeholder="Write Comment"></textarea>
                              </div>
                           </div>
                        </div>
                        <div className="form-group">
                           <button type="submit" className="button button-contactForm">Submit Review</button>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div></>
   )
}
