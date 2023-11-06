import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { Loading } from "../../components/loading/Loading"

import ModalCustom from "../../components/modal/ModalCustom"
import { SelectCustom } from "../../components/select/SelectCustom"
import useAddress from "../../hooks/useAddress"
import React from "react"

const AccountAddress = () => {

   const { user, isLoading } = useSelector((state: RootState) => state.user)
   const [openModal, setOpenModal] = React.useState(false)
   const {
      address,
      provinceList,
      districtList,
      wardsList,
      handleChangeValue,
      handleUpdateAddress,
      setAddress
   } = useAddress();
   if (isLoading) return <Loading isFull />

   return (
      <>
         <div className="tab-content account dashboard-content pl-50">
            <div className="tab-pane fade active show" id="address" role="tabpanel" aria-labelledby="address-tab">
               <div className="card-header text-center">
                  <h3 className="mb-0 ">Your Address</h3>
               </div>
               <div className="table-responsive">
                  <table className="table">
                     <thead>
                        <tr>
                           <th>Province</th>
                           <th>District</th>
                           <th>Wards</th>
                           <th>Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        {user && user.address?.map((item) => {
                           return <tr>
                              <td>{item.province}</td>
                              <td>{item.district}</td>
                              <td>{item.wards}</td>
                              <td >
                                 <div className="d-flex justify-content-evenly">
                                    <div onClick={() => {
                                       setAddress(item)
                                       setTimeout(() => {
                                          setOpenModal(true)
                                       }, 200)
                                    }}
                                       className="text-success hover-text-success btn-small d-block">Edit</div>
                                    <div className="text-danger hover-text-danger d-block">Delete</div>
                                 </div>
                              </td>
                           </tr>
                        })}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
         <ModalCustom openModal={openModal} setOpenModal={setOpenModal}>
            <form action="" onSubmit={handleUpdateAddress}>
               <div className="row flex " style={{ alignItems: "end" }}>
                  <div className="col-4">
                     <SelectCustom defaultName={"Please enter your province"}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChangeValue(e, "province")}
                        value={address.province} data={provinceList} />
                  </div>
                  <div className="col-4">
                     <SelectCustom defaultName={"Please enter your district"}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChangeValue(e, "district")}
                        value={address.district} data={districtList} />
                  </div>
                  <div className="col-4">
                     <SelectCustom defaultName={"Please enter your wards"}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChangeValue(e, "wards")}
                        value={address.wards} data={wardsList} />
                  </div>
                  <div className="mt-20 text-center">
                     <button type="submit" className="btn ">Edit address</button>
                  </div>
               </div>
            </form>
         </ModalCustom>
      </>
   )
}

export default AccountAddress