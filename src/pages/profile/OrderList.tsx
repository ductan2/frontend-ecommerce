import { useEffect } from "react"
import { RootState, useAppDispatch } from "../../store/store"
import { getOrder } from "../../features/orders/orderSlice"
import { useSelector } from "react-redux"
import { Loading } from "../../components/loading/Loading"
import dayjs from "dayjs"
const OrderList = () => {
   const dispatch = useAppDispatch()

   const { data, isLoading } = useSelector((state: RootState) => state.order)
   console.log("🚀 ~ file: OrderList.tsx:11 ~ OrderList ~ data:", data)
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
                                 <a href="#" className="btn-small d-block">View</a>
                              
                              </td>
                           </tr>
                        })}

                     </tbody>
                  </table>
               </div>
            </div>
         </div>



      </>
   )
}

export default OrderList