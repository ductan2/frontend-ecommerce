import { useEffect } from "react"
import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "../store/store"
import { getAllBlog } from "../features/blog/blogSlice"
import { UploadImageType } from "../types/commom"

export const Blog = () => {
   const { data } = useSelector((state: RootState) => state.blogs)
   const dispatch = useAppDispatch()
   useEffect(() => {
      dispatch(getAllBlog())
   }, [dispatch])
   console.log("blogs: ", data)
   return (
      <main className="main mt-50">

         <div className="page-content ">
            <div className="container">
               <div className="row">
                  <div className="col-lg-12">
                     <div className="shop-product-fillter mb-50">
                        <div className="totall-product">
                           <h2>
                              <img className="w-36px mr-10" src="assets/imgs/theme/icons/category-1.svg" alt="" />
                              Blog
                           </h2>
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
                                    <span><i className="fi-rs-apps-sort"></i>Sort:</span>
                                 </div>
                                 <div className="sort-by-dropdown-wrap">
                                    <span>Featured <i className="fi-rs-angle-small-down"></i></span>
                                 </div>
                              </div>
                              <div className="sort-by-dropdown">
                                 <ul>
                                    <li><a className="active" href="#">Featured</a></li>
                                    <li><a href="#">Newest</a></li>
                                    <li><a href="#">Most comments</a></li>
                                    <li><a href="#">Release Date</a></li>
                                 </ul>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="loop-grid">
                        <div className="row">
                           {data.map((item) => (
                              <article className="col-xl-3 col-lg-4 col-md-6 text-center hover-up mb-30 animated">
                                 <div className="post-thumb">
                                    <a href="blog-post-right.html">
                                       <img className="border-radius-15" src={(item.images as UploadImageType).url || item.images as string} alt="" />
                                    </a>
                                    <div className="entry-meta">
                                       <a className="entry-meta meta-2" href="blog-category-grid.html"><i className="fi-rs-heart"></i></a>
                                    </div>
                                 </div>
                                 <div className="entry-content-2">
                                    <h4 className="post-title mb-15">
                                       <a href="blog-post-right.html">{item.title.length > 30 ? item.title.substring(0, 30) + "..." : item.title}</a>
                                    </h4>
                                    <div className="entry-meta font-xs color-grey mt-10 pb-10">
                                       <div>
                                          <span className="post-on mr-10">{item.created_at}</span>
                                          <span className="hit-count has-dot mr-10">{item.numViews} Views</span>
                                          <span className="hit-count has-dot">{item.author}</span>
                                       </div>
                                    </div>
                                 </div>
                              </article>
                           ))}
                           <article className="col-xl-3 col-lg-4 col-md-6 text-center hover-up mb-30 animated">
                              <div className="post-thumb">
                                 <a href="blog-post-right.html">
                                    <img className="border-radius-15" src="assets/imgs/blog/blog-2.png" alt="" />
                                 </a>
                              </div>
                              <div className="entry-content-2">
                                 <h6 className="mb-10 font-sm"><a className="entry-meta text-muted" href="blog-category-grid.html">Soups and Stews</a></h6>
                                 <h4 className="post-title mb-15">
                                    <a href="blog-post-right.html">Summer Quinoa Salad Jars with Lemon Dill</a>
                                 </h4>
                                 <div className="entry-meta font-xs color-grey mt-10 pb-10">
                                    <div>
                                       <span className="post-on mr-10">25 April 2022</span>
                                       <span className="hit-count has-dot mr-10">126k Views</span>
                                       <span className="hit-count has-dot">4 mins read</span>
                                    </div>
                                 </div>
                              </div>
                           </article>
                           <article className="col-xl-3 col-lg-4 col-md-6 text-center hover-up mb-30 animated">
                              <div className="post-thumb">
                                 <a href="blog-post-right.html">
                                    <img className="border-radius-15" src="assets/imgs/blog/blog-3.png" alt="" />
                                 </a>
                                 <div className="entry-meta">
                                    <a className="entry-meta meta-2" href="blog-category-grid.html"><i className="fi-rs-link"></i></a>
                                 </div>
                              </div>
                              <div className="entry-content-2">
                                 <h6 className="mb-10 font-sm"><a className="entry-meta text-muted" href="blog-category-grid.html">Salad</a></h6>
                                 <h4 className="post-title mb-15">
                                    <a href="blog-post-right.html">Caprese Chicken with Smashed Potatoes</a>
                                 </h4>
                                 <div className="entry-meta font-xs color-grey mt-10 pb-10">
                                    <div>
                                       <span className="post-on mr-10">25 April 2022</span>
                                       <span className="hit-count has-dot mr-10">126k Views</span>
                                       <span className="hit-count has-dot">4 mins read</span>
                                    </div>
                                 </div>
                              </div>
                           </article>
                           <article className="col-xl-3 col-lg-4 col-md-6 text-center hover-up mb-30 animated">
                              <div className="post-thumb">
                                 <a href="blog-post-right.html">
                                    <img className="border-radius-15" src="assets/imgs/blog/blog-4.png" alt="" />
                                 </a>
                              </div>
                              <div className="entry-content-2">
                                 <h6 className="mb-10 font-sm"><a className="entry-meta text-muted" href="blog-category-grid.html">Dessert</a></h6>
                                 <h4 className="post-title mb-15">
                                    <a href="blog-post-right.html">Harissa Chickpeas with Whipped Feta</a>
                                 </h4>
                                 <div className="entry-meta font-xs color-grey mt-10 pb-10">
                                    <div>
                                       <span className="post-on mr-10">25 April 2022</span>
                                       <span className="hit-count has-dot mr-10">126k Views</span>
                                       <span className="hit-count has-dot">4 mins read</span>
                                    </div>
                                 </div>
                              </div>
                           </article>
                           <article className="col-xl-3 col-lg-4 col-md-6 text-center hover-up mb-30 animated">
                              <div className="post-thumb">
                                 <a href="blog-post-right.html">
                                    <img className="border-radius-15" src="assets/imgs/blog/blog-5.png" alt="" />
                                 </a>
                              </div>
                              <div className="entry-content-2">
                                 <h6 className="mb-10 font-sm"><a className="entry-meta text-muted" href="blog-category-grid.html">Breakfast</a></h6>
                                 <h4 className="post-title mb-15">
                                    <a href="blog-post-right.html">Almond Butter Chocolate Chip Zucchini Bars</a>
                                 </h4>
                                 <div className="entry-meta font-xs color-grey mt-10 pb-10">
                                    <div>
                                       <span className="post-on mr-10">25 April 2022</span>
                                       <span className="hit-count has-dot mr-10">126k Views</span>
                                       <span className="hit-count has-dot">4 mins read</span>
                                    </div>
                                 </div>
                              </div>
                           </article>
                           <article className="col-xl-3 col-lg-4 col-md-6 text-center hover-up mb-30 animated">
                              <div className="post-thumb">
                                 <a href="blog-post-right.html">
                                    <img className="border-radius-15" src="assets/imgs/blog/blog-6.png" alt="" />
                                 </a>
                                 <div className="entry-meta">
                                    <a className="entry-meta meta-2" href="blog-category-grid.html"><i className="fi-rs-picture"></i></a>
                                 </div>
                              </div>
                              <div className="entry-content-2">
                                 <h6 className="mb-10 font-sm"><a className="entry-meta text-muted" href="blog-category-grid.html">Vegan</a></h6>
                                 <h4 className="post-title mb-15">
                                    <a href="blog-post-right.html">Smoky Beans &amp; Greens Tacos with Aji Verde</a>
                                 </h4>
                                 <div className="entry-meta font-xs color-grey mt-10 pb-10">
                                    <div>
                                       <span className="post-on mr-10">25 April 2022</span>
                                       <span className="hit-count has-dot mr-10">126k Views</span>
                                       <span className="hit-count has-dot">4 mins read</span>
                                    </div>
                                 </div>
                              </div>
                           </article>
                           <article className="col-xl-3 col-lg-4 col-md-6 text-center hover-up mb-30 animated">
                              <div className="post-thumb">
                                 <a href="blog-post-right.html">
                                    <img className="border-radius-15" src="assets/imgs/blog/blog-1.png" alt="" />
                                 </a>
                                 <div className="entry-meta">
                                    <a className="entry-meta meta-2" href="blog-category-grid.html"><i className="fi-rs-heart"></i></a>
                                 </div>
                              </div>
                              <div className="entry-content-2">
                                 <h6 className="mb-10 font-sm"><a className="entry-meta text-muted" href="blog-category-grid.html">Side Dish</a></h6>
                                 <h4 className="post-title mb-15">
                                    <a href="blog-post-right.html">The Intermediate Guide to Healthy Food</a>
                                 </h4>
                                 <div className="entry-meta font-xs color-grey mt-10 pb-10">
                                    <div>
                                       <span className="post-on mr-10">25 April 2022</span>
                                       <span className="hit-count has-dot mr-10">126k Views</span>
                                       <span className="hit-count has-dot">4 mins read</span>
                                    </div>
                                 </div>
                              </div>
                           </article>
                           <article className="col-xl-3 col-lg-4 col-md-6 text-center hover-up mb-30 animated">
                              <div className="post-thumb">
                                 <a href="blog-post-right.html">
                                    <img className="border-radius-15" src="assets/imgs/blog/blog-7.png" alt="" />
                                 </a>
                                 <div className="entry-meta">
                                    <a className="entry-meta meta-2" href="blog-category-grid.html"><i className="fi-rs-play-alt"></i></a>
                                 </div>
                              </div>
                              <div className="entry-content-2">
                                 <h6 className="mb-10 font-sm"><a className="entry-meta text-muted" href="blog-category-grid.html">Gluten Free</a></h6>
                                 <h4 className="post-title mb-15">
                                    <a href="blog-post-right.html">Sticky Ginger Rice Bowls with Pickled Veg</a>
                                 </h4>
                                 <div className="entry-meta font-xs color-grey mt-10 pb-10">
                                    <div>
                                       <span className="post-on mr-10">25 April 2022</span>
                                       <span className="hit-count has-dot mr-10">126k Views</span>
                                       <span className="hit-count has-dot">4 mins read</span>
                                    </div>
                                 </div>
                              </div>
                           </article>
                           <article className="col-xl-3 col-lg-4 col-md-6 text-center hover-up mb-30 animated">
                              <div className="post-thumb">
                                 <a href="blog-post-right.html">
                                    <img className="border-radius-15" src="assets/imgs/blog/blog-8.png" alt="" />
                                 </a>
                              </div>
                              <div className="entry-content-2">
                                 <h6 className="mb-10 font-sm"><a className="entry-meta text-muted" href="blog-category-grid.html">Side Dish</a></h6>
                                 <h4 className="post-title mb-15">
                                    <a href="blog-post-right.html">Creamy Garlic Sun-Dried Tomato Pasta</a>
                                 </h4>
                                 <div className="entry-meta font-xs color-grey mt-10 pb-10">
                                    <div>
                                       <span className="post-on mr-10">25 April 2022</span>
                                       <span className="hit-count has-dot mr-10">126k Views</span>
                                       <span className="hit-count has-dot">4 mins read</span>
                                    </div>
                                 </div>
                              </div>
                           </article>
                           <article className="col-xl-3 col-lg-4 col-md-6 text-center hover-up mb-30 animated">
                              <div className="post-thumb">
                                 <a href="blog-post-right.html">
                                    <img className="border-radius-15" src="assets/imgs/blog/blog-9.png" alt="" />
                                 </a>
                              </div>
                              <div className="entry-content-2">
                                 <h6 className="mb-10 font-sm"><a className="entry-meta text-muted" href="blog-category-grid.html">Dairy Free</a></h6>
                                 <h4 className="post-title mb-15">
                                    <a href="blog-post-right.html">The Absolute Easiest Spinach and Pizza</a>
                                 </h4>
                                 <div className="entry-meta font-xs color-grey mt-10 pb-10">
                                    <div>
                                       <span className="post-on mr-10">25 April 2022</span>
                                       <span className="hit-count has-dot mr-10">126k Views</span>
                                       <span className="hit-count has-dot">4 mins read</span>
                                    </div>
                                 </div>
                              </div>
                           </article>
                           <article className="col-xl-3 col-lg-4 col-md-6 text-center hover-up mb-30 animated">
                              <div className="post-thumb">
                                 <a href="blog-post-right.html">
                                    <img className="border-radius-15" src="assets/imgs/blog/blog-10.png" alt="" />
                                 </a>
                              </div>
                              <div className="entry-content-2">
                                 <h6 className="mb-10 font-sm"><a className="entry-meta text-muted" href="blog-category-grid.html">Salad</a></h6>
                                 <h4 className="post-title mb-15">
                                    <a href="blog-post-right.html">Sticky Ginger Rice Bowls with Pickled</a>
                                 </h4>
                                 <div className="entry-meta font-xs color-grey mt-10 pb-10">
                                    <div>
                                       <span className="post-on mr-10">25 April 2022</span>
                                       <span className="hit-count has-dot mr-10">126k Views</span>
                                       <span className="hit-count has-dot">4 mins read</span>
                                    </div>
                                 </div>
                              </div>
                           </article>
                           <article className="col-xl-3 col-lg-4 col-md-6 text-center hover-up mb-30 animated">
                              <div className="post-thumb">
                                 <a href="blog-post-right.html">
                                    <img className="border-radius-15" src="assets/imgs/blog/blog-1.png" alt="" />
                                 </a>
                              </div>
                              <div className="entry-content-2">
                                 <h6 className="mb-10 font-sm"><a className="entry-meta text-muted" href="blog-category-grid.html">Soups</a></h6>
                                 <h4 className="post-title mb-15">
                                    <a href="blog-post-right.html">The Best Soft Chocolate Chip Cookies</a>
                                 </h4>
                                 <div className="entry-meta font-xs color-grey mt-10 pb-10">
                                    <div>
                                       <span className="post-on mr-10">25 April 2022</span>
                                       <span className="hit-count has-dot mr-10">126k Views</span>
                                       <span className="hit-count has-dot">4 mins read</span>
                                    </div>
                                 </div>
                              </div>
                           </article>
                           <article className="col-xl-3 col-lg-4 col-md-6 text-center hover-up mb-30 animated">
                              <div className="post-thumb">
                                 <a href="blog-post-right.html">
                                    <img className="border-radius-15" src="assets/imgs/blog/blog-12.png" alt="" />
                                 </a>
                              </div>
                              <div className="entry-content-2">
                                 <h6 className="mb-10 font-sm"><a className="entry-meta text-muted" href="blog-category-grid.html">Vegetarian</a></h6>
                                 <h4 className="post-title mb-15">
                                    <a href="blog-post-right.html">Baked Mozzarella Chicken Rolls</a>
                                 </h4>
                                 <div className="entry-meta font-xs color-grey mt-10 pb-10">
                                    <div>
                                       <span className="post-on mr-10">25 April 2022</span>
                                       <span className="hit-count has-dot mr-10">126k Views</span>
                                       <span className="hit-count has-dot">4 mins read</span>
                                    </div>
                                 </div>
                              </div>
                           </article>
                           <article className="col-xl-3 col-lg-4 col-md-6 text-center hover-up mb-30 animated">
                              <div className="post-thumb">
                                 <a href="blog-post-right.html">
                                    <img className="border-radius-15" src="assets/imgs/blog/blog-13.png" alt="" />
                                 </a>
                              </div>
                              <div className="entry-content-2">
                                 <h6 className="mb-10 font-sm"><a className="entry-meta text-muted" href="blog-category-grid.html"> Dessert </a></h6>
                                 <h4 className="post-title mb-15">
                                    <a href="blog-post-right.html">The Best Avocado Egg Salad</a>
                                 </h4>
                                 <div className="entry-meta font-xs color-grey mt-10 pb-10">
                                    <div>
                                       <span className="post-on mr-10">25 April 2022</span>
                                       <span className="hit-count has-dot mr-10">126k Views</span>
                                       <span className="hit-count has-dot">4 mins read</span>
                                    </div>
                                 </div>
                              </div>
                           </article>
                           <article className="col-xl-3 col-lg-4 col-md-6 text-center hover-up mb-30 animated">
                              <div className="post-thumb">
                                 <a href="blog-post-right.html">
                                    <img className="border-radius-15" src="assets/imgs/blog/blog-14.png" alt="" />
                                 </a>
                              </div>
                              <div className="entry-content-2">
                                 <h6 className="mb-10 font-sm"><a className="entry-meta text-muted" href="blog-category-grid.html">Vegetarian</a></h6>
                                 <h4 className="post-title mb-15">
                                    <a href="blog-post-right.html">The litigants on the screen are not actors</a>
                                 </h4>
                                 <div className="entry-meta font-xs color-grey mt-10 pb-10">
                                    <div>
                                       <span className="post-on mr-10">25 April 2022</span>
                                       <span className="hit-count has-dot mr-10">126k Views</span>
                                       <span className="hit-count has-dot">4 mins read</span>
                                    </div>
                                 </div>
                              </div>
                           </article>
                           <article className="col-xl-3 col-lg-4 col-md-6 text-center hover-up mb-30 animated">
                              <div className="post-thumb">
                                 <a href="blog-post-right.html">
                                    <img className="border-radius-15" src="assets/imgs/blog/blog-15.png" alt="" />
                                 </a>
                              </div>
                              <div className="entry-content-2">
                                 <h6 className="mb-10 font-sm"><a className="entry-meta text-muted" href="blog-category-grid.html">Vegetarian</a></h6>
                                 <h4 className="post-title mb-15">
                                    <a href="blog-post-right.html">The litigants on the screen are not actors</a>
                                 </h4>
                                 <div className="entry-meta font-xs color-grey mt-10 pb-10">
                                    <div>
                                       <span className="post-on mr-10">25 April 2022</span>
                                       <span className="hit-count has-dot mr-10">126k Views</span>
                                       <span className="hit-count has-dot">4 mins read</span>
                                    </div>
                                 </div>
                              </div>
                           </article>
                        </div>
                     </div>
                     <div className="pagination-area mt-15 mb-sm-5 mb-lg-0">
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
                  </div>
               </div>
            </div>
         </div>
      </main>
   )
}
