import { Link } from "react-router-dom"
import { Loading } from "../loading/Loading"
import { Product } from "../../types/product"

type props ={
   data: Product[]
}
export const NewProduct = ({data}:props) => {

   
   if(!data) return <Loading isFull />
   return (
      <div className="sidebar-widget product-sidebar mb-30 p-30 bg-grey border-radius-10">
         <h5 className="section-title style-1 mb-30">New products</h5>
         {data.map((item) => (
            <div key={item._id} className="single-post clearfix">
               <div className="image">
                  <img src={item.images[0].url} alt="#" />
               </div>
               <div className="content pt-10">
                  <h5><Link to={`product/${item._id}`}>{item.title.length < 10 ? item.title : item.title.substring(0, 10) + "..."}</Link></h5>
                  <p className="price mb-0 mt-5">${item.price}</p>
                  <div className="product-rate">
                     <div className="product-rating" style={{ width: item.rating_distribution * 20 + "%" }}></div>
                  </div>
               </div>
            </div>
         ))}
      </div>
   )
}
