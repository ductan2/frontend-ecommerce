
import { auth } from "../../utils/auth";
import http from "../../utils/http";


 const getOrder = async () => {
   return http.get("/users/order/get-order", auth)
}
 const updateStatusOrderServices = async (id: string, status: string) => {
   return http.put(`/users/order/update-status-order/${id}`, { status }, auth)
}

const ordersServices = {
   getOrder,
   updateStatusOrderServices
}
export default ordersServices;