import { Link, Outlet, useLocation } from "react-router-dom"
import { logout } from "../features/user/userSlice";
import { useAppDispatch } from "../store/store";

const MyAccount = () => {
   const slug = useLocation().pathname;
   const match = slug.match(/\/account\/(.*)/) || "/"
   const dispatch = useAppDispatch();
   return (
      <main className="main pages">
         <div className="page-content pt-150  pb-150">
            <div className="container">
               <div className="row">
                  <div className="col-lg-10 m-auto">
                     <div className="row">
                        <div className="col-md-3">
                           <div className="dashboard-menu">
                              <ul className="nav flex-column" role="tablist">
                                 <li className="nav-item ">
                                    <Link className={`nav-link ${match === "/" ? "active" : ""}`}
                                       id="account-detail-tab"
                                       data-bs-toggle="tab"
                                       to="/account"
                                       role="tab" aria-controls="account-detail"
                                       aria-selected="true"><i className="fi-rs-user mr-10">
                                       </i>Account
                                    </Link>
                                 </li>
                                 <li className="nav-item">
                                    <Link className={`nav-link ${match[1] === "orders" ? "active" : ""}`} id="orders-tab"
                                       data-bs-toggle="tab" to="/account/orders" role="tab"
                                       aria-controls="orders" aria-selected="false">
                                       <i className="fi-rs-shopping-bag mr-10"></i>Your Orders</Link>
                                 </li>
                                 <li className="nav-item">
                                    <Link className={`nav-link ${match[1] === "address" ? "active" : ""}`} id="address-tab" data-bs-toggle="tab"
                                       to="/account/address" role="tab" aria-controls="address" aria-selected="true">
                                       <i className="fi-rs-marker mr-10"></i>My Address</Link>
                                 </li>

                                 <li className="nav-item">
                                    <div className="nav-link" onClick={() => dispatch(logout())}><i className="fi-rs-sign-out mr-10"></i>Logout</div>
                                 </li>
                              </ul>
                           </div>
                        </div>
                        <div className="col-md-9">
                           <Outlet />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </main>
   )
}

export default MyAccount