
import { auth } from "../../utils/auth";
import http from "../../utils/http";


const createContact = async (body: { name: string, email: string, subject: string, message: string }) => {
   return http.post(`/contact`, body, auth)
}
const contactService = {
   createContact
}
export default contactService;