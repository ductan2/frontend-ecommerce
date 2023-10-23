import { Province } from "../../types/commom"

type SelectCustomProps = {
   data : Province[]
   value : string
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   onChange : (e:any)=>void
   defaultName:string
}
export const SelectCustom = ({data,value,onChange,defaultName}:SelectCustomProps) => {
 
   if(!data) return null;
   return (
      <div className="custom_select mt-50" data-select2-id="11">
         <select onChange={onChange} 
          value={value} className="form-control select-active w-100 select2-hidden-accessible" data-select2-id="7" aria-hidden="true">
            <option value="">{defaultName}</option>
            {data?.map((item)=>{
               return <option key={item.code} value={item.name}>{item.name}</option>
            })}
         </select>
      </div>
   )
}
