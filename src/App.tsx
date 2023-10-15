
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Layout } from "./pages/Layout"
import { About } from "./pages/About"
import { Shop } from "./pages/Shop"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { Wishlist } from "./pages/Wishlist"
import { SingleProduct } from "./pages/SingleProduct"
function App() {

  return (

    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/shop/product/:id" element={<SingleProduct />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
