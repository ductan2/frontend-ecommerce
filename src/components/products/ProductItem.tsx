
import { Link } from "react-router-dom"
import { addToWishList } from "../../features/product/productSlice"
import { useAppDispatch } from "../../store/store"
import { Product } from "../../types/product"
import { Loading } from "../loading/Loading"


type props = {
   product: Product
}
export const ProductItem = ({ product }: props) => {
   const dispatch = useAppDispatch()

   const addToWish = (id: string) => {
      dispatch(addToWishList(id))
   }
   if (!product) return <Loading isFull />
   return (
      <div className="col-lg-1-5 col-md-4 col-12 col-sm-6" >
         <div className="product-cart-wrap mb-30">
            <div className="product-img-action-wrap">
               <div className="product-img product-img-zoom">
                  <Link to={`/shop/product/${product._id}`}>
                     <img className="default-img" src={product.images[0].url} alt={product.title} />
                     {product.images[1] && product.images[1].url ?
                        <img className="hover-img" src={product.images[1].url} alt={product.title + "2"} /> : null}
                  </Link>
               </div>
               <div className="product-action-1 d-flex">
                  <a onClick={() => addToWish(product._id)} aria-label="Add To Wishlist" className="action-btn"><i className="fi-rs-heart"></i></a>
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
               <h2><Link to={`/shop/product/${product._id}`}>{product.title}</Link></h2>
               <div className="product-rate-cover">
                  <div className="product-rate d-inline-block">
                     <div className="product-rating" style={{ width: product.rating_distribution * 20 + "%" }}></div>
                  </div>
                  <span className="font-small ml-5 text-muted"> {product.rating_distribution}</span>
               </div>
               <div>
                  <span className="font-small text-muted">By <a href="#">{product.brand}</a></span>
               </div>
               <div className="product-card-bottom">
                  <div className="product-price">
                     <span>${product.price}</span>
                  </div>
                  <div className="add-cart">
                     <Link className="views" to={`/shop/product/${product._id}`}><i className="fi-rs-eye"></i>Views </Link>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
