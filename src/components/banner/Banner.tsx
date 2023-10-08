import { Link } from "react-router-dom"
import IntroPopup from "../popup/IntroPopup"
import Intro from "../intro/Intro"
import Childbanner from "./ChildBanner"
// import { PopularProduct } from "../products/PopularProduct"


export const Banner = () => {
   return (
      <>
         <IntroPopup />
         <div>
            <section className="home-slider style-2 position-relative">
               <div className="container">
                  <div className="row md-w-100vw">
                     <div className="col-xl-8 col-lg-12">
                        <div className="home-slide-cover">
                           <Intro />
                        </div>
                     </div>

                     <div className="col-lg-4 d-none d-xl-block">
                        <div className="banner-img style-3 animated animated">
                           <div className="banner-text mt-50">
                              <h2 className="mb-50">
                                 Delivered <br />
                                 to
                                 <span className="text-brand">
                                    your
                                    <br />
                                    home
                                 </span>
                              </h2>
                              <Link to="/shop">
                                 <div className="btn btn-xs">
                                    Shop Now{" "}
                                    <i className="fi-rs-arrow-small-right"></i>
                                 </div>
                              </Link>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>

            <section className="banners mb-15">
               <div className="container">
                  <div className="row">
                     <Childbanner />
                  </div>
               </div>
            </section>

           



            {/* <Bottom /> */}
         </div>
      </>
   )
}
