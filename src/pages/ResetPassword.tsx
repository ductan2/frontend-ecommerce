import { useNavigate, useParams } from "react-router-dom"
import logo from "../../public/assets/imgs/page/reset_password.svg"
import { RootState, useAppDispatch } from "../store/store";
import { useFormik } from "formik";
import * as yup from "yup"
import { InputCustom } from "../components/input/InputCustom";
import { resetPassword } from "../features/user/userSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Loading } from "../components/loading/Loading";
const resetPasswordShema = yup.object().shape({
   password: yup.string().required("Password is required")
      .min(8, "Password must be at least 8 characters"),
   confirmPassword: yup.string().required("Confirm password is required").oneOf([yup.ref("password")], "Passwords must match")
})
const ResetPassword = () => {

   const dispatch = useAppDispatch();
   const { token } = useParams<{ token: string }>();
   const navigate = useNavigate();

   const formik = useFormik<{ password: string, confirmPassword: string }>({
      initialValues: {
         password: "",
         confirmPassword: ""
      },
      validationSchema: resetPasswordShema,
      onSubmit: (values) => {
         dispatch(resetPassword({ password: values.password,confirmPassword:values.confirmPassword, token: token as string }))
      }
   })
   const { errorResponse, isLoading, user } = useSelector((state: RootState) => state.user)

   useEffect(() => {
      if (errorResponse) {

         errorResponse.forEach((error) => {
            formik.setFieldError(error.path as string, error.error)
         })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [errorResponse])

   if (!token || user && user._id) {
      navigate("/")
      return;
   }
   return (
      <>
         <main className="main pages">

            <div className="page-content pt-150 pb-150">
               <div className="container">
                  <div className="row">
                     <div className="col-xl-6 col-lg-8 col-md-12 m-auto">
                        <div className="row">
                           <div className="heading_s1">
                              <img className="border-radius-15" src={logo} />
                              <h2 className="mb-15 mt-15">Set new password</h2>
                              <p className="mb-30">Please create a new password that you don’t use on any other site.</p>
                           </div>
                           <div className="col-lg-6 col-md-8">
                              <div className="login_wrap widget-taber-content background-white">
                                 <div className="padding_eight_all bg-white">
                                    <form onSubmit={formik.handleSubmit}>
                                       <InputCustom name="password" type="password"
                                          placeholder="Enter your password"
                                          value={formik.values.password}
                                          errorMessage={formik.touched.password && formik.errors.password}
                                          onBlur={formik.handleBlur('password')}
                                          onChange={formik.handleChange('password')} />
                                       <InputCustom name="confirmPassword" type="password"
                                          placeholder="Enter your password again"
                                          value={formik.values.confirmPassword}
                                          errorMessage={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                          onBlur={formik.handleBlur('confirmPassword')}
                                          onChange={formik.handleChange('confirmPassword')} />
                                       <div className="form-group">
                                          <button type="submit" className="btn btn-heading btn-block hover-up" name="login">
                                             {!isLoading ? "Reset password" : <Loading />}
                                          </button>
                                       </div>
                                    </form>
                                 </div>
                              </div>
                           </div>
                           <div className="col-lg-6 pl-50">
                              <h6 className="mb-15">Password must:</h6>
                              <p>Be between 6 and 50 characters</p>
                              <p>Include at least  of the following:</p>
                              <ol className="list-insider">
                                 <li>An uppercase character</li>
                                 <li>A lowercase character</li>
                                 <li>A number</li>
                              </ol>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </main>

      </>
   )
}

export default ResetPassword