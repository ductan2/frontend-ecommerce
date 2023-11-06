import { Link, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import Search from "../search/Search";
import { RootState, useAppDispatch } from "../../store/store";
import { getInfoUser, logout } from "../../features/user/userSlice";
import { useSelector } from "react-redux";


interface Props {
   toggleClick: () => void;
   totalCartItems: number;
   totalWishlistItems: number;
}
export const Header = ({ toggleClick, totalCartItems, totalWishlistItems }: Props) => {
   const [isToggled, setToggled] = useState(false);
   const [scroll, setScroll] = useState(0);
   const dispatch = useAppDispatch();

   useEffect(() => {
      document.addEventListener("scroll", () => {
         const scrollCheck: number = (window.scrollY >= 100) ? 1 : 0;
         if (scrollCheck !== scroll) {
            setScroll(scrollCheck);
         }
      });
   });
   const location = useLocation(); // get slug
   const { user } = useSelector((state: RootState) => state.user)
   const token = localStorage.getItem("token");
   useEffect(() => {
      if (token) dispatch(getInfoUser())
   }, [dispatch, token])

   function checkActiveUrl(item: string) {
      return item === location.pathname;
   }
   const handleToggle = () => setToggled(!isToggled);
   return (
      <>
         <>
            <header className="header-area header-style-1 header-height-2">
               <div className="mobile-promotion">
                  <span>
                     Grand opening, <strong>up to 15%</strong> off all items.
                     Only <strong>3 days</strong> left
                  </span>
               </div>
               <div className="header-middle header-middle-ptb-1 d-none d-lg-block">
                  <div className="container">
                     <div className="header-wrap">
                        <div className="logo logo-width-1">
                           <Link to="/">
                              <div>
                                 <img
                                    src="/assets/imgs/theme/logo.svg"
                                    alt="logo"
                                 />
                              </div>
                           </Link>
                        </div>
                        <div className="header-right">
                           <div className="search-style-2">
                              <Search />
                           </div>
                           <div className="header-action-right mr-30">
                              <div className="header-action-2">

                                 <div className="header-action-icon-2">
                                    <Link to="/wishlist">
                                       <div>
                                          <img
                                             className="svgInject"
                                             alt="Evara"
                                             src="/assets/imgs/theme/icons/icon-heart.svg"
                                          />
                                          <span className="pro-count blue">
                                             {totalWishlistItems}
                                          </span>
                                       </div>
                                    </Link>
                                    <Link to="/wishlist">
                                       <span className="lable">
                                          Wishlist
                                       </span>
                                    </Link>
                                 </div>
                                 <div className="header-action-icon-2">
                                    <Link to="/cart">
                                       <div className="mini-cart-icon">
                                          <img
                                             alt="Evara"
                                             src="/assets/imgs/theme/icons/icon-cart.svg"
                                          />
                                          <span className="pro-count blue">
                                             {totalCartItems}
                                          </span>
                                       </div>
                                    </Link>
                                    <Link to="/cart">
                                       <div>
                                          <span className="lable">
                                             Cart
                                          </span>
                                       </div>
                                    </Link>
                                 </div>

                                 <div className="header-action-icon-2">
                                    <Link to="/page-account"><div>
                                       <img
                                          className="svgInject"
                                          alt="Nest"
                                          src="/assets/imgs/theme/icons/icon-user.svg"
                                       />
                                    </div>
                                    </Link>
                                    <Link to="/login">
                                       <div>
                                          <span className="lable ml-0">
                                             {user && user._id ? user.lastname + " " + user.firstname : (
                                                <span className="lable ml-0">Login</span>
                                             )}
                                          </span>
                                       </div>
                                    </Link>
                                    {user && user._id && <>
                                       <div className="cart-dropdown-wrap cart-dropdown-hm2 account-dropdown">
                                          <ul>
                                             <li>
                                                <Link to="/account">
                                                   <div>
                                                      <i className="fi fi-rs-user mr-10"></i>
                                                      My Account
                                                   </div>
                                                </Link>
                                             </li>
                                             <li>
                                                <Link to="/account/orders"><div>
                                                   <i className="fi fi-rs-location-alt mr-10"></i>
                                                   Order Tracking
                                                </div>
                                                </Link>
                                             </li>
                                             <li>
                                                <Link to="/account/address"><div>
                                                   <i className="fi fi-rs-marker mr-10"></i>
                                                   My address
                                                </div></Link>
                                             </li>
                                             <li>
                                                <div onClick={() => dispatch(logout())}>
                                                   <i className="fi fi-rs-sign-out mr-10"></i>
                                                   Sign out
                                                </div>
                                             </li>
                                          </ul>
                                       </div>
                                    </>}
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div
                  className={
                     scroll
                        ? "header-bottom header-bottom-bg-color sticky-bar stick"
                        : "header-bottom header-bottom-bg-color sticky-bar"
                  }
               >
                  <div className="container">
                     <div className="header-wrap header-space-between position-relative">
                        <div className="logo logo-width-1 d-block d-lg-none">
                           <Link to="/">
                              <div>
                                 <img
                                    src="/assets/imgs/theme/logo.svg"
                                    alt="logo"
                                 />
                              </div>
                           </Link>
                        </div>
                        <div className="header-nav d-none d-lg-flex">
                           <div className="main-categori-wrap d-none d-lg-block">
                              <div
                                 className="categories-button-active"
                                 onClick={handleToggle}
                              >
                                 <span className="fi-rs-apps"></span>
                                 <span className="et">Browse</span> All
                                 Categories
                                 <i className="fi-rs-angle-down"></i>
                              </div>

                              <div
                                 className={
                                    isToggled
                                       ? "categories-dropdown-wrap categories-dropdown-active-large font-heading open"
                                       : "categories-dropdown-wrap categories-dropdown-active-large font-heading"
                                 }
                              >
                                 <div
                                    className="more_slide_open"
                                    style={{ display: "block" }}
                                 >
                                    <div className="d-flex categori-dropdown-inner">
                                    </div>
                                 </div>
                                 <div className="more_categories">
                                    <span className="heading-sm-1">
                                       Feature is not yet fully implemented...
                                    </span>
                                 </div>
                              </div>
                           </div>
                           <div className="main-menu main-menu-padding-1 main-menu-lh-2 d-none d-lg-block  font-heading">
                              <nav>
                                 <ul className="list-item-header">
                                    <li className="hot-deals">
                                       <img
                                          src="/assets/imgs/theme/icons/icon-hot.svg"
                                          alt="hot deals"
                                       />
                                       <Link to="/shop"><div>
                                          Hot Deals
                                       </div>
                                       </Link>
                                    </li>
                                    <li className="nav-item">

                                       <Link to="/">
                                          {checkActiveUrl("/") ?
                                             <div className="active">Home</div> :
                                             <div>Home</div>
                                          }
                                       </Link>
                                    </li>
                                    <li className="nav-item">
                                       <Link to="/about">
                                          {checkActiveUrl("/about") ?
                                             <div className="active">About</div> :
                                             <div>About</div>
                                          }
                                       </Link>
                                    </li>
                                    <li className="nav-item">
                                       <Link to="/shop">
                                          {checkActiveUrl("/shop") ?
                                             <div className="active">Shop</div> :
                                             <div>Shop</div>
                                          }
                                       </Link>
                                    </li>
                                    <li className="nav-item">
                                       <Link to="/blog">
                                          {checkActiveUrl("/blog") ?
                                             <div className="active">Blog</div> :
                                             <div>Blog</div>
                                          }
                                       </Link>
                                    </li>

                                    <li className="nav-item">
                                       <Link to="/contact">
                                          {checkActiveUrl("/contact") ?
                                             <div className="active">Contact</div> :
                                             <div>Contact</div>
                                          }
                                       </Link>
                                    </li>
                                 </ul>
                              </nav>
                           </div>
                        </div>
                        <div className="hotline d-none d-lg-flex">
                           <img
                              src="/assets/imgs/theme/icons/icon-headphone.svg"
                              alt="hotline"
                           />

                           <p>
                              1900 - 888<span>24/7 Support Center</span>
                           </p>
                        </div>


                        <div className="header-action-right  d-flex d-lg-none  ">
                           <div className="header-action-2">
                              <div className="header-action-icon-2">
                                 <Link to="/shop-wishlist">
                                    <div>
                                       <img
                                          alt="Evara"
                                          src="/assets/imgs/theme/icons/icon-heart.svg"
                                       />
                                       <span className="pro-count white">
                                          {totalWishlistItems}
                                       </span>
                                    </div>
                                 </Link>
                              </div>
                              <div className="header-action-icon-2">
                                 <Link to="/shop-cart">
                                    <div className="mini-cart-icon">
                                       <img
                                          alt="Evara"
                                          src="/assets/imgs/theme/icons/icon-cart.svg"
                                       />
                                       <span className="pro-count white">
                                          {totalCartItems}
                                       </span>
                                    </div>
                                 </Link>

                              </div>
                              <div className="header-action-icon-2 d-block d-lg-none">
                                 <div
                                    className="burger-icon burger-icon-white"
                                    onClick={toggleClick}
                                 >
                                    <span className="burger-icon-top"></span>
                                    <span className="burger-icon-mid"></span>
                                    <span className="burger-icon-bottom"></span>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </header>
         </>
      </>
   )
}
