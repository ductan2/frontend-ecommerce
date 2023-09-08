import { Header } from "../components/header/Header"
import { Outlet } from "react-router-dom"
import { useState } from "react"
import { MobileMenu } from "./MobileMenu";
import Footer from "../components/footer/Footer";
export const Layout = () => {
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

   return (
      <>
         {isToggled && <div className="body-overlay-1" onClick={toggleClick}></div>}
         <MobileMenu isToggled={isToggled} toggleClick={toggleClick} />
         <Header toggleClick={toggleClick} />
         <Outlet />
         <Footer />
      </>
   )
}
