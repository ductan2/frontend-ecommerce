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

   const handleToggle = (key: number) => {
      if (isActive.key === key) {

         setIsActive({
            status: false,
            key,
         });

      } else {
         setIsActive({
            status: true,
            key,
         });
      }
   };

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
                        <a>
                           <img
                              src="/assets/imgs/theme/logo.svg"
                              alt="logo"
                           />
                        </a>
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
                           <a className="categori-button-active-2">
                              <span className="fi-rs-apps"></span> Browse
                              Categories
                           </a>
                        </Link>
                        <div className="categori-dropdown-wrap categori-dropdown-active-small">
                           <ul>
                              <li>
                                 <Link to="/shop">
                                    <a>
                                       <i className="evara-font-dress"></i>
                                       Women's Clothing
                                    </a>
                                 </Link>
                              </li>
                              <li>
                                 <Link to="/shop">
                                    <a>
                                       <i className="evara-font-tshirt"></i>
                                       Men's Clothing
                                    </a>
                                 </Link>
                              </li>
                              <li>
                                 {" "}
                                 <Link to="/shop">
                                    <a>
                                       <i className="evara-font-smartphone"></i>{" "}
                                       Cellphones
                                    </a>
                                 </Link>
                              </li>
                              <li>
                                 <Link to="/shop">
                                    <a>
                                       <i className="evara-font-desktop"></i>
                                       Computer & Office
                                    </a>
                                 </Link>
                              </li>
                              <li>
                                 <Link to="/shop">
                                    <a>
                                       <i className="evara-font-cpu"></i>
                                       Consumer Electronics
                                    </a>
                                 </Link>
                              </li>
                              <li>
                                 <Link to="/shop">
                                    <a>
                                       <i className="evara-font-home"></i>
                                       Home & Garden
                                    </a>
                                 </Link>
                              </li>
                              <li>
                                 <Link to="/shop">
                                    <a>
                                       <i className="evara-font-high-heels"></i>
                                       Shoes
                                    </a>
                                 </Link>
                              </li>
                              <li>
                                 <Link to="/shop">
                                    <a>
                                       <i className="evara-font-teddy-bear"></i>
                                       Mother & Kids
                                    </a>
                                 </Link>
                              </li>
                              <li>
                                 <Link to="/shop">
                                    <a>
                                       <i className="evara-font-kite"></i>
                                       Outdoor fun
                                    </a>
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
                              <span
                                 className="menu-expand"
                                 onClick={() => handleToggle(1)}
                              >
                                 <i className="fi-rs-angle-small-down"></i>
                              </span>
                              <Link to="/index">
                                 <a>Home</a>
                              </Link>
                              <ul
                                 className={
                                    isActive.key == 1
                                       ? "dropdown"
                                       : "d-none"
                                 }
                              >
                                 <li>
                                    <Link to="/index">
                                       <a>Home 1</a>
                                    </Link>
                                 </li>
                                 <li>
                                    <Link to="/index-2">
                                       <a>Home 2</a>
                                    </Link>
                                 </li>
                                 <li>
                                    <Link to="/index-3">
                                       <a>Home 3</a>
                                    </Link>
                                 </li>
                                 <li>
                                    <Link to="/index-4">
                                       <a>Home 4</a>
                                    </Link>
                                 </li>
                              </ul>
                           </li>
                           <li
                              className={
                                 isActive.key == 2
                                    ? "menu-item-has-children active"
                                    : "menu-item-has-children"
                              }
                           >
                              <span
                                 className="menu-expand"
                                 onClick={() => handleToggle(2)}
                              >
                                 <i className="fi-rs-angle-small-down"></i>
                              </span>
                              <Link to="/shop">
                                 <a>shop</a>
                              </Link>
                              <ul
                                 className={
                                    isActive.key == 2
                                       ? "dropdown"
                                       : "d-none"
                                 }
                              >
                                 <li>
                                    <Link to="/shop">
                                       <a>
                                          Shop Grid – Right
                                          Sidebar
                                       </a>
                                    </Link>
                                 </li>
                                 <li>
                                    <Link to="/shop-grid-left">
                                       <a>
                                          Shop Grid – Left Sidebar
                                       </a>
                                    </Link>
                                 </li>
                                 <li>
                                    <Link to="/shop-list-right">
                                       <a>
                                          Shop List – Right
                                          Sidebar
                                       </a>
                                    </Link>
                                 </li>
                                 <li>
                                    <Link to="/shop-list-left">
                                       <a>
                                          Shop List – Left Sidebar
                                       </a>
                                    </Link>
                                 </li>
                                 <li>
                                    <Link to="/shop-fullwidth">
                                       <a>Shop - Wide</a>
                                    </Link>
                                 </li>
                                 <li>
                                    <Link to="/shop-filter">
                                       <a>Shop – Filter</a>
                                    </Link>
                                 </li>
                                 <li>
                                    <Link to="/shop-wishlist">
                                       <a>Shop – Wishlist</a>
                                    </Link>
                                 </li>
                                 <li>
                                    <Link to="/shop-cart">
                                       <a>Shop – Cart</a>
                                    </Link>
                                 </li>
                                 <li>
                                    <Link to="/shop-checkout">
                                       <a>Shop – Checkout</a>
                                    </Link>
                                 </li>
                                 <li>
                                    <Link to="/shop-compare">
                                       <a>Shop – Compare</a>
                                    </Link>
                                 </li>
                              </ul>
                           </li>
                           <li
                              className={
                                 isActive.key == 3
                                    ? "menu-item-has-children active"
                                    : "menu-item-has-children"
                              }
                           >
                              <span
                                 className="menu-expand"
                                 onClick={() => handleToggle(3)}
                              >
                                 <i className="fi-rs-angle-small-down"></i>
                              </span>
                              <Link to="#">
                                 <a>Mega menu</a>
                              </Link>
                              <ul
                                 className={
                                    isActive.key == 3
                                       ? "dropdown"
                                       : "d-none"
                                 }
                              >
                                 <li className="menu-item-has-children">
                                    <span className="menu-expand"></span>
                                    <Link to="#">
                                       <a>Women's Fashion</a>
                                    </Link>
                                    <ul className="dropdown">
                                       <li>
                                          <Link to="/shop-product-right">
                                             <a>Dresses</a>
                                          </Link>
                                       </li>
                                       <li>
                                          <Link to="/shop-product-right">
                                             <a>
                                                Blouses & Shirts
                                             </a>
                                          </Link>
                                       </li>
                                       <li>
                                          <Link to="/shop-product-right">
                                             <a>
                                                Hoodies &
                                                Sweatshirts
                                             </a>
                                          </Link>
                                       </li>
                                       <li>
                                          <Link to="/shop-product-right">
                                             <a>Women's Sets</a>
                                          </Link>
                                       </li>
                                    </ul>
                                 </li>
                                 <li className="menu-item-has-children">
                                    <span className="menu-expand"></span>
                                    <Link to="#">
                                       <a>Men's Fashion</a>
                                    </Link>
                                    <ul className="dropdown">
                                       <li>
                                          <Link to="/shop-product-right">
                                             <a>Jackets</a>
                                          </Link>
                                       </li>
                                       <li>
                                          <Link to="/shop-product-right">
                                             <a>
                                                Casual Faux
                                                Leather
                                             </a>
                                          </Link>
                                       </li>
                                       <li>
                                          <Link to="/shop-product-right">
                                             <a>
                                                Genuine Leather
                                             </a>
                                          </Link>
                                       </li>
                                    </ul>
                                 </li>
                                 <li className="menu-item-has-children">
                                    <span className="menu-expand"></span>
                                    <Link to="#">
                                       <a>Technology</a>
                                    </Link>
                                    <ul className="dropdown">
                                       <li>
                                          <Link to="/shop-product-right">
                                             <a>
                                                Gaming Laptops
                                             </a>
                                          </Link>
                                       </li>
                                       <li>
                                          <Link to="/shop-product-right">
                                             <a>
                                                Ultraslim
                                                Laptops
                                             </a>
                                          </Link>
                                       </li>
                                       <li>
                                          <Link to="/shop-product-right">
                                             <a>Tablets</a>
                                          </Link>
                                       </li>
                                       <li>
                                          <Link to="/shop-product-right">
                                             <a>
                                                Laptop
                                                Accessories
                                             </a>
                                          </Link>
                                       </li>
                                       <li>
                                          <Link to="/shop-product-right">
                                             <a>
                                                Tablet
                                                Accessories
                                             </a>
                                          </Link>
                                       </li>
                                    </ul>
                                 </li>
                              </ul>
                           </li>
                           <li
                              className={
                                 isActive.key == 4
                                    ? "menu-item-has-children active"
                                    : "menu-item-has-children"
                              }
                           >
                              <span
                                 className="menu-expand"
                                 onClick={() => handleToggle(4)}
                              >
                                 <i className="fi-rs-angle-small-down"></i>
                              </span>
                              <Link to="/blog-category-fullwidth">
                                 <a>Blog</a>
                              </Link>
                              <ul
                                 className={
                                    isActive.key == 4
                                       ? "dropdown"
                                       : "d-none"
                                 }
                              >
                                 <li>
                                    <Link to="/blog-category-grid">
                                       <a>Blog Category Grid</a>
                                    </Link>
                                 </li>
                                 <li>
                                    <Link to="/blog-category-list">
                                       <a>Blog Category List</a>
                                    </Link>
                                 </li>
                                 <li>
                                    <Link to="/blog-category-big">
                                       <a>Blog Category Big</a>
                                    </Link>
                                 </li>
                                 <li>
                                    <Link to="/blog-category-fullwidth">
                                       <a>Blog Category Wide</a>
                                    </Link>
                                 </li>
                                 <li className="menu-item-has-children">
                                    <span className="menu-expand"></span>
                                    <Link to="#">
                                       <a>Single Product Layout</a>
                                    </Link>
                                    <ul className="dropdown">
                                       <li>
                                          <Link to="/blog-post-left">
                                             <a>Left Sidebar</a>
                                          </Link>
                                       </li>
                                       <li>
                                          <Link to="/blog-post-right">
                                             <a>Right Sidebar</a>
                                          </Link>
                                       </li>
                                       <li>
                                          <Link to="/blog-post-fullwidth">
                                             <a>No Sidebar</a>
                                          </Link>
                                       </li>
                                    </ul>
                                 </li>
                              </ul>
                           </li>
                           <li
                              className={
                                 isActive.key == 5
                                    ? "menu-item-has-children active"
                                    : "menu-item-has-children"
                              }
                           >
                              <span
                                 className="menu-expand"
                                 onClick={() => handleToggle(5)}
                              >
                                 <i className="fi-rs-angle-small-down"></i>
                              </span>
                              <Link to="#">
                                 <a>Pages</a>
                              </Link>
                              <ul
                                 className={
                                    isActive.key == 5
                                       ? "dropdown"
                                       : "d-none"
                                 }
                              >
                                 <li>
                                    <Link to="/page-about">
                                       <a>About Us</a>
                                    </Link>
                                 </li>
                                 <li>
                                    <Link to="/page-contact">
                                       <a>Contact</a>
                                    </Link>
                                 </li>
                                 <li>
                                    <Link to="/page-account">
                                       <a>My Account</a>
                                    </Link>
                                 </li>
                                 <li>
                                    <Link to="/page-login-register">
                                       <a>login/register</a>
                                    </Link>
                                 </li>
                                 <li>
                                    <Link to="/page-purchase-guide">
                                       <a>Purchase Guide</a>
                                    </Link>
                                 </li>
                                 <li>
                                    <Link to="/page-privacy-policy">
                                       <a>Privacy Policy</a>
                                    </Link>
                                 </li>
                                 <li>
                                    <Link to="/page-terms">
                                       <a>Terms of Service</a>
                                    </Link>
                                 </li>
                                 <li>
                                    <Link to="/page-404">
                                       <a>404 Page</a>
                                    </Link>
                                 </li>
                              </ul>
                           </li>
                           <li
                              className={
                                 isActive.key == 6
                                    ? "menu-item-has-children active"
                                    : "menu-item-has-children"
                              }
                           >
                              <span
                                 className="menu-expand"
                                 onClick={() => handleToggle(6)}
                              >
                                 <i className="fi-rs-angle-small-down"></i>
                              </span>
                              <Link to="#">
                                 <a>Language</a>
                              </Link>
                              <ul
                                 className={
                                    isActive.key == 6
                                       ? "dropdown"
                                       : "d-none"
                                 }
                              >
                                 <li>
                                    <Link to="#">
                                       <a>English</a>
                                    </Link>
                                 </li>
                                 <li>
                                    <Link to="#">
                                       <a>French</a>
                                    </Link>
                                 </li>
                                 <li>
                                    <Link to="#">
                                       <a>German</a>
                                    </Link>
                                 </li>
                                 <li>
                                    <Link to="#">
                                       <a>Spanish</a>
                                    </Link>
                                 </li>
                              </ul>
                           </li>
                        </ul>
                     </nav>
                  </div>
                  <div className="mobile-header-info-wrap mobile-header-border">
                     <div className="single-mobile-header-info mt-30">
                        <Link to="/page-contact">
                           <a> Our location </a>
                        </Link>
                     </div>
                     <div className="single-mobile-header-info">
                        <Link to="/page-login-register">
                           <a>Log In / Sign Up </a>
                        </Link>
                     </div>
                     <div className="single-mobile-header-info">
                        <Link to="#">
                           <a>(+01) - 2345 - 6789 </a>
                        </Link>
                     </div>
                  </div>
                  <div className="mobile-social-icon">
                     <h5 className="mb-15 text-grey-4">Follow Us</h5>
                     <Link to="#">
                        <a>
                           <img
                              src="/assets/imgs/theme/icons/icon-facebook.svg"
                              alt=""
                           />
                        </a>
                     </Link>
                     <Link to="#">
                        <a>
                           <img
                              src="/assets/imgs/theme/icons/icon-twitter.svg"
                              alt=""
                           />
                        </a>
                     </Link>
                     <Link to="#">
                        <a>
                           <img
                              src="/assets/imgs/theme/icons/icon-instagram.svg"
                              alt=""
                           />
                        </a>
                     </Link>
                     <Link to="#">
                        <a>
                           <img
                              src="/assets/imgs/theme/icons/icon-pinterest.svg"
                              alt=""
                           />
                        </a>
                     </Link>
                     <Link to="#">
                        <a>
                           <img
                              src="/assets/imgs/theme/icons/icon-youtube.svg"
                              alt=""
                           />
                        </a>
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}
