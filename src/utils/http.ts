import axios, { type AxiosError, AxiosInstance } from "axios"
import { server_url } from "./dir";
import { toast } from "react-toastify";


class Http {
   instace: AxiosInstance
   constructor() {
      this.instace = axios.create({
         baseURL: server_url,
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
               if (data.message === "Token has expired" && data.status === 401 || data.message === "Token is valid") {
                  localStorage.removeItem("token")
               }
               toast.error(data.error)
            }
            return Promise.reject(error);
         }
      )
   }

}
const http = new Http().instace

export default http