import { useEffect, useState } from "react"
import { RootState, useAppDispatch } from "../../store/store"
import { getAllProducts } from "../../features/product/productSlice"
import { Product } from "../../types/product"
import { useSelector } from "react-redux"
import { Loading } from "../loading/Loading"
import { ProductItem } from "./ProductItem"



export const PopularProduct = () => {


   const dispatch = useAppDispatch()
   const [procTrending, setProcTrending] = useState<Product[]>([])
   const { data } = useSelector((state: RootState) => state.products)

   useEffect(() => {
      dispatch(getAllProducts({}))
   }, [dispatch])
   useEffect(() => {
      if (data) {
         const proc = data.filter((item: Product) => item.trending === true)
         setProcTrending(proc)
      }
   }, [data])
   if (!procTrending) return <Loading isFull />
   return (
      <section className="product-tabs section-padding position-relative">
         <div className="container">
            <h1 className='mb-30'>Trendings products</h1>
            <div className="row">
               {procTrending.map((item: Product) => (
                  <ProductItem key={item._id} product={item} />
               ))}
            </div>
         </div>
      </section>
   )
}
