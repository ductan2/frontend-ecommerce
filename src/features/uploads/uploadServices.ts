
import http from "../../utils/http";



// eslint-disable-next-line @typescript-eslint/no-explicit-any
const uploadImageServices = async (data: any) => {
  return http.post(`/uploads`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
};
const deleteImage = async (id: string) => {
  return http.delete(`/uploads/delete-image/${id}`)
};
const uploadServices = {
  uploadImageServices,
  deleteImage

}
export default uploadServices;