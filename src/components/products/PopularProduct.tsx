
import { ProductsGridView } from './ProductsGridView'


export const PopularProduct = () => {

   


   return (
      <section className="product-tabs section-padding position-relative">
         <div className="container">
            <h1 className='mb-30'>Popular products</h1>
            <div className="row">
               <div className="col-lg-12">
                  <ProductsGridView />
                  <ProductsGridView />

               </div>
            </div>
         </div>
      </section>
   )
}
