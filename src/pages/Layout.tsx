import { Header } from "../components/header/Header"
import { Outlet } from "react-router-dom"
import { useEffect, useState } from "react"
import { MobileMenu } from "./MobileMenu";
import Footer from "../components/footer/Footer";
import { RootState, useAppDispatch } from "../store/store";
import { useSelector } from "react-redux";
import { getCart, getWishList } from "../features/user/userSlice";
export const Layout = () => {
   const dispatch = useAppDispatch();
   const [totalCartItems, setTotalCartItems] = useState(0);
   const [totalWishlistItems, setTotalWishlistItems] = useState(0);
   const [isToggled, setToggled] = useState(false);
   const toggleClick = () => {
      setToggled(!isToggled);
      const bodyElement = document.querySelector("body");

      if (bodyElement instanceof Element) {
         isToggled
            ? bodyElement.classList.remove("mobile-menu-active")
            : bodyElement.classList.add("mobile-menu-active");
      }
   };
   useEffect(() => {
      dispatch(getCart())
      dispatch(getWishList())
   }, [dispatch])
   const { cart, wishlist } = useSelector((state: RootState) => state.user)
   useEffect(() => {
      if (cart.length && wishlist.length) {
         setTotalCartItems(cart.length)
         setTotalWishlistItems(wishlist.length)
      }
   }, [cart.length, wishlist.length])
   return (
      <>
         {isToggled && <div className="body-overlay-1" onClick={toggleClick}></div>}
         <MobileMenu isToggled={isToggled} toggleClick={toggleClick} />
         <Header totalCartItems={totalCartItems} totalWishlistItems={totalWishlistItems} toggleClick={toggleClick} />
         <Outlet />
         <Footer />
      </>
   )
}
