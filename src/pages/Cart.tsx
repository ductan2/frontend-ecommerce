import { Link } from "react-router-dom"
import { RootState, useAppDispatch } from "../store/store"
import { useEffect, useState } from "react";
import { emptyCart, getCart, removeToCartById, updateCartQuantity } from "../features/user/userSlice";
import { useSelector } from "react-redux";
import { Loading } from "../components/loading/Loading";
import { debounce } from "debounce";



export const Cart = () => {

   const dispatch = useAppDispatch();

   const [totalCart, setTotalCart] = useState(0)

   useEffect(() => {
      dispatch(getCart())
   }, [dispatch])
   const { cart, isLoading } = useSelector((state: RootState) => state.user)
   useEffect(() => {
      if (cart) {
         const total = cart.reduce((total, item) => {
            return total + (item.totalAfterDiscount !== 0 ? item.totalAfterDiscount : item.cartTotal)
         }, 0)
         setTotalCart(total)
      }
   }, [cart])
   const removeCart = (id: string) => {
      setTimeout(() => {
         dispatch(removeToCartById(id))
         setTimeout(() => {
            dispatch(getCart())
         }, 200)
      }, 500)
   }
   const updateCart = debounce((e: React.ChangeEvent<HTMLInputElement>, id: string) => {
      const value = e.target.value
      if (typeof value === 'string') {
         dispatch(updateCartQuantity({ id, amount: Number(value) }))
         setTimeout(() => {
            dispatch(getCart())
         }, 200)
      }
   },500)


   if (isLoading || !cart) return <Loading isFull />

   return (
      <>
         <main className="main">
            <div className="container mb-80 mt-50">
               <div className="row">
                  <div className="col-lg-8 mb-40">
                     <h1 className="heading-2 mb-10">Your Cart</h1>
                     <div className="d-flex justify-content-between">
                        <h6 className="text-body">There are <span className="text-brand">{cart.length}</span> products in your cart</h6>
                        <h6 className="text-body cursor-pointer" onClick={() => dispatch(emptyCart())}><div className="text-muted  text-red-hover "><i className="fi-rs-trash mr-5"></i>Clear Cart</div></h6>
                     </div>
                  </div>
               </div>
               <div className="row">
                  <div className="col-lg-8">
                     <div className="table-responsive shopping-summery">
                        <table className="table table-wishlist">
                           <thead>
                              <tr className="main-heading">
                                 <th scope="col" colSpan={2}>Product</th>
                                 <th scope="col">Unit Price</th>
                                 <th scope="col">Quantity</th>
                                 <th scope="col">Subtotal</th>
                                 <th scope="col" className="end">Remove</th>
                              </tr>
                           </thead>
                           <tbody>
                              {cart && cart.length > 0 && cart?.map((item) => (
                                 <tr key={item._id} >

                                    <td className="image product-thumbnail"><img src={item.product.images[0].url} alt="#" /></td>
                                    <td className="product-des product-name">
                                       <h6 className="mb-5"><Link className="product-name mb-10 text-heading" to={`/shop/product/${item.product._id}`}>{item.product.title}</Link></h6>
                                       <div className="product-rate-cover">
                                          <div className="product-rate d-inline-block">
                                             <div className="product-rating" style={{ width: item.product.rating_distribution * 20 + "%" }}>
                                             </div>
                                          </div>
                                          <span className="font-small ml-5 text-muted"> ({item.product.rating_distribution})</span>
                                       </div>
                                    </td>
                                    <td className="price" data-title="Price">
                                       <h4 className="text-body">${item.product.price} </h4>
                                    </td>
                                    <td className="text-center detail-info" data-title="Stock">
                                       <div className="detail-extralink mr-15">
                                          <div className="input-number">
                                             {item.product.quantity > 0 ? <input type="number" defaultValue={item.amount} min={1}
                                                max={item.product.quantity} onChange={(e) => updateCart(e, item._id)} /> :
                                                <input type="number" defaultValue={item.amount} min={1} max={item.product.quantity} disabled />
                                             }
                                          </div>
                                       </div>
                                    </td>
                                    <td className="price" data-title="Price">
                                       <h4 className="text-brand">${item.cartTotal} </h4>
                                    </td>
                                    <td className="action text-center cursor-pointer text-red-hover" data-title="Remove" onClick={() => removeCart(item._id)}><i className="fi-rs-trash"></i></td>
                                 </tr>
                              ))}

                           </tbody>
                        </table>
                     </div>
                     <div className="divider-2 mb-30"></div>
                     <div className="cart-action d-flex justify-content-between">
                        <Link to={"/shop"} className="btn "><i className="fi-rs-arrow-left mr-10"></i>Continue Shopping</Link>
                     </div>
                  </div>
                  <div className="col-lg-4">
                     <div className="row mt-50">
                        <div className="col-lg-12">
                           <div className="p-40">
                              <h4 className="mb-10">Apply Coupon</h4>
                              <p className="mb-30"><span className="font-lg text-muted">Using A Promo Code?</span></p>
                              <form action="#">
                                 <div className="d-flex justify-content-between">
                                    <input className="font-medium mr-15 coupon" name="Coupon" placeholder="Enter Your Coupon" />
                                    <button className="btn"><i className="fi-rs-label mr-10"></i>Apply</button>
                                 </div>
                              </form>
                           </div>
                        </div>
                     </div>
                     <div className="border p-md-4 cart-totals ml-30">
                        <div className="table-responsive">
                           <table className="table no-border">
                              <tbody>
                                 <tr>
                                    <td className="cart_total_label">
                                       <h6 className="text-muted">Subtotal</h6>
                                    </td>
                                    <td className="cart_total_amount">
                                       <h4 className="text-brand text-end">${totalCart}</h4>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td scope="col" colSpan={2}>
                                       <div className="divider-2 mt-10 mb-10"></div>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td className="cart_total_label">
                                       <h6 className="text-muted">Shipping</h6>
                                    </td>
                                    <td className="cart_total_amount">
                                       <h5 className="text-heading text-end">Free </h5></td></tr> <tr>
                                    <td className="cart_total_label">
                                       <h6 className="text-muted">Estimate htmlFor</h6>
                                    </td>
                                    <td className="cart_total_amount">
                                       <h5 className="text-heading text-end">United Kingdom </h5></td></tr> <tr>
                                    <td scope="col" colSpan={2}>
                                       <div className="divider-2 mt-10 mb-10"></div>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td className="cart_total_label">
                                       <h6 className="text-muted">Total</h6>
                                    </td>
                                    <td className="cart_total_amount">
                                       <h4 className="text-brand text-end">${totalCart}</h4>
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>
                        <a href="#" className="btn mb-20 w-100">Proceed To CheckOut<i className="fi-rs-sign-out ml-15"></i></a>
                     </div>
                  </div>
               </div>
            </div>
         </main>
      </>
   )
}
