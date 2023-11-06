
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Layout } from "./pages/Layout"
import { About } from "./pages/About"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { Wishlist } from "./pages/Wishlist"
import { SingleProduct } from "./pages/SingleProduct"
import { Cart } from "./pages/Cart"
import { Blog } from "./pages/Blog"
import { PrivateRoutes } from "./routing/PrivateRoutes"
import { ShopTest } from "./pages/ShopTest"
import SingleBlog from "./pages/SingleBlog"
import MyAccount from "./pages/MyAccount"
import Contact from "./pages/Contact"
import UpdateProfile from "./pages/profile/UpdateProfile"
import OrderList from "./pages/profile/OrderList"
import AccountAddress from "./pages/profile/AccountAddress"
import ErrorPage from "./pages/ErrorPage"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import CheckEmail from "./pages/CheckEmail"

function App() {

  return (

    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route path="*" element={<ErrorPage />} />
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="shop" element={<ShopTest />} />
            <Route path="wishlist" element={<PrivateRoutes><Wishlist /></PrivateRoutes>} />
            <Route path="shop/product/:id" element={<SingleProduct />} />
            <Route path="blog/:id" element={<SingleBlog />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="contact" element={<Contact />} />
            <Route path="blog" element={<Blog />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="check-email" element={<CheckEmail />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
            <Route path="account" element={
              <PrivateRoutes>
                <MyAccount />
              </PrivateRoutes>} >
              <Route path="" index element={<UpdateProfile />}></Route>
              <Route path="orders" element={<OrderList />}></Route>
              <Route path="address" element={<AccountAddress />}></Route>
            </Route>
            <Route path="cart"
              element={<PrivateRoutes>
                <Cart />
              </PrivateRoutes>} />
          </Route>



        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
