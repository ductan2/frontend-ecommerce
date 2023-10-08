import { useEffect } from "react"
import { RootState, useAppDispatch } from "../store/store"
import { getAllProducts } from "../features/product/productSlice"
import { useSelector } from "react-redux"
import { Loading } from "../components/loading/Loading"
import { ProductItem } from "../components/products/ProductItem"

export const Shop = () => {
   const dispatch = useAppDispatch()
   const { data, isLoading, totalItem, } = useSelector((state: RootState) => state.products)

   useEffect(() => {
      dispatch(getAllProducts({}))
   }, [dispatch])

   if (isLoading) return <Loading isFull />
   return (
      <>
         <main className="main" style={{ transform: "none" }}>
            <div className="container mb-30" style={{ transform: "none" }}>
               <div className="row" style={{ transform: "none" }}>
                  <div className="col-lg-4-5">
                     <div className="shop-product-fillter">
                        <div className="totall-product">
                           <p>We found <strong className="text-brand">{totalItem}</strong> items for you!</p>
                        </div>
                        <div className="sort-by-product-area">
                           <div className="sort-by-cover mr-10">
                              <div className="sort-by-product-wrap">
                                 <div className="sort-by">
                                    <span><i className="fi-rs-apps"></i>Show:</span>
                                 </div>
                                 <div className="sort-by-dropdown-wrap">
                                    <span> 50 <i className="fi-rs-angle-small-down"></i></span>
                                 </div>
                              </div>
                              <div className="sort-by-dropdown">
                                 <ul>
                                    <li><a className="active" href="#">50</a></li>
                                    <li><a href="#">100</a></li>
                                    <li><a href="#">150</a></li>
                                    <li><a href="#">200</a></li>
                                    <li><a href="#">All</a></li>
                                 </ul>
                              </div>
                           </div>
                           <div className="sort-by-cover">
                              <div className="sort-by-product-wrap">
                                 <div className="sort-by">
                                    <span><i className="fi-rs-apps-sort"></i>Sort by:</span>
                                 </div>
                                 <div className="sort-by-dropdown-wrap">
                                    <span> Featured <i className="fi-rs-angle-small-down"></i></span>
                                 </div>
                              </div>
                              <div className="sort-by-dropdown">
                                 <ul>
                                    <li><a className="active" href="#">Featured</a></li>
                                    <li><a href="#">Price: Low to High</a></li>
                                    <li><a href="#">Price: High to Low</a></li>
                                    <li><a href="#">Release Date</a></li>
                                    <li><a href="#">Avg. Rating</a></li>
                                 </ul>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="row product-grid">
                        {data.map((item) => (
                           <ProductItem key={item._id} product={item} />
                        ))}


                     </div>

                     <div className="pagination-area mt-20 mb-20">
                        <nav aria-label="Page navigation example">
                           <ul className="pagination justify-content-start">
                              <li className="page-item">
                                 <a className="page-link" href="#"><i className="fi-rs-arrow-small-left"></i></a>
                              </li>
                              <li className="page-item"><a className="page-link" href="#">1</a></li>
                              <li className="page-item active"><a className="page-link" href="#">2</a></li>
                              <li className="page-item"><a className="page-link" href="#">3</a></li>
                              <li className="page-item"><a className="page-link dot" href="#">...</a></li>
                              <li className="page-item"><a className="page-link" href="#">6</a></li>
                              <li className="page-item">
                                 <a className="page-link" href="#"><i className="fi-rs-arrow-small-right"></i></a>
                              </li>
                           </ul>
                        </nav>
                     </div>
                     <section className="section-padding pb-5">
                        <div className="section-title">
                           <h3 className="">Deals Of The Day</h3>
                           <a className="show-all" href="shop-grid-right.html">
                              All Deals
                              <i className="fi-rs-angle-right"></i>
                           </a>
                        </div>
                        <div className="row">
                           <div className="col-xl-3 col-lg-4 col-md-6">
                              <div className="product-cart-wrap style-2">
                                 <div className="product-img-action-wrap">
                                    <div className="product-img">
                                       <a href="shop-product-right.html">
                                          <img src="assets/imgs/banner/banner-5.png" alt="" />
                                       </a>
                                    </div>
                                 </div>
                                 <div className="product-content-wrap">
                                    <div className="deals-countdown-wrap">
                                       <div className="deals-countdown" data-countdown="2025/03/25 00:00:00"><span className="countdown-section"><span className="countdown-amount hover-up">538</span><span className="countdown-period"> days </span></span><span className="countdown-section"><span className="countdown-amount hover-up">03</span><span className="countdown-period"> hours </span></span><span className="countdown-section"><span className="countdown-amount hover-up">17</span><span className="countdown-period"> mins </span></span><span className="countdown-section"><span className="countdown-amount hover-up">02</span><span className="countdown-period"> sec </span></span></div>
                                    </div>
                                    <div className="deals-content">
                                       <h2><a href="shop-product-right.html">Seeds of Change Organic Quinoa, Brown</a></h2>
                                       <div className="product-rate-cover">
                                          <div className="product-rate d-inline-block">
                                             <div className="product-rating" style={{ width: "90%" }}></div>
                                          </div>
                                          <span className="font-small ml-5 text-muted"> (4.0)</span>
                                       </div>
                                       <div>
                                          <span className="font-small text-muted">By <a href="vendor-details-1.html">NestFood</a></span>
                                       </div>
                                       <div className="product-card-bottom">
                                          <div className="product-price">
                                             <span>$32.85</span>
                                             <span className="old-price">$33.8</span>
                                          </div>
                                          <div className="add-cart">
                                             <a className="add" href="shop-cart.html"><i className="fi-rs-shopping-cart mr-5"></i>Add </a>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="col-xl-3 col-lg-4 col-md-6">
                              <div className="product-cart-wrap style-2">
                                 <div className="product-img-action-wrap">
                                    <div className="product-img">
                                       <a href="shop-product-right.html">
                                          <img src="assets/imgs/banner/banner-6.png" alt="" />
                                       </a>
                                    </div>
                                 </div>
                                 <div className="product-content-wrap">
                                    <div className="deals-countdown-wrap">
                                       <div className="deals-countdown" data-countdown="2026/04/25 00:00:00"><span className="countdown-section"><span className="countdown-amount hover-up">934</span><span className="countdown-period"> days </span></span><span className="countdown-section"><span className="countdown-amount hover-up">03</span><span className="countdown-period"> hours </span></span><span className="countdown-section"><span className="countdown-amount hover-up">17</span><span className="countdown-period"> mins </span></span><span className="countdown-section"><span className="countdown-amount hover-up">02</span><span className="countdown-period"> sec </span></span></div>
                                    </div>
                                    <div className="deals-content">
                                       <h2><a href="shop-product-right.html">Perdue Simply Smart Organics Gluten</a></h2>
                                       <div className="product-rate-cover">
                                          <div className="product-rate d-inline-block">
                                             <div className="product-rating" style={{ width: "90%" }}></div>
                                          </div>
                                          <span className="font-small ml-5 text-muted"> (4.0)</span>
                                       </div>
                                       <div>
                                          <span className="font-small text-muted">By <a href="vendor-details-1.html">Old El Paso</a></span>
                                       </div>
                                       <div className="product-card-bottom">
                                          <div className="product-price">
                                             <span>$24.85</span>
                                             <span className="old-price">$26.8</span>
                                          </div>
                                          <div className="add-cart">
                                             <a className="add" href="shop-cart.html"><i className="fi-rs-shopping-cart mr-5"></i>Add </a>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="col-xl-3 col-lg-4 col-md-6 d-none d-lg-block">
                              <div className="product-cart-wrap style-2">
                                 <div className="product-img-action-wrap">
                                    <div className="product-img">
                                       <a href="shop-product-right.html">
                                          <img src="assets/imgs/banner/banner-7.png" alt="" />
                                       </a>
                                    </div>
                                 </div>
                                 <div className="product-content-wrap">
                                    <div className="deals-countdown-wrap">
                                       <div className="deals-countdown" data-countdown="2027/03/25 00:00:00"><span className="countdown-section"><span className="countdown-amount hover-up">1268</span><span className="countdown-period"> days </span></span><span className="countdown-section"><span className="countdown-amount hover-up">03</span><span className="countdown-period"> hours </span></span><span className="countdown-section"><span className="countdown-amount hover-up">17</span><span className="countdown-period"> mins </span></span><span className="countdown-section"><span className="countdown-amount hover-up">02</span><span className="countdown-period"> sec </span></span></div>
                                    </div>
                                    <div className="deals-content">
                                       <h2><a href="shop-product-right.html">Signature Wood-Fired Mushroom</a></h2>
                                       <div className="product-rate-cover">
                                          <div className="product-rate d-inline-block">
                                             <div className="product-rating" style={{ width: "80%" }}></div>
                                          </div>
                                          <span className="font-small ml-5 text-muted"> (3.0)</span>
                                       </div>
                                       <div>
                                          <span className="font-small text-muted">By <a href="vendor-details-1.html">Progresso</a></span>
                                       </div>
                                       <div className="product-card-bottom">
                                          <div className="product-price">
                                             <span>$12.85</span>
                                             <span className="old-price">$13.8</span>
                                          </div>
                                          <div className="add-cart">
                                             <a className="add" href="shop-cart.html"><i className="fi-rs-shopping-cart mr-5"></i>Add </a>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="col-xl-3 col-lg-4 col-md-6 d-none d-xl-block">
                              <div className="product-cart-wrap style-2">
                                 <div className="product-img-action-wrap">
                                    <div className="product-img">
                                       <a href="shop-product-right.html">
                                          <img src="assets/imgs/banner/banner-8.png" alt="" />
                                       </a>
                                    </div>
                                 </div>
                                 <div className="product-content-wrap">
                                    <div className="deals-countdown-wrap">
                                       <div className="deals-countdown" data-countdown="2025/02/25 00:00:00"><span className="countdown-section"><span className="countdown-amount hover-up">510</span><span className="countdown-period"> days </span></span><span className="countdown-section"><span className="countdown-amount hover-up">03</span><span className="countdown-period"> hours </span></span><span className="countdown-section"><span className="countdown-amount hover-up">17</span><span className="countdown-period"> mins </span></span><span className="countdown-section"><span className="countdown-amount hover-up">02</span><span className="countdown-period"> sec </span></span></div>
                                    </div>
                                    <div className="deals-content">
                                       <h2><a href="shop-product-right.html">Simply Lemonade with Raspberry Juice</a></h2>
                                       <div className="product-rate-cover">
                                          <div className="product-rate d-inline-block">
                                             <div className="product-rating" style={{ width: "80%" }}></div>
                                          </div>
                                          <span className="font-small ml-5 text-muted"> (3.0)</span>
                                       </div>
                                       <div>
                                          <span className="font-small text-muted">By <a href="vendor-details-1.html">Yoplait</a></span>
                                       </div>
                                       <div className="product-card-bottom">
                                          <div className="product-price">
                                             <span>$15.85</span>
                                             <span className="old-price">$16.8</span>
                                          </div>
                                          <div className="add-cart">
                                             <a className="add" href="shop-cart.html"><i className="fi-rs-shopping-cart mr-5"></i>Add </a>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </section>

                  </div>
                  <div className="col-lg-1-5 primary-sidebar sticky-sidebar" style={{ position: "relative", overflow: " visible", minHeight: "1px" }}>
                     <div className="theiaStickySidebar" style={{ paddingTop: "0px", paddingBottom: "1px", position: "static", transform: "none" }}><div className="sidebar-widget widget-category-2 mb-30">
                        <h5 className="section-title style-1 mb-30">Category</h5>
                        <ul>
                           <li>
                              <a href="shop-grid-right.html"> <img src="assets/imgs/theme/icons/category-1.svg" alt="" />Milks &amp; Dairies</a><span className="count">30</span>
                           </li>
                           <li>
                              <a href="shop-grid-right.html"> <img src="assets/imgs/theme/icons/category-2.svg" alt="" />Clothing</a><span className="count">1</span>
                           </li>
                           <li>
                              <a href="shop-grid-right.html"> <img src="assets/imgs/theme/icons/category-3.svg" alt="" />Pet Foods </a><span className="count">1</span>
                           </li>
                           <li>
                              <a href="shop-grid-right.html"> <img src="assets/imgs/theme/icons/category-4.svg" alt="" />Baking material</a><span className="count">2</span>
                           </li>
                           <li>
                              <a href="shop-grid-right.html"> <img src="assets/imgs/theme/icons/category-5.svg" alt="" />Fresh Fruit</a><span className="count">0</span>
                           </li>
                        </ul>
                     </div>
                        <div className="sidebar-widget price_range range mb-30">
                           <h5 className="section-title style-1 mb-30">Fill by price</h5>
                           <div className="price-filter">
                              <div className="price-filter-inner">
                                 <div id="slider-range" className="mb-20 noUi-target noUi-ltr noUi-horizontal noUi-background">
                                    <div className="noUi-base"><div className="noUi-origin noUi-connect" style={{ left: "25%" }}>
                                       <div className="noUi-handle noUi-handle-lower"></div></div><div className="noUi-origin noUi-background" style={{ left: "50%" }}><div className="noUi-handle noUi-handle-upper"></div></div></div></div>
                                 <div className="d-flex justify-content-between">
                                    <div className="caption">From: <strong id="slider-range-value1" className="text-brand">$500</strong></div>
                                    <div className="caption">To: <strong id="slider-range-value2" className="text-brand">$1,000</strong></div>
                                 </div>
                              </div>
                           </div>
                           <div className="list-group">
                              <div className="list-group-item mb-10 mt-10">
                                 <label className="fw-900">Color</label>
                                 <div className="custome-checkbox">
                                    <input className="htmlForm-check-input" type="checkbox" name="checkbox" id="exampleCheckbox1" value="" />
                                    <label className="htmlForm-check-label" htmlFor="exampleCheckbox1"><span>Red (56)</span></label>
                                    <br />
                                    <input className="htmlForm-check-input" type="checkbox" name="checkbox" id="exampleCheckbox2" value="" />
                                    <label className="htmlForm-check-label" htmlFor="exampleCheckbox2"><span>Green (78)</span></label>
                                    <br />
                                    <input className="htmlForm-check-input" type="checkbox" name="checkbox" id="exampleCheckbox3" value="" />
                                    <label className="htmlForm-check-label" htmlFor="exampleCheckbox3"><span>Blue (54)</span></label>
                                 </div>
                                 <label className="fw-900 mt-15">Item Condition</label>
                                 <div className="custome-checkbox">
                                    <input className="htmlForm-check-input" type="checkbox" name="checkbox" id="exampleCheckbox11" value="" />
                                    <label className="htmlForm-check-label" htmlFor="exampleCheckbox11"><span>New (1506)</span></label>
                                    <br />
                                    <input className="htmlForm-check-input" type="checkbox" name="checkbox" id="exampleCheckbox21" value="" />
                                    <label className="htmlForm-check-label" htmlFor="exampleCheckbox21"><span>Refurbished (27)</span></label>
                                    <br />
                                    <input className="htmlForm-check-input" type="checkbox" name="checkbox" id="exampleCheckbox31" value="" />
                                    <label className="htmlForm-check-label" htmlFor="exampleCheckbox31"><span>Used (45)</span></label>
                                 </div>
                              </div>
                           </div>
                           <a href="shop-grid-right.html" className="btn btn-sm btn-default"><i className="fi-rs-filter mr-5"></i> Fillter</a>
                        </div><div className="sidebar-widget product-sidebar mb-30 p-30 bg-grey border-radius-10">
                           <h5 className="section-title style-1 mb-30">New products</h5>
                           <div className="single-post clearfix">
                              <div className="image">
                                 <img src="assets/imgs/shop/thumbnail-3.jpg" alt="#" />
                              </div>
                              <div className="content pt-10">
                                 <h5><a href="shop-product-detail.html">Chen Cardigan</a></h5>
                                 <p className="price mb-0 mt-5">$99.50</p>
                                 <div className="product-rate">
                                    <div className="product-rating" style={{ width: "90%" }}></div>
                                 </div>
                              </div>
                           </div>
                           <div className="single-post clearfix">
                              <div className="image">
                                 <img src="assets/imgs/shop/thumbnail-4.jpg" alt="#" />
                              </div>
                              <div className="content pt-10">
                                 <h6><a href="shop-product-detail.html">Chen Sweater</a></h6>
                                 <p className="price mb-0 mt-5">$89.50</p>
                                 <div className="product-rate">
                                    <div className="product-rating" style={{ width: "80%" }}></div>
                                 </div>
                              </div>
                           </div>
                           <div className="single-post clearfix">
                              <div className="image">
                                 <img src="assets/imgs/shop/thumbnail-5.jpg" alt="#" />
                              </div>
                              <div className="content pt-10">
                                 <h6><a href="shop-product-detail.html">Colorful Jacket</a></h6>
                                 <p className="price mb-0 mt-5">$25</p>
                                 <div className="product-rate">
                                    <div className="product-rating" style={{ width: "60%" }}></div>
                                 </div>
                              </div>
                           </div>
                        </div><div className="banner-img wow fadeIn mb-lg-0 animated d-lg-block d-none" style={{ visibility: "hidden", animationName: "none" }}>
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
               </div>
            </div>
         </main >
      </>
   )
}
