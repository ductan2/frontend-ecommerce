import { Link, useNavigate } from "react-router-dom"
import { RootState, useAppDispatch } from "../store/store"
import { UserLogin } from "../types/user"
import { useFormik } from "formik"
import * as yup from "yup"
import { loginUser } from "../features/user/userSlice"
import { InputCustom } from "../components/input/InputCustom"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Loading } from "../components/loading/Loading"
const loginShema = yup.object().shape({
   email: yup.string().email("Invalid email").required("Email is required"),
   password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
})
export const Login = () => {
   const dispatch = useAppDispatch()
   const navigate = useNavigate()
   const formik = useFormik<UserLogin>({
      initialValues: {
         email: "",
         password: "",
      },
      validationSchema: loginShema,
      onSubmit: (values) => {
         setTimeout(() => {
            dispatch(loginUser(values))
            navigate('/')
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
                           <div className="col-lg-6 pr-30 d-none d-lg-block">
                              <img className="border-radius-15" src="assets/imgs/page/login-1.png" alt="" />
                           </div>
                           <div className="col-lg-6 col-md-8">
                              <div className="login_wrap widget-taber-content background-white">
                                 <div className="padding_eight_all bg-white">
                                    <div className="heading_s1">
                                       <h1 className="mb-5">Login</h1>
                                       <p className="mb-30">Don't have an account? <Link to="/register">Create here</Link></p>
                                    </div>
                                    <form method="POST" onSubmit={formik.handleSubmit}>
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
                                       <div className="login_footer form-group mb-50">
                                          <div className="chek-form">
                                             <div className="custome-checkbox">
                                                <input className="form-check-input" type="checkbox" name="checkbox" id="exampleCheckbox1" value="" />
                                                <label className="form-check-label" htmlFor="exampleCheckbox1"><span>Remember me</span></label>
                                             </div>
                                          </div>
                                          <a className="text-muted" href="#">Forgot password?</a>
                                       </div>
                                       <div className="form-group">
                                          <button type="submit" className="btn btn-heading btn-block hover-up w-full" name="login">
                                             {!isLoading ? "Login" : <Loading />}
                                          </button>
                                       </div>
                                    </form>
                                 </div>
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
