import {  useEffect, useState } from "react"
import { RootState, useAppDispatch } from "../store/store"
import { getAllProducts } from "../features/product/productSlice"
import { useSelector } from "react-redux"
import { Loading } from "../components/loading/Loading"
import { ProductItem } from "../components/products/ProductItem"
import { Pagination } from "../components/pagination/Pagination"
import { RangePrice } from "../components/filter/RangePrice"
import { useLocation, useNavigate } from "react-router-dom"

import { NewProduct } from "../components/products/NewProduct"
import { getAllBrand } from "../features/brand/brandSlice"
import { getAllCategoryProduct } from "../features/categoryProduct/categoryProcSlice"
import { Product } from "../types/product"
export const Shop = () => {
   const { data, isLoading, totalItem, itemPerPage, showPagination } = useSelector((state: RootState) => state.products)
   const { data: brands } = useSelector((state: RootState) => state.brands)
   const { data: categoryProduct } = useSelector((state: RootState) => state.categoryProc)
   const [products, setProducts] = useState<Product[]>(data)
   const dispatch = useAppDispatch()
   const navigate = useNavigate();
   const [pagination, setPagination] = useState<number[]>([]);
   const [pages, setPages] = useState<number>(Math.ceil(totalItem / itemPerPage));
   const [currentPage, setCurrentPage] = useState<number>(1);
   const [sort, setSort] = useState<string>("")
   const [price, setPrice] = useState({ value: { min: 0, max: 500 } });
   const searchParams = useLocation().search.slice(1);
   const [selectedBrand, setSelectedBrand] = useState<string>('');
   const [selectedCategories, setSelectedCategories] = useState<string[]>([])

   const getData = (page: number, searchParams?: string) => {
      const query = searchParams ? `${searchParams}` : '';
      dispatch(getAllProducts({ page, query }));
   };

   useEffect(() => {
      getData(currentPage, searchParams)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [currentPage, searchParams, dispatch])

   useEffect(() => {
      dispatch(getAllProducts({}))
      dispatch(getAllBrand())
      dispatch(getAllCategoryProduct())
   }, [dispatch])
   const next = () => {

      setCurrentPage((page) => page + 1);
   };

   const prev = () => {
      setCurrentPage((page) => page - 1);
   };

   const cratePagination = () => {
      const arr: number[] = new Array(Math.ceil(totalItem / itemPerPage))
         .fill(1)
         .map((_, idx) => idx + 1);

      setPagination(arr);
      setPages(Math.ceil(totalItem / itemPerPage));
   };
   useEffect(() => {
      if (data) {
         cratePagination();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [data])
   const handleActive = (item: number) => {
      setCurrentPage(item);
   };

   useEffect(() => {
      if (data)
         setProducts(data)
   }, [data])

   useEffect(() => {
      const fetchData = async () => {
         if (price.value.min === 0 && price.value.max === 500) return;
         setCurrentPage(1);
         navigate(`/shop?minPrice=${price.value.min}&maxPrice=${price.value.max}`);
      };
      fetchData();
   }, [price.value.min, price.value.max, dispatch, navigate]);

   const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = event.target.value;
      setSelectedBrand(selectedValue);
   };

   const handleCategoryChange = (id: string) => {
      const newSelectedCategories = [...selectedCategories];
      const index = newSelectedCategories.indexOf(id);
      if (index === -1) {
         newSelectedCategories.push(id);
      } else {
         newSelectedCategories.splice(index, 1);
      }
      setSelectedCategories(newSelectedCategories);
   };
   const handleFilter = () => {
      const filteredProducts = data.filter((item) => {
         const brandMatch = selectedBrand ? item.brand === selectedBrand : true;
         const categoryMatch = selectedCategories.length === 0 ||
            selectedCategories.every((category) =>
               item.category.some((cat) => cat.title === category)
            );

         return brandMatch && categoryMatch;
      });
      setProducts(filteredProducts);
   };
   if (!data || !itemPerPage || !showPagination) return null;


   const start = Math.floor((currentPage - 1) / showPagination) * showPagination;
   const end = start + showPagination;
   const getPaginationGroup = pagination.slice(start, end);

   const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSort(e.target.value)
      getData(currentPage, `sort=${e.target.value}`)
      if (e.target.value === "") return navigate(`/shop`);
      navigate(`/shop?sort=${e.target.value}`);
   }

   if (isLoading) return <Loading isFull />
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
                           <button onClick={handleFilter} className="btn btn-sm btn-default"><i className="fi-rs-filter mr-5"></i> Fillter</button>
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
                           <p>We found <strong className="text-brand">{totalItem}</strong> items for you!</p>
                        </div>
                        <div className="sort-by-product-area ">
                           <div className="sort-by-cover">
                              <select className="sort-by-product-wrap " value={sort} onChange={handleSort}>
                                 <option value=""><span>Sort by: Featured</span></option>
                                 <option value="price">Price: Low to High </option>
                                 <option value="-price">Price: High to low</option>
                                 <option value={"title"}>Name (a-&gt;z)</option>
                                 <option value={"-title"}>Name (z-&gt;a)</option>
                              </select>
                           </div>
                        </div>
                     </div>
                     <div className="row product-grid">
                        {products.map((item) => (
                           <ProductItem key={item._id} product={item} />
                        ))}
                     </div>
                     <Pagination
                        getPaginationGroup={
                           getPaginationGroup
                        }
                        currentPage={currentPage}
                        pages={pages}
                        next={next}
                        prev={prev}
                        handleActive={handleActive}
                     />

                  </div>

               </div>
            </div>
         </main >
      </>
   )
}
