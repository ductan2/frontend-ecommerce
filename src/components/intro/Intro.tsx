import SwiperCore from "swiper";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "swiper/css/effect-fade";
SwiperCore.use([Navigation, Pagination, EffectFade]);

const Intro = () => {
   return (
      <>
         <Swiper
            slidesPerView={1}
            spaceBetween={0}
            loop={true}
            effect={"fade"}
            fadeEffect={{
               crossFade: true,
            }}

            pagination={{
               clickable: true,
            }}
            navigation={{
               prevEl: ".custom_prev_i3",
               nextEl: ".custom_next_i3",
            }}
            className="hero-slider-1 style-4 dot-style-1 dot-style-1-position-1"
         >
            <SwiperSlide>
               <div
                  className="single-hero-slider rectangle single-animation-wrap"
                  style={{
                     backgroundImage:
                        "url(assets/imgs/slider/slider-5.png)",
                        backgroundSize:"cover"
                  }}
               >
                  <div className="slider-content">
                     <h1 className="display-2 mb-40">
                        Don’t miss
                        <br />
                        amazing deals
                     </h1>
                     <p className="mb-20">
                        Sign up for the daily newsletter
                     </p>
                  </div>
               </div>
            </SwiperSlide>
            <SwiperSlide>
               <div
                  className="single-hero-slider rectangle single-animation-wrap"
                  style={{
                     backgroundImage:
                        "url(assets/imgs/slider/slider-6.png)",
                  }}
               >
                  <div className="slider-content">
                     <h1 className="display-2 mb-40">
                        Fresh Vegetables
                        <br />
                        Big discount
                     </h1>
                     <p className="mb-65">
                        Save up to 50% off on your first order
                     </p>
              
                  </div>
               </div>
            </SwiperSlide>
         </Swiper>

         <div className="slider-arrow hero-slider-1-arrow">
            <span className="slider-btn slider-prev slick-arrow custom_prev_i3">
               <i className="fi-rs-angle-left"></i>
            </span>
            <span className="slider-btn slider-next slick-arrow custom_next_i3">
               <i className="fi-rs-angle-right"></i>
            </span>
         </div>
      </>
   );
};

export default Intro;
