import { useFormik } from "formik"
import { Link } from "react-router-dom"
import * as yup from "yup"
import { UserRegister } from "../types/user"
import { InputCustom } from "../components/input/InputCustom"
import { RootState, useAppDispatch } from "../store/store"
import { registerUser } from "../features/user/userSlice"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { Loading } from "../components/loading/Loading"

const signupSchema = yup.object().shape({
   firstname: yup.string().required("First name is required"),
   lastname: yup.string().required("Last name is required"),
   email: yup.string().email("Invalid email").required("Email is required"),
   password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
   confirmPassword: yup.string().required("Confirm password is required").oneOf([yup.ref("password")], "Passwords must match"),
   mobile: yup.string().required("Mobile is required"),
})

export const Register = () => {
   const dispatch = useAppDispatch()
   const formik = useFormik<UserRegister>({
      initialValues: {
         firstname: "",
         lastname: "",
         email: "",
         password: "",
         confirmPassword: "",
         mobile: "",
      },
      validationSchema: signupSchema,
      onSubmit: (values) => {
         setTimeout(() => {
            dispatch(registerUser(values))
            formik.resetForm()
         }, 500)
      }
   })
   const { errorResponse, isLoading } = useSelector((state: RootState) => state.user)
   useEffect(() => {
      if (errorResponse) {
         errorResponse.forEach((error) => {
            formik.setFieldError(error.path as string, error.error)
         })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [errorResponse])


   return (
      <>
         <main className="main pages">
            <div className="page-content pt-150 pb-150">
               <div className="container">
                  <div className="row">
                     <div className="col-xl-8 col-lg-10 col-md-12 m-auto">
                        <div className="row">
                           <div className="col-lg-6 col-md-8">
                              <div className="login_wrap widget-taber-content background-white">
                                 <div className="padding_eight_all bg-white">
                                    <div className="heading_s1">
                                       <h1 className="mb-5">Create an Account</h1>
                                       <p className="mb-30">Already have an account? <Link to="/login">Login</Link></p>
                                    </div>
                                    <form action="" onSubmit={formik.handleSubmit}>
                                       <InputCustom name="firstname" type="text"
                                          placeholder="First name"
                                          value={formik.values.firstname}
                                          errorMessage={formik.touched.firstname && formik.errors.firstname}
                                          onBlur={formik.handleBlur('firstname')}
                                          onChange={formik.handleChange('firstname')} />
                                       <InputCustom name="lastname" type="text"
                                          placeholder="Last name"
                                          value={formik.values.lastname}
                                          errorMessage={formik.touched.lastname && formik.errors.lastname}
                                          onBlur={formik.handleBlur('lastname')}
                                          onChange={formik.handleChange('lastname')} />
                                       <InputCustom name="mobile" type="text"
                                          placeholder="Phone number"
                                          value={formik.values.mobile}
                                          errorMessage={formik.touched.mobile && formik.errors.mobile}
                                          onBlur={formik.handleBlur('mobile')}
                                          onChange={formik.handleChange('mobile')} />
                                       <InputCustom name="email" type="text"
                                          placeholder="Email"
                                          value={formik.values.email}
                                          errorMessage={formik.touched.email && formik.errors.email}
                                          onBlur={formik.handleBlur('email')}
                                          onChange={formik.handleChange('email')} />
                                       <InputCustom name="password" type="password"
                                          placeholder="Password"
                                          value={formik.values.password}
                                          errorMessage={formik.touched.password && formik.errors.password}
                                          onBlur={formik.handleBlur('password')}
                                          onChange={formik.handleChange('password')} />
                                       <InputCustom name="confirmPassword" type="password"
                                          placeholder="Confirm password"
                                          value={formik.values.confirmPassword}
                                          errorMessage={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                          onBlur={formik.handleBlur('confirmPassword')}
                                          onChange={formik.handleChange('confirmPassword')} />
                                       <div className="form-group mb-30">
                                          <button type="submit" className="btn btn-fill-out btn-block hover-up font-weight-bold px-5 py-3 w-full" >{!isLoading ? "Register" : <Loading />}</button>
                                       </div>
                                       <p className="font-xs text-muted"><strong>Note:</strong>Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy</p>
                                    </form>
                                 </div>
                              </div>
                           </div>
                           <div className="col-lg-6 pr-30 d-none d-lg-block">
                              <div className="card-login mt-115">
                                 <a href="#" className="social-login facebook-login">
                                    <img src="assets/imgs/theme/icons/logo-facebook.svg" alt="" />
                                    <span>Continue with Facebook</span>
                                 </a>
                                 <a href="#" className="social-login google-login">
                                    <img src="assets/imgs/theme/icons/logo-google.svg" alt="" />
                                    <span>Continue with Google</span>
                                 </a>
                              </div>
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
