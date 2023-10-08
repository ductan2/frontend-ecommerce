
import { addToWishList } from "../../features/product/productSlice"
import { useAppDispatch } from "../../store/store"
import { Product } from "../../types/product"
import { Loading } from "../loading/Loading"


type props = {
   product: Product
}
export const ProductItem = ({ product }: props) => {
   const dispatch = useAppDispatch()

   const addToWish =(id:string)=>{
      dispatch(addToWishList(id))
   }
   if(!product) return <Loading isFull/>
   return (
      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6" >
         <div className="product-cart-wrap mb-30">
            <div className="product-img-action-wrap">
               <div className="product-img product-img-zoom">
                  <a href="shop-product-right.html">
                     <img className="default-img" src={product.images[0].url} alt="" />
                     {product.images[1].url ? <img className="hover-img" src={product.images[1].url} alt="" /> : null}
                  </a>
               </div>
               <div className="product-action-1 d-flex">
                  <a onClick={()=>addToWish(product._id)} aria-label="Add To Wishlist" className="action-btn"><i className="fi-rs-heart"></i></a>
                  <a aria-label="Quick view" className="action-btn" data-bs-toggle="modal" data-bs-target="#quickViewModal"><i className="fi-rs-eye"></i></a>
               </div>
               <div className="product-badges product-badges-position product-badges-mrg">
                  {product.trending ? <span className="hot">Trending</span> : (
                     product.featured ? <span className="sale">Featured</span> : null
                  )}
               </div>
            </div>
            <div className="product-content-wrap">
               <div className="product-category">
                  <a href="shop-grid-right.html">{product.category[0].title}</a>
               </div>
               <h2><a href="shop-product-right.html">{product.title}</a></h2>
               <div className="product-rate-cover">
                  <div className="product-rate d-inline-block">
                     <div className="product-rating" style={{ width: "90%" }}></div>
                  </div>
                  <span className="font-small ml-5 text-muted"> {product.rating_distribution}</span>
               </div>
               <div>
                  <span className="font-small text-muted">By <a href="vendor-details-1.html">{product.brand}</a></span>
               </div>
               <div className="product-card-bottom">
                  <div className="product-price">
                     <span>${product.price}</span>
                  </div>
                  <div className="add-cart">
                     <a className="add" href="shop-cart.html"><i className="fi-rs-shopping-cart mr-5"></i>Add </a>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
