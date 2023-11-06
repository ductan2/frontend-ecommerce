import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "../../store/store"
import ImageUpload from "../../components/imageUpload/ImageUpload"
import { deleteImage, uploadImage } from "../../features/uploads/uploadSlice"
import { getInfoUser, updateUser } from "../../features/user/userSlice"
import { toast } from "react-toastify"
import { useFormik } from "formik"
import { InputCustom } from "../../components/input/InputCustom"
import { UserUpdate } from "../../types/user"
import { useEffect } from "react"
import * as yup from "yup"
const updateSchema = yup.object().shape({
   firstname: yup.string()
      .min(2, "Firstname must be at least 2 characters")
      .max(25, "Firstname cannot be more than 25 characters  ")
      .optional(),
   lastname: yup.string()
      .min(2, "Lastname must be at least 2 characters")
      .max(25, "Lastname cannot be more than 25 characters")
      .optional(),
   mobile: yup.string().optional(),
   avatar: yup.string().optional()
})

const UpdateProfile = () => {
   const dispatch = useAppDispatch()
   const { user, errorResponse } = useSelector((state: RootState) => state.user)
   console.log("🚀 ~ file: UpdateProfile.tsx:28 ~ UpdateProfile ~ user:", user)
   const { data: dataUpload, isLoading: isLoadingImage } = useSelector((state: RootState) => state.upload)

   const formik = useFormik({
      initialValues: {
         firstname: user.firstname,
         lastname: user.lastname,
         mobile: user.mobile,
         avatar: user.avatar
      },
      validationSchema: updateSchema,
      onSubmit: (values) => {
         if (dataUpload.url) {
            values.avatar = dataUpload
         }
         dispatch(updateUser(values as UserUpdate)).then(() => {
            setTimeout(() => {
               dispatch(getInfoUser())
            })
         })
      }
   })

   const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files?.length > 1) {
         toast.error("Only one image can be uploaded at a time")
         return;
      }
      dispatch(uploadImage(e.target.files![0]))
   }
   const handleDeleteImage = (public_id: string) => {
      dispatch(deleteImage(public_id as string)).then(() => {
         setTimeout(() => {
            dispatch(getInfoUser())
         }, 500)
      });

   };
   useEffect(() => {
      if (user._id) {
         formik.setValues({
            firstname: user.firstname,
            lastname: user.lastname,
            mobile: user.mobile,
            avatar: user.avatar
         })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [user._id])
   useEffect(() => {
      if (errorResponse) {

         errorResponse.forEach((error) => {
            formik.setFieldError(error.path as string, error.error)
         })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [errorResponse])
   return (
      <div className="tab-content account dashboard-content pl-50">
         <div className="tab-pane fade active show" id="account-detail" role="tabpanel" aria-labelledby="account-detail-tab">
            <div className="card">
               <div className="card-header">
                  <h5>Account </h5>
               </div>
               <div className="card-body">
                  <form onSubmit={(e) => {
                     e.preventDefault()
                     formik.submitForm()
                  }}>
                     <div className="row">
                        <div className="form-group col-md-12">
                           <label>Email <span className="required">*</span></label>
                           <input value={user.email}
                              disabled
                              className="form-control" name="email" type="text" />
                        </div>

                        <div className="col-lg-6">
                           <label>Firstname <span className="required">*</span></label>
                           <InputCustom name="firstname" type="text"
                              placeholder="Firstname"
                              defaultValue={user.firstname}
                              value={formik.values.firstname}
                              errorMessage={formik.touched.firstname && formik.errors.firstname}
                              onBlur={formik.handleBlur('firstname')}
                              onChange={formik.handleChange('firstname')} />
                        </div>
                        <div className="col-lg-6">
                           <label>Lastname <span className="required">*</span></label>
                           <InputCustom name="lastname" type="text"
                              defaultValue={user.lastname}
                              placeholder="Lastname"
                              value={formik.values.lastname}
                              errorMessage={formik.touched.lastname && formik.errors.lastname}
                              onBlur={formik.handleBlur('lastname')}
                              onChange={formik.handleChange('lastname')} />
                        </div>

                        <div className="form-group col-md-12">
                           <label>Mobile <span className="required">*</span></label>
                           <InputCustom name="mobile" type="text"
                              defaultValue={user.mobile}
                              placeholder="Mobile"
                              value={formik.values.mobile}
                              errorMessage={formik.touched.mobile && formik.errors.mobile}
                              onBlur={formik.handleBlur('mobile')}
                              onChange={formik.handleChange('mobile')} />
                        </div>
                        <div className="file-upload form-group col-md-12">
                           <label>Avatar </label>
                           <input className="form-control" type="file"
                              style={{ paddingTop: "20px" }}
                              onChange={(e) => handleUpload(e)} />
                           {dataUpload && dataUpload.public_id ? <>
                              <ImageUpload image={dataUpload.url} isLoadingImage={isLoadingImage}
                                 handleDeleteImage={() => handleDeleteImage(dataUpload.public_id)} />
                           </> : <>
                              <ImageUpload image={typeof user.avatar !== "string" && user.avatar?.url !== undefined
                                 ? user.avatar.url : undefined}
                                 handleDeleteImage={() => handleDeleteImage(typeof user.avatar !== "string" ? user.avatar!.public_id : "")} /></>}

                        </div>

                        <div className="col-md-12">
                           <button type="submit" className="btn btn-fill-out submit font-weight-bold" name="submit" value="Submit">Save Change</button>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>

   )
}

export default UpdateProfile