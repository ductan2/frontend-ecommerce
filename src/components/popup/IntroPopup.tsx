
import { useState } from "react";
import Timer from "../../utils/Time";
import { Link } from "react-router-dom";
const IntroPopup = () => {
   const [openClass, setOpenClass] = useState(false);

   const handleRemove = () => {
      setOpenClass(!openClass);
   };
   const fixDate = new Date();
   return (
      <>
         <div
            className={
               openClass
                  ? "modal fade custom-modal d-none"
                  : "modal fade custom-modal  show d-block"
            }
         >
            <div className="modal-dialog">
               <div className="modal-content">
                  <button
                     type="button"
                     className="btn-close"
                     onClick={handleRemove}
                  ></button>
                  <div className="modal-body">
                     <div
                        className="deal"
                        style={{
                           backgroundImage:
                              "url('assets/imgs/banner/popup-1.png')",
                        }}
                     >
                        <div className="deal-top">
                           <h3 className="mb-10" >
                              Coupon: <span className="text-brand">DUCTAN</span>
                           </h3>
                           <h4>Deal of the day receive a $20 discount</h4>
                        </div>
                        <div className="deal-content  detail-info">
                           <h6 className="product-title">
                              <Link to="/shop">
                                 <div className="text-heading">
                                    Organic fruit for your family's
                                    health
                                 </div>
                              </Link>
                           </h6>
                           <div className="clearfix product-price-cover">
                              <div className="product-price primary-color float-left">
                                 <span className="current-price text-brand">
                                    $32
                                 </span>
                                 <span>
                                    <span className="save-price font-md color3 ml-15">
                                       $20 discount
                                    </span>
                                    <span className="old-price font-md ml-15">
                                       $52
                                    </span>
                                 </span>
                              </div>
                           </div>
                        </div>
                        <div className="deal-bottom">
                           <p className="mb-20">Hurry Up! Offer End In:</p>
                           <Timer
                              endDateTime={fixDate.setDate(
                                 fixDate.getDate() + 100
                              )}
                           />
                           <div className="product-detail-rating">
                              <div className="product-rate-cover text-end">
                                 <div className="product-rate d-inline-block">
                                    <div className="product-rating" style={{ "width": "90%" }}></div>
                                 </div>
                                 <span className="font-small ml-5 text-muted"> (32 rates)</span>
                              </div>
                           </div>

                           <Link to="/shop">
                              <div className="btn hover-up">
                                 Shop Now{" "}
                                 <i className="fi-rs-arrow-right"></i>
                              </div>
                           </Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div
            className={
               openClass
                  ? "modal-backdrop fade d-none"
                  : "modal-backdrop fade show"
            }
         ></div>
      </>
   );
};

export default IntroPopup;
