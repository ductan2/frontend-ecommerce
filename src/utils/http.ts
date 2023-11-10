import axios, { type AxiosError, AxiosInstance } from "axios"
import { toast } from "react-toastify";


class Http {
   instace: AxiosInstance
   constructor() {
      this.instace = axios.create({
         baseURL: import.meta.env.VITE_URL_API,
         timeout: 10000,
         headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
         }
      })
      // handle response from server
      this.instace.interceptors.response.use(
         function (response) {
            return response;
         },
         function (error: AxiosError) {
            if (error.response?.status !== 422) {


               // eslint-disable-next-line @typescript-eslint/no-explicit-any
               const data = error.response?.data as object | null | any | string
               if (data.message === "Token has expired" && data.status === 401) {
                  localStorage.removeItem("token")
               }
               if (data.message !== "Token is invalid" && data.message || data.error) {
                  toast.error(data.message || data.error || "Something went wrong")
                  return;
               }

            }
            return Promise.reject(error);
         }
      )
   }

}
const http = new Http().instace

export default http