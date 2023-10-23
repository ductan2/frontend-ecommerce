
import http from "../../utils/http";



const getConfig = async () => {
   return http.get(`/payment/config`)
}

const paymentService = {
   getConfig
}
export default paymentService;