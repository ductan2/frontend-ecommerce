import { SelectCustom } from "../../components/select/SelectCustom";
import useAddress from "../../hooks/useAddress";

const AddressCustom = () => {
   const {
      address,
      provinceList,
      districtList,
      wardsList,
      handleChangeValue,
      handleUpdateAddress
   } = useAddress();
   return (
      <>
         <form action="" onSubmit={handleUpdateAddress}>
            <div className="row flex " style={{ alignItems: "end" }}>
               <div className="col-3">
                  <SelectCustom defaultName={"Please enter your province"}
                     onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChangeValue(e, "province")} value={address.province} data={provinceList} />
               </div>
               <div className="col-3">
                  <SelectCustom defaultName={"Please enter your district"}
                     onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChangeValue(e, "district")} value={address.district} data={districtList} />
               </div>
               <div className="col-3">
                  <SelectCustom defaultName={"Please enter your wards"}
                     onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChangeValue(e, "wards")} value={address.wards} data={wardsList} />
               </div>
               <div className="col-3">
                  <button type="submit" className="btn ">Add address</button>
               </div>
            </div>
         </form>
      </>
   )
}

export default AddressCustom