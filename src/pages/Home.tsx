import { Banner } from "../components/banner/Banner"
import { PopularProduct } from "../components/products/PopularProduct"


export const Home = () => {
  return (
    <main className="main">
      <Banner />
      <PopularProduct />
    </main>
  )
}
