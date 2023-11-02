import { useEffect, useState } from "react"
import { RootState, useAppDispatch } from "../store/store"
import { changePage, clear, filterProducts, getAllProducts, sortProducts } from "../features/product/productSlice"
import { useSelector } from "react-redux"
import { Loading } from "../components/loading/Loading"
import { ProductItem } from "../components/products/ProductItem"

import { RangePrice } from "../components/filter/RangePrice"
import { NewProduct } from "../components/products/NewProduct"
import { getAllBrand } from "../features/brand/brandSlice"
import { getAllCategoryProduct } from "../features/categoryProduct/categoryProcSlice"
import { useFilter } from "../hooks/useFilter"
import { Pagination } from "../components/pagination/Pagination"

export const ShopTest = () => {
   const { data, isLoading, filterData, currentPage, showPagination, totalFilteredPages, limitPerPage } = useSelector((state: RootState) => state.products);
   const brands = useSelector((state: RootState) => state.brands.data);
   const categoryProduct = useSelector((state: RootState) => state.categoryProc.data);
   const dispatch = useAppDispatch();
   const [price, setPrice] = useState({ value: { min: 0, max: 500 } });
   const [pages, setPages] = useState<number>(Math.ceil(totalFilteredPages / limitPerPage));
   const [pagination, setPagination] = useState<number[]>([]);
   const [sort, setSort] = useState('')
   const [products, setProducts] = useState(data || []);
   const { selectedBrand, setSelectedBrand, selectedCategories, setSelectedCategories } = useFilter(data || []);
   useEffect(() => {
      window.scrollTo(0, 0);
      dispatch(getAllBrand());
      dispatch(getAllCategoryProduct());
      dispatch(getAllProducts());
   }, [dispatch]);



   useEffect(() => {
      if (filterData) {
         setProducts(filterData);
      }
   }, [filterData]);



   const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedBrand(event.target.value);
   };
   const handleCategoryChange = (id?: string) => {
      if (!id) return;  // return early if id is undefined

      const newSelectedCategories = [...selectedCategories];
      const index = newSelectedCategories.indexOf(id);
      if (index === -1) {
         newSelectedCategories.push(id);
      } else {
         newSelectedCategories.splice(index, 1);
      }
      setSelectedCategories(newSelectedCategories);
   };
   const handleActive = (item: number) => {
      dispatch(changePage(item));
   };

   const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(sortProducts(e.target.value));
      setSort(e.target.value)
   };

   const handleFilter = () => {
      const filterConditions = {
         selectedBrand,
         selectedCategories,
         priceRange: price.value
      };
      dispatch(filterProducts(filterConditions));
   };
   const next = () => {
      dispatch(changePage(currentPage + 1));
   }
   const prev = () => {
      dispatch(changePage(currentPage - 1));
   }
   const cratePagination = () => {
      const arr: number[] = new Array(Math.ceil(totalFilteredPages))
         .fill(1)
         .map((_, idx) => idx + 1);

      setPagination(arr);
      setPages(Math.ceil(totalFilteredPages));
   };
   const clearFilter = () => {
      setPrice({ value: { min: 0, max: 500 } });
      setSelectedBrand('');
      setSelectedCategories([]);
      dispatch(clear());
   }
   useEffect(() => {
      if (filterData) {
         cratePagination();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [filterData])
   const start = Math.floor((currentPage - 1) / showPagination) * showPagination;
   const end = start + showPagination;

   const getPaginationGroup = pagination.slice(start, end);

   // Check for isLoading state right away
   if (isLoading) return <Loading isFull />
   if (!products) return <Loading isFull />
   return (
      <>
         <main className="main" style={{ transform: "none" }}>
            <div className="container mb-30" style={{ transform: "none" }}>
               <div className="row" style={{ transform: "none" }}>
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
                                             <option value="" defaultValue={""} defaultChecked>All brands</option>
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
                  <div className="col-lg-4-5">
                     <div className="shop-product-fillter mt-20">
                        <div className="totall-product">
                           <p>We found <strong className="text-brand">{filterData.length}</strong> items for you!</p>
                        </div>
                        <div className="sort-by-product-area ">
                           <div className="sort-by-cover">
                              <select className="sort-by-product-wrap " value={sort} onChange={handleSort}>
                                 <option value=""><span>Sort by: Created</span></option>
                                 <option value="price">Price: Low to High </option>
                                 <option value="-price">Price: High to low</option>
                                 <option value={"title"}>Name (a-&gt;z)</option>
                                 <option value={"-title"}>Name (z-&gt;a)</option>
                              </select>
                           </div>
                        </div>
                     </div>
                     <div className="row product-grid">
                        {products.slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage ).map((item) => (
                           <ProductItem key={item._id} product={item} />
                        ))}
                     </div>
                     <Pagination getPaginationGroup={getPaginationGroup}
                        handleActive={handleActive} pages={pages} currentPage={currentPage} next={next} prev={prev} />
                  </div>

               </div>
            </div>
         </main >
      </>
   )
}
