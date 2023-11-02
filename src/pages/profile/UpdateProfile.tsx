
const UpdateProfile = () => {
   return (
      <div className="tab-content account dashboard-content pl-50">
         <div className="tab-pane fade active show" id="account-detail" role="tabpanel" aria-labelledby="account-detail-tab">
            <div className="card">
               <div className="card-header">
                  <h5>Account </h5>
               </div>
               <div className="card-body">
                  <form  >
                     <div className="row">
                        <div className="form-group col-md-6">
                           <label>First Name <span className="required">*</span></label>
                           <input required className="form-control" name="name" type="text" />
                        </div>
                        <div className="form-group col-md-6">
                           <label>Last Name <span className="required">*</span></label>
                           <input required className="form-control" name="phone" />
                        </div>
                       
                        <div className="form-group col-md-12">
                           <label>Address <span className="required">*</span></label>
                           <input required className="form-control" name="address" type="text" />
                        </div>
                        <div className="form-group col-md-12">
                           <label>Current Password <span className="required">*</span></label>
                           <input required className="form-control" name="password" type="password" />
                        </div>
                        <div className="form-group col-md-12">
                           <label>New Password <span className="required">*</span></label>
                           <input required className="form-control" name="npassword" type="password" />
                        </div>
                        <div className="form-group col-md-12">
                           <label>Confirm Password <span className="required">*</span></label>
                           <input required className="form-control" name="cpassword" type="password" />
                        </div>
                        <div className="col-md-12">
                           <button type="submit" className="btn btn-fill-out submit font-weight-bold" name="submit" value="Submit">Save Change</button>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>

   )
}

export default UpdateProfile