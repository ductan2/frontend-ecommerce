import { useState } from "react"
import { useAppDispatch } from "../store/store"
import { forgotPassword } from "../features/user/userSlice"

const ForgotPassword = () => {

   const [email, setEmail] = useState('')
   const dispatch = useAppDispatch()

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      dispatch(forgotPassword(email))
   }

   return (
      <main className="main pages">

         <div className="page-content pt-150 pb-150">
            <div className="container">
               <div className="row">
                  <div className="col-xl-4 col-lg-6 col-md-12 m-auto">
                     <div className="login_wrap widget-taber-content background-white">
                        <div className="padding_eight_all bg-white">
                           <div className="heading_s1">
                              <img className="border-radius-15" src="assets/imgs/page/forgot_password.svg" />
                              <h2 className="mb-15 mt-15">Forgot your password?</h2>
                              <p className="mb-30">Not to worry, we got you! Let’s get you a new password. Please enter your email address or your Username.</p>
                           </div>
                           <form onSubmit={handleSubmit}>
                              <div className="form-group">
                                 <input type="text" onChange={(e) => setEmail(e.target.value)}
                                    required name="email" placeholder="Your Email *" />
                              </div>
                              <div className="form-group">
                                 <button type="submit" className="btn btn-heading btn-block hover-up" name="login">Reset password</button>
                              </div>
                           </form>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </main>

   )
}

export default ForgotPassword