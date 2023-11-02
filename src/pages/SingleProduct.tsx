import { useEffect, useState } from "react"
import { RootState, useAppDispatch } from "../store/store"
import { AiOutlineCheck } from "react-icons/ai"
import { useParams } from "react-router-dom"
import { addToWishList, getAProduct } from "../features/product/productSlice"
import { useSelector } from "react-redux"
import { Loading } from "../components/loading/Loading"
import { ImageWrap } from "../components/ImageWrap/ImageWrap"
import { Comment } from "../components/comment/Comment"
import { debounce } from "debounce"
import { toast } from "react-toastify"
import { addToCart } from "../features/user/userSlice"

export const SingleProduct = () => {
   const [idColor, setIdColor] = useState<string>("")
   const [quantity, setQuantity] = useState<number>(1)
   const dispatch = useAppDispatch()

   const id = useParams<{ id: string }>().id
   useEffect(() => {
      dispatch(getAProduct(id as string))
   }, [dispatch, id])
   
   const { dataItem, isLoading } = useSelector((state: RootState) => state.products)

   //event click function handleColor 

   const handleSetColor = (id: string) => {
      setIdColor(id)
   }
   const handleSetQuantity = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      setQuantity(Number(e.target.value))
   }, 500)




   if (isLoading) return <Loading isFull />


   if (dataItem?._id === undefined) return null;
   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (idColor === "") {
         toast.error("You need to choose a color!", {
            position: toast.POSITION.TOP_RIGHT
         });
         return;
      }
      if (quantity > dataItem.quantity || quantity < 1) {
         toast.error("The quantity you choose is greater than the quantity in stock!", {
            position: toast.POSITION.TOP_RIGHT
         });
         return;
      }
      dispatch(addToCart({_id: dataItem._id, count: quantity, color: idColor}))

   }
   return (
      <>
         <main className="main">
            <div className="container mb-30">
               <div className="row">
                  <div className="col-xl-10 col-lg-12 m-auto">
                     <div className="product-detail accordion-detail">
                        <div className="row mb-50 mt-30">
                           <div className="col-md-6 col-sm-12 col-xs-12 mb-md-0 mb-sm-5">
                              <ImageWrap images={dataItem.images} />
                           </div>
                           <div className="col-md-6 col-sm-12 col-xs-12">
                              <div className="detail-info pr-30 pl-30">

                                 <h2 className="title-detail">{dataItem.title}</h2>
                                 <div className="product-detail-rating">
                                    <div className="product-rate-cover text-end">
                                       <div className="product-rate d-inline-block">
                                          <div className="product-rating" style={{ width: dataItem.rating_distribution * 20 + "%" }}></div>
                                       </div>
                                       <span className="font-small ml-5 text-muted"> ({dataItem.ratings?.length} reviews)</span>
                                    </div>
                                 </div>
                                 <div className="clearfix product-price-cover">
                                    <div className="product-price primary-color float-left">
                                       <span className="current-price text-brand">${dataItem.price}</span>
                                    </div>
                                 </div>
                                 <div className="short-desc mb-30">
                                    <p className="font-lg">{dataItem.description}</p>
                                 </div>
                                 <form action="" onSubmit={handleSubmit}>
                                    <div className="color-details">
                                       {dataItem.color.map((c) => {
                                          return <div key={c._id} className={idColor === c._id ? "active" : ""} onClick={() => handleSetColor(c._id)} style={{ backgroundColor: c.title }}>
                                             {idColor === c._id && <AiOutlineCheck className="color-details-icon" />}
                                          </div>
                                       })}
                                    </div>
                                    <div className="detail-extralink mb-50">
                                       <div className="input-number">
                                          {dataItem.quantity > 0 ? <input type="number" defaultValue={1} min={1} max={dataItem.quantity} onChange={handleSetQuantity} /> :
                                             <input type="number" defaultValue={0} min={0} max={dataItem.quantity} disabled />
                                          }
                                       </div>
                                       <div className="product-extra-link2">
                                          <button type="submit" className="button button-add-to-cart"><i className="fi-rs-shopping-cart"></i>Add to cart</button>
                                          <div aria-label="Add To Wishlist" className="action-btn hover-up cursor-pointer" onClick={()=>dispatch(addToWishList(dataItem._id))}><i className="fi-rs-heart"></i></div>
                                       </div>
                                    </div>
                                 </form>
                                 <div className="font-xs">
                                    <ul className="mr-50 float-start">
                                       <li className="mb-5">Category:{dataItem.category.map((item) => {
                                          return <span key={item._id} className="text-brand">{item.title},</span>
                                       })}</li>
                                       <li>LIFE: <span className="text-brand">{dataItem.created_at}</span></li>
                                    </ul>
                                    <ul className="float-start">
                                       <li>Stock:<span className="in-stock text-brand ml-5">{dataItem.quantity} Items In Stock</span></li>
                                    </ul>
                                 </div>
                              </div>

                           </div>
                        </div>
                        <div className="product-info">
                           <div className="tab-style3">
                              <ul className="nav nav-tabs text-uppercase">

                                 <li className="nav-item">
                                    <a className="nav-link" id="Reviews-tab" data-bs-toggle="tab" href="#Reviews">Reviews ({dataItem.ratings?.length} )</a>
                                 </li>
                              </ul>
                              <div className="tab-content shop_info_tab entry-main-content">
                                 <Comment post={dataItem.ratings || []} product_id={dataItem._id} />
                              </div>
                           </div>
                        </div>

                     </div>
                  </div>
               </div>
            </div>
         </main>
      </>
   )
}
