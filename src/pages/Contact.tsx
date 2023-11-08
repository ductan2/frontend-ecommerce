import { useFormik } from "formik"
import { RootState, useAppDispatch } from "../store/store"
import { ContactType } from "../types/contact"
import * as yup from "yup"
import { InputCustom } from "../components/input/InputCustom"
import { createContact } from "../features/contact/contactSlice"
import { useSelector } from "react-redux"
import { Loading } from "../components/loading/Loading"
import { useEffect } from "react"
const contactSchema = yup.object().shape({
   email: yup.string().email("Invalid email").required("Email is required"),
   name: yup.string().required("Name is required"),
   subject: yup.string().required("Subject is required"),
   message: yup.string().required("Message is required"),
   phone: yup.string().required("Phone is required"),
})
const Contact = () => {

   const dispatch = useAppDispatch()

   const formik = useFormik<ContactType>({
      initialValues: {
         email: "",
         message: "",
         name: "",
         subject: "",
         phone: "",
      },
      validationSchema: contactSchema,
      onSubmit: (values) => {
         dispatch(createContact(values)).then(() => {
            formik.resetForm()
         })
      }
   })
   useEffect(() => {
      window.scrollTo(0, 0)
   }, [])
   const { isLoading } = useSelector((state: RootState) => state.contact)

   return (
      <>
         <main className="main pages">

            <div className="page-content pt-50">
               <div className="container">
                  <div className="row">
                     <div className="col-xl-10 col-lg-12 m-auto">
                        <section className="row align-items-end mb-50">
                           <div className="col-lg-4 mb-lg-0 mb-md-5 mb-sm-5">
                              <h4 className="mb-20 text-brand">How can help you ?</h4>
                              <h1 className="mb-30">Let us know how we can help you</h1>
                              <p className="mb-20">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                           </div>
                           <div className="col-lg-8">
                              <div className="row">
                                 <div className="col-lg-6 mb-4">
                                    <h5 className="mb-20">01. Visit Feedback</h5>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                                 </div>
                                 <div className="col-lg-6 mb-4">
                                    <h5 className="mb-20">02. Employer Services</h5>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                                 </div>
                                 <div className="col-lg-6 mb-lg-0 mb-4">
                                    <h5 className="mb-20 text-brand">03. Billing Inquiries</h5>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                                 </div>
                                 <div className="col-lg-6">
                                    <h5 className="mb-20">04.General Inquiries</h5>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                                 </div>
                              </div>
                           </div>
                        </section>
                     </div>
                  </div>
               </div>
               <div className="container">
                  <div className="row">
                     <div className="col-xl-10 col-lg-12 m-auto">
                        <section className="mb-50">

                           <div className="row">
                              <div className="col-xl-8">
                                 <div className="contact-from-area padding-20-row-col">
                                    <h5 className="text-brand mb-10">Contact form</h5>
                                    <h2 className="mb-10">Drop Us a Line</h2>
                                    <p className="text-muted mb-30 font-sm">Your email address will not be published. Required fields are marked *</p>
                                    <form onSubmit={formik.handleSubmit} className="contact-form-style mt-30" id="contact-form">
                                       <div className="row">
                                          <div className="col-lg-6 col-md-6">
                                             <InputCustom name="name" type="text"
                                                placeholder="Name"
                                                value={formik.values.name}
                                                errorMessage={formik.touched.name && formik.errors.name}
                                                onBlur={formik.handleBlur('name')}
                                                onChange={formik.handleChange('name')} />
                                          </div>
                                          <div className="col-lg-6 col-md-6">
                                             <InputCustom name="email" type="text"
                                                placeholder="Email"
                                                value={formik.values.email}
                                                errorMessage={formik.touched.email && formik.errors.email}
                                                onBlur={formik.handleBlur('email')}
                                                onChange={formik.handleChange('email')} />
                                          </div>
                                          <div className="col-lg-6 col-md-6">
                                             <InputCustom name="phone" type="text"
                                                placeholder="Phone"
                                                value={formik.values.phone}
                                                errorMessage={formik.touched.phone && formik.errors.phone}
                                                onBlur={formik.handleBlur('phone')}
                                                onChange={formik.handleChange('phone')} />
                                          </div>
                                          <div className="col-lg-6 col-md-6">
                                             <InputCustom name="subject" type="text"
                                                placeholder="Subject"
                                                value={formik.values.subject}
                                                errorMessage={formik.touched.subject && formik.errors.subject}
                                                onBlur={formik.handleBlur('subject')}
                                                onChange={formik.handleChange('subject')} />
                                          </div>
                                          <div className="col-lg-12 col-md-12">
                                             <div className="textarea-style mb-30">
                                                <textarea value={formik.values.message}
                                                   name="message" placeholder="Message" onBlur={formik.handleBlur('message')}
                                                   onChange={formik.handleChange('message')} />
                                                {formik.touched.message && formik.errors.message && <span className="text-danger">{formik.touched.message && formik.errors.message}</span>}
                                             </div>
                                             <button className="submit submit-auto-width" type="submit">{
                                                isLoading ? <Loading /> : "Send message"
                                             }</button>
                                          </div>
                                       </div>
                                    </form>
                                    <p className="form-messege" />
                                 </div>
                              </div>
                              <div className="col-lg-4 pl-50 d-lg-block d-none">
                                 <img className="border-radius-15 mt-50" src="assets/imgs/page/contact-2.png" />
                              </div>
                           </div>
                        </section>
                     </div>
                  </div>
               </div>
            </div>
         </main>

      </>
   )
}

export default Contact