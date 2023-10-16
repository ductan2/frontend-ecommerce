import axios, { type AxiosError, AxiosInstance } from "axios"
import { server_url } from "./dir";
import Swal from "sweetalert2";

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
               console.log(error.response?.status)


               // eslint-disable-next-line @typescript-eslint/no-explicit-any
               const data = error.response?.data as object | null | any | string
               console.log("🚀 ~ file: http.ts:29 ~ Http ~ constructor ~ data:", data)
               if (data.message === "Token is invalid" && data.status === 401) {
                  //create alert yes or no to login
                  Swal.fire({
                     title: 'Login',
                     text: 'You need to log in to perform the operation!',
                     icon: 'question',
                     showCancelButton: true,
                     confirmButtonColor: '#3085d6',
                     cancelButtonColor: '#d33',
                     confirmButtonText: 'OK',
                  }).then((result) => {
                     if (result.isConfirmed) {
                        localStorage.removeItem("token")
                        window.location.href = "/login"
                     }
                  });
               }
            }
            return Promise.reject(error);
         }
      )
   }

}
const http = new Http().instace

export default http