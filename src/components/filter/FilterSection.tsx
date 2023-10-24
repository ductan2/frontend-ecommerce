import React from 'react'
import { Brand } from '../../types/brand'
import { CategoryProduct } from '../../types/product'
import { NewProduct } from '../products/NewProduct'
import { RangePrice } from './RangePrice'

export interface FilterSectionProps {
   brands:Brand[],
   categoryProduct:CategoryProduct[],
}

export const FilterSection = ({
   brands,
   categoryProduct,
   selectedBrand,
   setSelectedBrand,
   selectedCategories,
   setSelectedCategories,
   handleFilter,
   clearFilter
}) => {
   return (
      <div className="col-lg-1-5 primary-sidebar sticky-sidebar" style={{ position: "relative", overflow: " visible", minHeight: "1px" }}>
         <div className="theiaStickySidebar" style={{ paddingTop: "0px", paddingBottom: "1px", position: "static", transform: "none" }}>

            <div className="sidebar-widget price_range range mb-20">
               <h5 className="section-title style-1 mb-30">Fill by price</h5>
               <div className="price-filter">
                  <RangePrice price={price} setPrice={setPrice} />
               </div>
               <div className="list-group">
                  <div className="list-group-item mb-10 mt-10">
                     <div className="mb-30 mt-30">
                        <label className="fw-900">Brands</label>
                        <div className="sort-by-product-area px-2 py-2" style={{ border: "1px solid #ccc", borderRadius: "8px" }}>
                           <div className="sort-by-cover">
                              <select className="sort-by-product-wrap " onChange={handleBrandChange} >
                                 <option value="" defaultValue={""} defaultChecked>Select brands</option>
                                 {brands.map((item) => (
                                    <option key={item._id} value={`${item.title}`}>{item.title}</option>
                                 ))}
                              </select>
                           </div>
                        </div>
                     </div>
                     <label className="fw-900 mt-15">Category</label>
                     <div className="custome-checkbox">
                        {categoryProduct.map((item) => (
                           <div key={item._id} className="d-flex items-center">
                              <input type="checkbox" id={item._id} onChange={() => handleCategoryChange(item.title)}
                                 className="form-input-checkbox" checked={selectedCategories.includes(item.title)}
                              />
                              <label className="" htmlFor={item._id} style={{ textTransform: "capitalize" }}> {item.title}</label>
                              <br />
                           </div>
                        ))}

                     </div>
                  </div>
               </div>
               <div className="d-flex gap-3">
                  <button onClick={handleFilter} className="btn btn-sm btn-default"> Fillter</button>
                  <button onClick={clearFilter} className="btn btn-sm btn-white"> Clear</button>
               </div>
            </div>
            <NewProduct data={data.slice(0, 3)} />
            <div className="banner-img wow fadeIn mb-lg-0 animated d-lg-block d-none" style={{ visibility: "hidden", animationName: "none" }}>
               <img src="assets/imgs/banner/banner-11.png" alt="" />
               <div className="banner-text">
                  <span>Oganic</span>
                  <h4>
                     Save 17% <br />
                     on <span className="text-brand">Oganic</span><br />
                     Juice
                  </h4>
               </div>
            </div>
         </div>
      </div>
   )
}
