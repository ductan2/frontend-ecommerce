import { useEffect, useState } from "react"
import { RootState, useAppDispatch } from "../../store/store"
import { getOrder, getOrderById } from "../../features/orders/orderSlice"
import { useSelector } from "react-redux"
import { Loading } from "../../components/loading/Loading"
import dayjs from "dayjs"
import ModalCustom from "../../components/modal/ModalCustom"
import { Link } from "react-router-dom"
const OrderList = () => {
   const dispatch = useAppDispatch()
   const [openModal, setOpenModal] = useState(false)
   const { data, isLoading, dataUpdate } = useSelector((state: RootState) => state.order)

   useEffect(() => {
      dispatch(getOrder())
   }, [dispatch])
   if (isLoading) return <Loading isFull />
   return (
      <>
         <div className="tab-content account dashboard-content pl-50">

            <div className="tab-pane fade active show" id="orders" role="tabpanel" aria-labelledby="orders-tab">

               <div className="card-header text-center">
                  <h3 className="mb-0">Your Orders</h3>
               </div>

               <div className="table-responsive">
                  <table className="table">
                     <thead>
                        <tr>
                           <th>Order</th>
                           <th>Date</th>
                           <th>Status</th>
                           <th>Total</th>
                           <th>Actions</th>
                        </tr>
                     </thead>
                     <tbody>
                        {data.length > 0 && data.map((item) => {
                           return <tr key={item._id}>
                              <td>#{item._id}</td>
                              <td>{dayjs(item.updated_at).format('HH:hh DD/MM/YYYY')}</td>
                              <td>{item.order_status}</td>
                              <td>${item.payment_intent.amount} for {item.products.length} item</td>
                              <td>
                                 <div onClick={() => {
                                    dispatch(getOrderById(item._id)).then(() => {
                                       setTimeout(() => {
                                          setOpenModal(true)
                                       }, 300)
                                    })

                                 }}
                                    className="btn-small text-success hover-text-success ">View</div>
                              </td>
                           </tr>
                        })}

                     </tbody>
                  </table>
               </div>
            </div>
         </div >
         <ModalCustom openModal={openModal} setOpenModal={setOpenModal}>
            {dataUpdate?._id && (
               <div>
                  <h1 className="text-center">Order details</h1>
                  {dataUpdate.products.map(({ product, count, color, price }) => {
                     return <div className="col-lg-4 col-md-6 col-12 col-sm-6" >
                        <div className="product-cart-wrap mb-30">
                           <div className="product-img-action-wrap">
                              <div className="product-img product-img-zoom">
                                 <Link to={`/shop/product/${product?._id}`}>
                                    <img className="default-img" src={product?.images[0].url} alt={product.title} />
                                    {product?.images[1] && product?.images[1].url ?
                                       <img className="hover-img" src={product?.images[1].url} alt={product.title + "2"} /> : null}
                                 </Link>
                              </div>
                           </div>
                        </div>
                        <div className="product-content-wrap">
                           <p><Link to={`/shop/product/${product._id}`}>{product.title.length > 40 ? product.title.substring(0, 40) + "..." : product.title}</Link></p>
                           <div>
                           </div>
                           <div className="product-card-bottom">
                              <div className="product-price d-flex justify-content-between">
                                 <span>${product.price} / 1 product</span>
                                 <span>Quantity:{count}</span>
                              </div>
                              <div>
                                 <span className="font-small text-muted">Color:<a href="#">{color}</a></span>
                              </div>
                           </div>
                           <h5>Total: <span className="text-success">${price}</span></h5>
                        </div>
                     </div>
                  })}
               </div>
            )}
         </ModalCustom >


      </>
   )
}

export default OrderList