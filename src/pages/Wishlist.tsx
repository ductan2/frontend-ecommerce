import { useEffect } from "react"
import { RootState, useAppDispatch } from "../store/store"
import { getWishList } from "../features/user/userSlice"
import { useSelector } from "react-redux"
import { Loading } from "../components/loading/Loading"
import { removeToWishList } from "../features/product/productSlice"
import { Link } from "react-router-dom"




export const Wishlist = () => {

   const dispatch = useAppDispatch()
   const { wishlist, isLoading } = useSelector((state: RootState) => state.user)
   
   useEffect(() => {
      dispatch(getWishList())
   }, [dispatch])

   const removeToWish = (id: string) => {
      dispatch(removeToWishList(id))
      setTimeout(() => {
         dispatch(getWishList())
      }, 200);
   }
   if (isLoading) return <Loading />
   return (
      <>
         <main className="main">
            <div className="page-header breadcrumb-wrap">
               <div className="container">
                  <div className="breadcrumb">
                     <a href="index.html" rel="nofollow"><i className="fi-rs-home mr-5"></i>Home</a>
                     <span></span> Shop <span></span> Fillter
                  </div>
               </div>
            </div>
            <div className="container mb-30 mt-50">
               <div className="row">
                  <div className="col-xl-10 col-lg-12 m-auto">
                     <div className="mb-50">
                        <h1 className="heading-2 mb-10">Your Wishlist</h1>
                        <h6 className="text-body">There are <span className="text-brand">{wishlist.length}</span> products in this list</h6>
                     </div>
                     <div className="table-responsive shopping-summery">
                        <table className="table table-wishlist">
                           <thead>
                              <tr className="main-heading">
                                 <th className="custome-checkbox start pl-30">
                                    <input className="form-check-input" type="checkbox" name="checkbox" id="exampleCheckbox11" value="" />
                                    <label className="form-check-label"></label>
                                 </th>
                                 <th scope="col" colSpan={2}>Product</th>
                                 <th scope="col">Price</th>
                                 <th scope="col">Stock Status</th>
                                 <th scope="col">Action</th>
                                 <th scope="col" className="end">Remove</th>
                              </tr>
                           </thead>
                           <tbody className="pt-30">
                              {wishlist.map((item) => (
                                 <tr >
                                    <td className="custome-checkbox pl-30">
                                       <input className="form-check-input" type="checkbox" name="checkbox" id="exampleCheckbox1" value="" />
                                       <label className="form-check-label" ></label>
                                    </td>
                                    <td className="image product-thumbnail pt-40"><img src={item.images[0].url} alt="#" /></td>
                                    <td className="product-des product-name">
                                       <h6><Link to={`/product/${item._id}`} className="product-name mb-10" >{item.title}</Link></h6>
                                       <div className="product-rate-cover">
                                          <div className="product-rate d-inline-block">
                                             <div className="product-rating" style={{ width: "90%" }}></div>
                                          </div>
                                          <span className="font-small ml-5 text-muted"> ({item.rating_distribution})</span>
                                       </div>
                                    </td>
                                    <td className="price" data-title="Price">
                                       <h3 className="text-brand">${item.price}</h3>
                                    </td>

                                    {item.quantity > 0 ? <>
                                       <td className="text-center detail-info" data-title="Stock">
                                          <span className="stock-status in-stock mb-0"> In Stock </span>
                                       </td>
                                       <td className="text-right" data-title="Cart">
                                          <button className="btn btn-sm">Add to cart</button>
                                       </td></> : <>
                                       <td className="text-center detail-info" data-title="Stock">
                                          <span className="stock-status out-stock mb-0"> Out Stock </span>
                                       </td>
                                       <td className="text-right" data-title="Cart">
                                          <button className="btn btn-sm btn-secondary">Contact Us</button>
                                       </td>
                                    </>}
                                    <td className="action text-center" data-title="Remove" >
                                       <div className="text-body cursor-pointer" onClick={() => removeToWish(item._id)}><i className="fi-rs-trash"></i></div>
                                    </td>
                                 </tr>
                              ))}

                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            </div>
         </main>
      </>
   )
}
