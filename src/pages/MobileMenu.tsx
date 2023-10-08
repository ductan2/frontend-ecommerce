import React, { useState, RefObject } from "react";
import { Link } from "react-router-dom"
import useClickOutside from "../hooks/useClickOutSide";

interface Props {
   isToggled: boolean;
   toggleClick: () => void;
}

export const MobileMenu: React.FC<Props> = ({ isToggled, toggleClick }: Props) => {
   const [isActive, setIsActive] = useState({
      status: false,
      key: 0,
   });
   const domNode: RefObject<HTMLUListElement> = useClickOutside(() => {
      setIsActive((prev) => {
         return {
            ...prev,
            status: false,
         }
      });
   });
   return (
      <>
         <div
            className={
               isToggled
                  ? "mobile-header-active mobile-header-wrapper-style sidebar-visible"
                  : "mobile-header-active mobile-header-wrapper-style"
            }
         >
            <div className="mobile-header-wrapper-inner">
               <div className="mobile-header-top">
                  <div className="mobile-header-logo">
                     <Link to="/">
                        <div>
                           <img
                              src="/assets/imgs/theme/logo.svg"
                              alt="logo"
                           />
                        </div>
                     </Link>
                  </div>
                  <div className="mobile-menu-close close-style-wrap close-style-position-inherit">
                     <button
                        className="close-style search-close"
                        onClick={toggleClick}
                     >
                        <i className="icon-top"></i>
                        <i className="icon-bottom"></i>
                     </button>
                  </div>
               </div>
               <div className="mobile-header-content-area">
                  <div className="mobile-search search-style-3 mobile-header-border">
                     <form action="#">
                        <input
                           type="text"
                           placeholder="Search for items…"
                        />
                        <button type="submit">
                           <i className="fi-rs-search"></i>
                        </button>
                     </form>
                  </div>
                  <div className="mobile-menu-wrap mobile-header-border">
                     <div className="main-categori-wrap mobile-header-border">
                        <Link to="#">
                           <div className="categori-button-active-2">
                              <span className="fi-rs-apps"></span> Browse
                              Categories
                           </div>
                        </Link>
                        <div className="categori-dropdown-wrap categori-dropdown-active-small">
                           <ul>
                              <li>
                                 <Link to="/shop">
                                    <div>
                                       <i className="evara-font-dress"></i>
                                       Women's Clothing
                                    </div>
                                 </Link>
                              </li>
                              <li>
                                 <Link to="/shop">
                                    <div>
                                       <i className="evara-font-tshirt"></i>
                                       Men's Clothing
                                    </div>
                                 </Link>
                              </li>
                              <li>
                                 {" "}
                                 <Link to="/shop">
                                    <div>
                                       <i className="evara-font-smartphone"></i>{" "}
                                       Cellphones
                                    </div>
                                 </Link>
                              </li>
                              <li>
                                 <Link to="/shop">
                                    <div>
                                       <i className="evara-font-desktop"></i>
                                       Computer & Office
                                    </div>
                                 </Link>
                              </li>
                              <li>
                                 <Link to="/shop">
                                    <div>
                                       <i className="evara-font-cpu"></i>
                                       Consumer Electronics
                                    </div>
                                 </Link>
                              </li>
                              <li>
                                 <Link to="/shop">
                                    <div>
                                       <i className="evara-font-home"></i>
                                       Home & Garden
                                    </div>
                                 </Link>
                              </li>
                              <li>
                                 <Link to="/shop">
                                    <div>
                                       <i className="evara-font-high-heels"></i>
                                       Shoes
                                    </div>
                                 </Link>
                              </li>
                              <li>
                                 <Link to="/shop">
                                    <div>
                                       <i className="evara-font-teddy-bear"></i>
                                       Mother & Kids
                                    </div>
                                 </Link>
                              </li>
                              <li>
                                 <Link to="/shop">
                                    <div>
                                       <i className="evara-font-kite"></i>
                                       Outdoor fun
                                    </div>
                                 </Link>
                              </li>
                           </ul>
                        </div>
                     </div>

                     <nav>
                        <ul className="mobile-menu" ref={domNode}>
                           <li
                              className={
                                 isActive.key == 1
                                    ? "menu-item-has-children active"
                                    : "menu-item-has-children"
                              }
                           >

                              <Link to="/index">
                                 <div>Home</div>
                              </Link>
                           </li>
                           <li
                              className={
                                 isActive.key == 2
                                    ? "menu-item-has-children active"
                                    : "menu-item-has-children"
                              }
                           >
                              <Link to="/shop">
                                 <div>shop</div>
                              </Link>

                           </li>

                           <li
                              className={
                                 isActive.key == 3
                                    ? "menu-item-has-children active"
                                    : "menu-item-has-children"
                              }
                           >
                              <Link to="/blog">
                                 <div>Blog</div>
                              </Link>
                           </li>

                           <li
                              className={
                                 isActive.key == 4
                                    ? "menu-item-has-children active"
                                    : "menu-item-has-children"
                              }
                           >
                              <Link to="/about">
                                 <div>About</div>
                              </Link>
                           </li>
                        </ul>
                     </nav>
                  </div>
                  <div className="mobile-header-info-wrap mobile-header-border">
                     <div className="single-mobile-header-info">
                        <Link to="/page-login-register">
                           <div>Log In / Sign Up </div>
                        </Link>
                     </div>
                     <div className="single-mobile-header-info">
                        <Link to="#">
                           <div>0397184208 </div>
                        </Link>
                     </div>
                  </div>
                  <div className="mobile-social-icon">
                     <h5 className="mb-15 text-grey-4">Follow Us</h5>
                     <Link to="#">
                        <div>
                           <img
                              src="/assets/imgs/theme/icons/icon-facebook.svg"
                              alt=""
                           />
                        </div>
                     </Link>
                     <Link to="#">
                        <div>
                           <img
                              src="/assets/imgs/theme/icons/icon-twitter.svg"
                              alt=""
                           />
                        </div>
                     </Link>
                     <Link to="#">
                        <div>
                           <img
                              src="/assets/imgs/theme/icons/icon-instagram.svg"
                              alt=""
                           />
                        </div>
                     </Link>
                     <Link to="#">
                        <div>
                           <img
                              src="/assets/imgs/theme/icons/icon-youtube.svg"
                              alt=""
                           />
                        </div>
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}
